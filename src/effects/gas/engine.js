import * as GLSL from './shaders.js'

/**
 * The gas engine: a WebGL2 stable-fluids solver plus a pool of light
 * particles, drawn into one transparent full-viewport canvas.
 *
 * It runs only while something is visible. Every splat extends `aliveUntil`
 * by the time its dye needs to fade below one 8-bit step; when that time has
 * passed and no particle is left, the loop stops and the canvas is cleared —
 * an idle page costs no GPU work at all.
 *
 * Coordinates in the public API are CSS pixels in the viewport (the space of
 * getBoundingClientRect and clientX/Y); velocities are CSS pixels per second.
 */

const PRESSURE_ITERATIONS = 16
const PRESSURE_DECAY = 0.8
const CURL_STRENGTH = 22
const VELOCITY_DISSIPATION = 0.45
const DYE_DISSIPATION = 1.5
const EXPOSURE = 1.35
const PARTICLE_STRIDE = 7 // x, y, r, g, b, a, size

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const rand = (lo, hi) => lo + Math.random() * (hi - lo)

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ sim: number, dye: number, splats: number, particles: number,
 *           intensity: number, stir: boolean, scale: number }} tier
 * @param {number[][]} palette  RGB triples in 0..1
 * @returns {null | { puff: Function, stir: Function, dispose: Function }}
 */
export function createEngine(canvas, tier, palette) {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  })
  if (!gl) return null
  gl.getExtension('EXT_color_buffer_float')

  // ===== Programs =====

  function compile(type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader))
    return shader
  }

  function link(vertex, fragmentSource) {
    const program = gl.createProgram()
    gl.attachShader(program, vertex)
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource))
    gl.bindAttribLocation(program, 0, 'aPosition')
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
    const uniforms = {}
    const total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < total; i++) {
      const { name } = gl.getActiveUniform(program, i)
      uniforms[name] = gl.getUniformLocation(program, name)
    }
    return { program, uniforms }
  }

  let P
  let particleProgram
  try {
    const grid = compile(gl.VERTEX_SHADER, GLSL.GRID_VERT)
    P = {
      splat: link(grid, GLSL.SPLAT),
      advect: link(grid, GLSL.ADVECT),
      divergence: link(grid, GLSL.DIVERGENCE),
      curl: link(grid, GLSL.CURL),
      vorticity: link(grid, GLSL.VORTICITY),
      pressure: link(grid, GLSL.PRESSURE),
      gradient: link(grid, GLSL.GRADIENT),
      scale: link(grid, GLSL.SCALE),
      display: link(grid, GLSL.DISPLAY),
    }
    particleProgram = link(compile(gl.VERTEX_SHADER, GLSL.PARTICLE_VERT), GLSL.PARTICLE_FRAG)
  } catch {
    return null
  }

  // ===== Geometry =====

  const quad = gl.createVertexArray()
  gl.bindVertexArray(quad)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  const particleData = new Float32Array(tier.particles * PARTICLE_STRIDE)
  const particleVao = gl.createVertexArray()
  const particleBuffer = gl.createBuffer()
  gl.bindVertexArray(particleVao)
  gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, particleData.byteLength, gl.DYNAMIC_DRAW)
  const stride = PARTICLE_STRIDE * 4
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0)
  gl.enableVertexAttribArray(1)
  gl.vertexAttribPointer(1, 4, gl.FLOAT, false, stride, 8)
  gl.enableVertexAttribArray(2)
  gl.vertexAttribPointer(2, 1, gl.FLOAT, false, stride, 24)
  gl.bindVertexArray(null)

  // ===== Render targets =====

  let vw = 1
  let vh = 1
  let velocity, dye, pressure, divergence, curl
  const owned = []

  function target(w, h, internalFormat, format) {
    const tex = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, gl.HALF_FLOAT, null)
    const fbo = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error('gas: half-float render targets are not supported')
    }
    gl.viewport(0, 0, w, h)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    const t = { tex, fbo, w, h }
    owned.push(t)
    return t
  }

  function pair(w, h, internalFormat, format) {
    let read = target(w, h, internalFormat, format)
    let write = target(w, h, internalFormat, format)
    return {
      get read() { return read },
      get write() { return write },
      swap() { [read, write] = [write, read] },
    }
  }

  function gridSize(res) {
    const aspect = vw / vh
    return aspect >= 1 ? [Math.round(res * aspect), res] : [res, Math.round(res / aspect)]
  }

  function allocate() {
    for (const t of owned.splice(0)) {
      gl.deleteTexture(t.tex)
      gl.deleteFramebuffer(t.fbo)
    }
    vw = Math.max(1, canvas.clientWidth)
    vh = Math.max(1, canvas.clientHeight)
    const s = tier.scale * Math.min(window.devicePixelRatio || 1, 1)
    canvas.width = Math.max(1, Math.round(vw * s))
    canvas.height = Math.max(1, Math.round(vh * s))
    const [sw, sh] = gridSize(tier.sim)
    const [dw, dh] = gridSize(tier.dye)
    velocity = pair(sw, sh, gl.RG16F, gl.RG)
    pressure = pair(sw, sh, gl.R16F, gl.RED)
    divergence = target(sw, sh, gl.R16F, gl.RED)
    curl = target(sw, sh, gl.R16F, gl.RED)
    dye = pair(dw, dh, gl.RGBA16F, gl.RGBA)
  }

  try {
    allocate()
  } catch {
    return null
  }

  // ===== Passes =====

  function use(pass, texel) {
    gl.useProgram(pass.program)
    if (texel) gl.uniform2f(pass.uniforms.uTexel, 1 / texel.w, 1 / texel.h)
    return pass.uniforms
  }

  function tex(unit, t) {
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, t.tex)
    return unit
  }

  function blit(dst) {
    if (dst) {
      gl.viewport(0, 0, dst.w, dst.h)
      gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo)
    } else {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  function applySplat(s) {
    const u = use(P.splat, velocity.read)
    gl.uniform1f(u.uAspect, vw / vh)
    gl.uniform2f(u.uPoint, s.x / vw, 1 - s.y / vh)
    gl.uniform1f(u.uRadius, (s.radius / vh) ** 2)
    // CSS px/s → grid texels/s (y flips: CSS grows down, the grid grows up)
    const k = velocity.read.h / vh
    gl.uniform3f(u.uColor, s.vx * k, -s.vy * k, 0)
    gl.uniform1i(u.uTarget, tex(0, velocity.read))
    blit(velocity.write)
    velocity.swap()
    if (s.color) {
      gl.uniform3f(u.uColor, s.color[0], s.color[1], s.color[2])
      gl.uniform1i(u.uTarget, tex(0, dye.read))
      blit(dye.write)
      dye.swap()
    }
  }

  function step(dt, shift) {
    let u = use(P.curl, velocity.read)
    gl.uniform1i(u.uVelocity, tex(0, velocity.read))
    blit(curl)

    u = use(P.vorticity, velocity.read)
    gl.uniform1i(u.uVelocity, tex(0, velocity.read))
    gl.uniform1i(u.uCurl, tex(1, curl))
    gl.uniform1f(u.uCurlStrength, CURL_STRENGTH)
    gl.uniform1f(u.uDt, dt)
    blit(velocity.write)
    velocity.swap()

    u = use(P.divergence, velocity.read)
    gl.uniform1i(u.uVelocity, tex(0, velocity.read))
    blit(divergence)

    u = use(P.scale, pressure.read)
    gl.uniform1i(u.uTexture, tex(0, pressure.read))
    gl.uniform1f(u.uValue, PRESSURE_DECAY)
    blit(pressure.write)
    pressure.swap()

    u = use(P.pressure, pressure.read)
    gl.uniform1i(u.uDivergence, tex(1, divergence))
    for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(u.uPressure, tex(0, pressure.read))
      blit(pressure.write)
      pressure.swap()
    }

    u = use(P.gradient, velocity.read)
    gl.uniform1i(u.uPressure, tex(0, pressure.read))
    gl.uniform1i(u.uVelocity, tex(1, velocity.read))
    blit(velocity.write)
    velocity.swap()

    u = use(P.advect, velocity.read)
    gl.uniform2f(u.uVelTexel, 1 / velocity.read.w, 1 / velocity.read.h)
    gl.uniform2f(u.uShift, 0, shift)
    gl.uniform1f(u.uDt, dt)
    gl.uniform1i(u.uVelocity, tex(0, velocity.read))
    gl.uniform1i(u.uSource, tex(0, velocity.read))
    gl.uniform1f(u.uDissipation, VELOCITY_DISSIPATION)
    blit(velocity.write)
    velocity.swap()

    gl.uniform1i(u.uVelocity, tex(0, velocity.read))
    gl.uniform1i(u.uSource, tex(1, dye.read))
    gl.uniform1f(u.uDissipation, DYE_DISSIPATION)
    blit(dye.write)
    dye.swap()
  }

  // ===== Particles (CPU pool, struct of arrays) =====

  const MAX = tier.particles
  const px = new Float32Array(MAX)
  const py = new Float32Array(MAX)
  const pvx = new Float32Array(MAX)
  const pvy = new Float32Array(MAX)
  const life = new Float32Array(MAX)
  const span = new Float32Array(MAX)
  const size = new Float32Array(MAX)
  const rgb = new Float32Array(MAX * 3)
  let count = 0

  function emit(x, y, vx, vy, seconds, sizePx, color) {
    if (count >= MAX) return
    const i = count++
    px[i] = x
    py[i] = y
    pvx[i] = vx
    pvy[i] = vy
    life[i] = span[i] = seconds
    size[i] = sizePx
    rgb.set(color, i * 3)
  }

  function moveParticles(dt, shiftPx, t) {
    const drag = Math.exp(-1.4 * dt)
    for (let i = 0; i < count; ) {
      life[i] -= dt
      if (life[i] <= 0) {
        const j = --count
        px[i] = px[j]; py[i] = py[j]
        pvx[i] = pvx[j]; pvy[i] = pvy[j]
        life[i] = life[j]; span[i] = span[j]; size[i] = size[j]
        rgb.copyWithin(i * 3, j * 3, j * 3 + 3)
        continue
      }
      // a cheap swirl field plus buoyancy: motes curl and rise like vapour
      pvx[i] = (pvx[i] + Math.sin(py[i] * 0.012 + t * 1.7) * 46 * dt) * drag
      pvy[i] = (pvy[i] + Math.cos(px[i] * 0.011 - t * 1.3) * 46 * dt - 22 * dt) * drag
      px[i] += pvx[i] * dt
      py[i] += pvy[i] * dt - shiftPx
      i++
    }
  }

  function drawParticles() {
    for (let i = 0; i < count; i++) {
      const o = i * PARTICLE_STRIDE
      const left = life[i] / span[i]
      const born = Math.min(1, (span[i] - life[i]) / 0.12)
      particleData[o] = px[i]
      particleData[o + 1] = py[i]
      particleData[o + 2] = rgb[i * 3]
      particleData[o + 3] = rgb[i * 3 + 1]
      particleData[o + 4] = rgb[i * 3 + 2]
      particleData[o + 5] = born * left ** 1.3
      particleData[o + 6] = size[i]
    }
    const u = use(particleProgram)
    gl.uniform2f(u.uView, vw, vh)
    gl.uniform1f(u.uScale, canvas.width / vw)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE)
    gl.bindVertexArray(particleVao)
    gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, particleData, 0, count * PARTICLE_STRIDE)
    gl.drawArrays(gl.POINTS, 0, count)
    gl.disable(gl.BLEND)
    gl.bindVertexArray(quad)
  }

  // ===== Loop =====

  const queue = []
  let running = false
  let lost = false
  let raf = 0
  let last = 0
  let aliveUntil = 0
  let shiftPx = 0
  let lastScroll = window.scrollY

  function addSplat(x, y, vx, vy, color, radius) {
    queue.push({ x, y, vx, vy, color, radius })
    if (color) {
      // time for this dye to fade below one 8-bit step after tone mapping (x2 for overlap)
      const peak = Math.max(color[0], color[1], color[2])
      const seconds = Math.log(Math.max(2 * peak * 255 * EXPOSURE, 1)) / DYE_DISSIPATION
      aliveUntil = Math.max(aliveUntil, performance.now() + seconds * 1000)
    }
  }

  function wake() {
    if (running || lost) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }

  function frame(now) {
    const dt = clamp((now - last) / 1000, 0.001, 1 / 30)
    last = now
    gl.disable(gl.BLEND)
    gl.bindVertexArray(quad)
    for (const s of queue) applySplat(s)
    queue.length = 0

    const shift = shiftPx
    shiftPx = 0
    step(dt, shift / vh)
    moveParticles(dt, shift, now / 1000)

    const u = use(P.display, dye.read)
    gl.uniform1i(u.uDye, tex(0, dye.read))
    gl.uniform1f(u.uExposure, EXPOSURE)
    blit(null)
    if (count) drawParticles()

    if (now > aliveUntil && count === 0) {
      sleep()
      return
    }
    raf = requestAnimationFrame(frame)
  }

  function sleep() {
    running = false
    raf = 0
    for (const t of owned) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  // ===== Choreography =====

  const pick = () => palette[(Math.random() * palette.length) | 0]
  const tint = (color, k) => [color[0] * k, color[1] * k, color[2] * k]

  /** A point on the rectangle's perimeter at fraction f, with its outward normal. */
  function perimeterPoint(x, y, w, h, f) {
    let d = (f % 1) * 2 * (w + h)
    if (d < w) return [x + d, y, 0, -1]
    d -= w
    if (d < h) return [x + w, y + d, 1, 0]
    d -= h
    if (d < w) return [x + w - d, y + h, 0, 1]
    return [x, y + h - (d - w), -1, 0]
  }

  /** The palette as a slow cycle, for the pointer trail. */
  function flowColor(seconds) {
    const n = palette.length
    const f = (seconds * 0.12) % n
    const a = palette[Math.floor(f)]
    const b = palette[(Math.floor(f) + 1) % n]
    const m = f - Math.floor(f)
    return [a[0] + (b[0] - a[0]) * m, a[1] + (b[1] - a[1]) * m, a[2] + (b[2] - a[2]) * m]
  }

  /**
   * Vapour around a rectangle (viewport CSS px).
   *   condense — drifts in from the edges toward the centre (an entrance);
   *   disperse — rises out of the rectangle along `dir`, with light motes (an exit).
   */
  function puff(rect, { mode = 'disperse', dir = [0, -1], strength = 1 } = {}) {
    if (lost) return
    const k = strength * tier.intensity
    const { x, y, width: w, height: h } = rect
    const cx = x + w / 2
    const cy = y + h / 2
    const extent = Math.max(Math.min(w, h), 40)

    if (mode === 'condense') {
      const n = clamp(Math.round((tier.splats * (w + h)) / 900), 4, tier.splats * 2)
      const r = clamp(extent * 0.16, 22, 80)
      for (let i = 0; i < n; i++) {
        const [ex, ey, nx, ny] = perimeterPoint(x, y, w, h, (i + rand(0.2, 0.8)) / n)
        addSplat(ex + nx * r * 0.6, ey + ny * r * 0.6, -nx * 240 * k, -ny * 240 * k, tint(pick(), 0.2 * k), r)
      }
      const motes = Math.round(Math.min(MAX * 0.06, (w + h) / 40) * strength)
      for (let i = 0; i < motes; i++) {
        const [ex, ey, nx, ny] = perimeterPoint(x, y, w, h, Math.random())
        const out = rand(20, 60)
        const speed = rand(70, 150)
        emit(ex + nx * out, ey + ny * out, -nx * speed, -ny * speed, rand(0.5, 0.9), rand(1.4, 3), pick())
      }
    } else {
      const len = Math.hypot(dir[0], dir[1]) || 1
      const ux = dir[0] / len
      const uy = dir[1] / len
      const n = Math.max(3, Math.round(tier.splats * Math.min(1.6, Math.sqrt(w * h) / 400 + 0.4)))
      const r = clamp(extent * 0.2, 18, 130)
      for (let i = 0; i < n; i++) {
        const sx = x + w * rand(0.1, 0.9)
        const sy = y + h * rand(0.1, 0.9)
        const ox = sx - cx
        const oy = sy - cy
        const ol = Math.hypot(ox, oy) || 1
        const speed = rand(260, 520) * k
        addSplat(
          sx,
          sy,
          ux * speed + (ox / ol) * 120 * k,
          uy * speed + (oy / ol) * 120 * k - 80 * k,
          tint(pick(), 0.34 * k),
          r * rand(0.8, 1.2),
        )
      }
      const motes = Math.round(clamp(Math.sqrt(w * h) / 3, 10, MAX * 0.7) * strength)
      for (let i = 0; i < motes; i++) {
        const sx = x + w * Math.random()
        const sy = y + h * Math.random()
        const ox = sx - cx
        const oy = sy - cy
        const ol = Math.hypot(ox, oy) || 1
        const speed = rand(60, 220)
        const spread = rand(20, 140)
        emit(
          sx,
          sy,
          ux * speed + (ox / ol) * spread,
          uy * speed + (oy / ol) * spread - rand(10, 50),
          rand(1.1, 2.3),
          rand(1.4, 4.2),
          pick(),
        )
      }
    }
    wake()
  }

  /** The pointer trail: `dx`/`dy` are CSS px moved since the last frame. */
  function stir(x, y, dx, dy) {
    if (lost || !tier.stir) return
    const moved = Math.hypot(dx, dy)
    if (moved < 0.5) return
    const vx = clamp(dx * 60, -2400, 2400)
    const vy = clamp(dy * 60, -2400, 2400)
    const color = flowColor(performance.now() / 1000)
    addSplat(x, y, vx * 0.45, vy * 0.45, tint(color, Math.min(0.05, moved * 0.0025) * tier.intensity), 26)
    if (moved > 8 && Math.random() < 0.5) {
      emit(x + rand(-6, 6), y + rand(-6, 6), vx * 0.05 + rand(-20, 20), vy * 0.05 + rand(-30, 10), rand(0.5, 0.9), rand(1.2, 2.4), color)
    }
    wake()
  }

  // ===== Page coupling =====

  function onScroll() {
    const y = window.scrollY
    if (running) shiftPx += y - lastScroll
    lastScroll = y
  }

  let resizeRaf = 0
  function onResize() {
    if (resizeRaf) return
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0
      try {
        allocate()
      } catch {
        lost = true
      }
    })
  }

  function onLost(event) {
    event.preventDefault()
    lost = true
    running = false
    cancelAnimationFrame(raf)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  canvas.addEventListener('webglcontextlost', onLost)

  function dispose() {
    cancelAnimationFrame(raf)
    cancelAnimationFrame(resizeRaf)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    canvas.removeEventListener('webglcontextlost', onLost)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }

  return { puff, stir, dispose }
}

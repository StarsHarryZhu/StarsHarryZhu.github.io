/**
 * lens — edge refraction for `.lens-glass` surfaces (Chromium only).
 *
 * A liquid-glass edge bends what is behind it. Chromium can run an SVG
 * filter inside `backdrop-filter`, so for each lens surface we build a
 * displacement map shaped like a rounded slab: neutral in the middle, and
 * within `bezel` px of the edge the backdrop is sampled from further inside,
 * more strongly toward the rim — the view through a thick convex edge.
 *
 * Safari and Firefox do not render `url()` in backdrop-filter; there the
 * surface keeps plain blur (html.lg-refract is never set).
 */

const SVG_NS = 'http://www.w3.org/2000/svg'
const MAP_RESOLUTION = 0.5 // the map is smooth, half resolution is enough

let host = null

/** Chromium exposes userAgentData brands; Safari and Firefox do not. */
export function refractionSupported() {
  return Boolean(navigator.userAgentData?.brands?.some((b) => b.brand === 'Chromium'))
}

function svgHost() {
  if (host) return host
  host = document.createElementNS(SVG_NS, 'svg')
  host.setAttribute('aria-hidden', 'true')
  host.setAttribute('width', '0')
  host.setAttribute('height', '0')
  host.style.position = 'absolute'
  host.style.pointerEvents = 'none'
  document.body.append(host)
  document.documentElement.classList.add('lg-refract')
  return host
}

/** RG-encoded displacement map for a w×h rounded rectangle (data URL). */
function buildMap(w, h, radius, bezel) {
  const cw = Math.max(1, Math.round(w * MAP_RESOLUTION))
  const ch = Math.max(1, Math.round(h * MAP_RESOLUTION))
  const canvas = document.createElement('canvas')
  canvas.width = cw
  canvas.height = ch
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(cw, ch)
  const data = image.data
  const r = Math.min(radius, w / 2, h / 2)
  const hw = w / 2
  const hh = h / 2

  for (let j = 0; j < ch; j++) {
    for (let i = 0; i < cw; i++) {
      const x = (i + 0.5) / MAP_RESOLUTION - hw
      const y = (j + 0.5) / MAP_RESOLUTION - hh
      // signed distance to the rounded rectangle (negative inside)
      const qx = Math.abs(x) - (hw - r)
      const qy = Math.abs(y) - (hh - r)
      const ox = Math.max(qx, 0)
      const oy = Math.max(qy, 0)
      const sdf = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r
      const depth = -sdf
      let dx = 0
      let dy = 0
      if (depth > 0 && depth < bezel) {
        // outward normal of the nearest edge
        let nx
        let ny
        if (ox > 0 || oy > 0) {
          const len = Math.hypot(ox, oy) || 1
          nx = (ox / len) * Math.sign(x)
          ny = (oy / len) * Math.sign(y)
        } else if (qx > qy) {
          nx = Math.sign(x)
          ny = 0
        } else {
          nx = 0
          ny = Math.sign(y)
        }
        const t = 1 - depth / bezel
        const strength = t * t
        // sample from further inside: the edge magnifies what lies under the slab
        dx = -nx * strength
        dy = -ny * strength
      }
      const o = (j * cw + i) * 4
      data[o] = 128 + dx * 127
      data[o + 1] = 128 + dy * 127
      data[o + 2] = 128
      data[o + 3] = 255
    }
  }
  ctx.putImageData(image, 0, 0)
  return canvas.toDataURL()
}

/**
 * Gives `el` a refracting edge. Returns a function that removes it.
 * @param {HTMLElement} el
 * @param {{ id: string, bezel: number, scale: number }} options
 */
export function attachLens(el, { id, bezel, scale }) {
  if (!el || !refractionSupported()) return () => {}

  const filter = document.createElementNS(SVG_NS, 'filter')
  filter.id = id
  filter.setAttribute('filterUnits', 'userSpaceOnUse')
  filter.setAttribute('color-interpolation-filters', 'sRGB')
  const map = document.createElementNS(SVG_NS, 'feImage')
  map.setAttribute('result', 'map')
  map.setAttribute('preserveAspectRatio', 'none')
  const displace = document.createElementNS(SVG_NS, 'feDisplacementMap')
  displace.setAttribute('in', 'SourceGraphic')
  displace.setAttribute('in2', 'map')
  displace.setAttribute('scale', String(scale))
  displace.setAttribute('xChannelSelector', 'R')
  displace.setAttribute('yChannelSelector', 'G')
  filter.append(map, displace)
  svgHost().append(filter)

  let lastW = 0
  let lastH = 0
  const observer = new ResizeObserver(() => {
    const w = Math.round(el.offsetWidth)
    const h = Math.round(el.offsetHeight)
    if (!w || !h || (w === lastW && h === lastH)) return
    lastW = w
    lastH = h
    const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0
    for (const node of [filter, map]) {
      node.setAttribute('x', '0')
      node.setAttribute('y', '0')
      node.setAttribute('width', String(w))
      node.setAttribute('height', String(h))
    }
    map.setAttribute('href', buildMap(w, h, radius, bezel))
    el.style.setProperty('--lens', `url(#${id})`)
  })
  observer.observe(el)

  return () => {
    observer.disconnect()
    filter.remove()
    el.style.removeProperty('--lens')
  }
}

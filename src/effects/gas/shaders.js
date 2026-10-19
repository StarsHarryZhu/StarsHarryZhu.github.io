/**
 * GLSL ES 3.00 sources for the gas layer.
 *
 * The fluid is a compact stable-fluids solver on a coarse grid: advect,
 * vorticity confinement (gives the vapour its curls), divergence, Jacobi
 * pressure, gradient subtraction. Velocity is stored in grid texels per
 * second; dye is linear colour that the display pass tone-maps into
 * premultiplied alpha. One vertex shader feeds every grid pass.
 */

const HEADER = `#version 300 es
precision highp float;
precision highp sampler2D;
`

export const GRID_VERT = `${HEADER}
in vec2 aPosition;
uniform vec2 uTexel;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

// Adds a gaussian of uColor around uPoint; uRadius is the squared e-folding
// radius in viewport-height units, uAspect keeps it round.
export const SPLAT = `${HEADER}
in vec2 vUv;
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;
out vec4 outColor;

void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  outColor = vec4(texture(uTarget, vUv).xyz + splat, 1.0);
}`

// Semi-Lagrangian advection. uShift moves the whole field with the page
// when it scrolls, so vapour stays attached to the panel that made it.
export const ADVECT = `${HEADER}
in vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uVelTexel;
uniform vec2 uShift;
uniform float uDt;
uniform float uDissipation;
out vec4 outColor;

void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uVelTexel - uShift;
  if (coord.x < 0.0 || coord.x > 1.0 || coord.y < 0.0 || coord.y > 1.0) {
    outColor = vec4(0.0);
    return;
  }
  outColor = texture(uSource, coord) / (1.0 + uDissipation * uDt);
}`

export const DIVERGENCE = `${HEADER}
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uVelocity;
out vec4 outColor;

void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  outColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`

export const CURL = `${HEADER}
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uVelocity;
out vec4 outColor;

void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  outColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`

export const VORTICITY = `${HEADER}
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlStrength;
uniform float uDt;
out vec4 outColor;

void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= uCurlStrength * C;
  force.y *= -1.0;
  vec2 velocity = texture(uVelocity, vUv).xy + force * uDt;
  outColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);
}`

export const PRESSURE = `${HEADER}
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
out vec4 outColor;

void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  outColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}`

export const GRADIENT = `${HEADER}
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
out vec4 outColor;

void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  outColor = vec4(velocity, 0.0, 1.0);
}`

export const SCALE = `${HEADER}
in vec2 vUv;
uniform sampler2D uTexture;
uniform float uValue;
out vec4 outColor;

void main() {
  outColor = uValue * texture(uTexture, vUv);
}`

// Tone-maps dye into premultiplied colour; dense vapour drifts toward white.
export const DISPLAY = `${HEADER}
in vec2 vUv;
uniform sampler2D uDye;
uniform float uExposure;
out vec4 outColor;

void main() {
  vec3 c = 1.0 - exp(-max(texture(uDye, vUv).rgb, 0.0) * uExposure);
  float a = max(c.r, max(c.g, c.b));
  outColor = vec4(mix(c, vec3(a), 0.12), a);
}`

// Light particles: soft round points, drawn additively over the vapour.
export const PARTICLE_VERT = `${HEADER}
layout(location = 0) in vec2 aPos;
layout(location = 1) in vec4 aColor;
layout(location = 2) in float aSize;
uniform vec2 uView;
uniform float uScale;
out vec4 vColor;

void main() {
  gl_Position = vec4(aPos.x / uView.x * 2.0 - 1.0, 1.0 - aPos.y / uView.y * 2.0, 0.0, 1.0);
  gl_PointSize = aSize * uScale;
  vColor = aColor;
}`

export const PARTICLE_FRAG = `${HEADER}
in vec4 vColor;
out vec4 outColor;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float glow = clamp(1.0 - d, 0.0, 1.0);
  glow *= glow;
  float a = vColor.a * glow;
  outColor = vec4(mix(vColor.rgb, vec3(1.0), glow * 0.5) * a, a);
}`

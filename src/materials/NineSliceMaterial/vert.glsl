precision highp float;

attribute vec2 sizeMask;
attribute vec2 sliceSelector;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform vec2 size;
uniform vec4 atlasST;
uniform vec4 u;
uniform vec4 v;
uniform vec4 xPadding;
uniform vec4 yPadding;

varying vec2 vUv;

void main() {
  int ix = int(sliceSelector.x);
  int iy = int(sliceSelector.y);
  vec2 slicedUv = vec2(u[ix], v[iy]);
  vec2 padding = vec2(xPadding[ix], yPadding[iy]);
  vUv = slicedUv * atlasST.xy + atlasST.zw;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(size * sizeMask + padding, 0.0, 1.0);
}

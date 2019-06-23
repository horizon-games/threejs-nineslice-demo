precision mediump float;

uniform sampler2D atlas;
uniform float opacity;

varying vec2 vUv;

void main() {

  vec4 color = texture2D(atlas, vUv);
  color.a *= opacity;

  gl_FragColor = vec4(color);
}


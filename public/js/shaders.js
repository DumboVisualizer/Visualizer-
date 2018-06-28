var vertexShader = 
`
attribute vec2 position;
void main(void) {
    gl_Position = vec4(position, 0, 1);
}
`

var fragmentShader = 
`
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform float loudness;

uniform float userInput_1;
uniform float userInput_2;
uniform float userInput_3;
uniform float userInput_4;
uniform float userInput_5;
uniform float userInput_6;

void main(void) {
  vec3 c;
  float z = 0.1 * time;
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = uv - 0.5;
  p.x *= resolution.x / resolution.y;
  float l = 0.2 * length(p);
  for (int i = 0; i < 3; i++) {
    z += 0.07;
    uv += p / l * (sin(z) + userInput_1) * abs(sin(l * userInput_2 - z * userInput_3));
    c[i] = 0.01 / length(abs(mod(uv, userInput_4) - userInput_5));
  }
  float intensity = texture2D(spectrum, vec2(l, userInput_6)).x * (loudness * 0.01);
  gl_FragColor = vec4(c / l * intensity, time);
}
`
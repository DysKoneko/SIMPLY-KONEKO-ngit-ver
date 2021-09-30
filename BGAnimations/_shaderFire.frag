#version 120
#define PI 3.14159265
#define res resolution

uniform vec2 resolution;
varying vec2 imageCoord;
varying vec4 color;

uniform vec2 textureSize;
uniform vec2 imageSize;

uniform sampler2D sampler0;
uniform float beat;
uniform float time;


vec2 img2tex( vec2 v ) { return v / textureSize * imageSize; }

float rand(vec2 n) {
	return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
	vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
	float total = 0.0, amplitude = 1.0;
	for (int i = 0; i < 4; i++) {
		total += noise(n) * amplitude;
		n += n;
		amplitude *= 0.5;
	}
	return total;
}

void main() {

	const vec3 c1 = vec3(0.5, 0.0, 0.1);
	const vec3 c2 = vec3(0.9, 0.0, 0.0);
	const vec3 c3 = vec3(0.2, 0.0, 0.0);
	const vec3 c4 = vec3(1.0, 0.9, 0.0);
	const vec3 c5 = vec3(0.1);
	const vec3 c6 = vec3(0.9);
	
	vec2 speed = vec2(0.7, 0.4);
	float shift = 1.6;
	float alpha = 1.0;

	vec2 p = gl_FragCoord.xy * 8.0 / res.xx;
	float q = fbm(p - time * 0.1);
	vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));
	vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
	gl_FragColor = vec4(c * cos(shift * gl_FragCoord.y / res.y), alpha);
}
#define PI 3.14159265
#define TAU 6.28318531
#define saturate(i) clamp(i,0.,1.)
#define linearstep(a,b,x) saturate(((x)-(a))/((b)-(a)))

#define MTL_UNLIT 1.0
#define MTL_PBR 2.0

#extension GL_EXT_draw_buffers : require

precision highp float;

// == varings / uniforms ===========================================================================
varying vec4 vPosition;
varying vec3 vNormal;
varying vec4 vColor;
varying float vLife;
varying vec2 vUv;

uniform sampler2D samplerDoublequoteRandom;

// == common =======================================================================================
mat2 rotate2D( float _t ) {
  return mat2( cos( _t ), sin( _t ), -sin( _t ), cos( _t ) );
}

vec2 uvInvY( vec2 uv ) {
  return vec2( 0.0, 1.0 ) + vec2( 1.0, -1.0 ) * uv;
}

// == main procedure ===============================================================================
void main() {
  if ( vColor.a < 0.0 ) { discard; }

  vec4 tex = texture2D( samplerDoublequoteRandom, uvInvY( vUv ) );
  if ( tex.w < 0.5 ) { discard; }

  gl_FragData[ 0 ] = vPosition;
  gl_FragData[ 1 ] = vec4( vNormal, 1.0 );
  gl_FragData[ 2 ] = 0.1 * tex;
  gl_FragData[ 3 ] = vec4( vec3( 0.9, 0.1, 10.0 ), MTL_PBR );
}
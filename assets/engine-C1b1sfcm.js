const x=`#version 300 es
precision highp float;
precision highp sampler2D;
`,ze=`${x}
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
}`,He=`${x}
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
}`,qe=`${x}
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
}`,We=`${x}
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
}`,ke=`${x}
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
}`,je=`${x}
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
}`,Ke=`${x}
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
}`,Je=`${x}
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
}`,Qe=`${x}
in vec2 vUv;
uniform sampler2D uTexture;
uniform float uValue;
out vec4 outColor;

void main() {
  outColor = uValue * texture(uTexture, vUv);
}`,Ze=`${x}
in vec2 vUv;
uniform sampler2D uDye;
uniform float uExposure;
out vec4 outColor;

void main() {
  vec3 c = 1.0 - exp(-max(texture(uDye, vUv).rgb, 0.0) * uExposure);
  float a = max(c.r, max(c.g, c.b));
  outColor = vec4(mix(c, vec3(a), 0.12), a);
}`,et=`${x}
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
}`,tt=`${x}
in vec4 vColor;
out vec4 outColor;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float glow = clamp(1.0 - d, 0.0, 1.0);
  glow *= glow;
  float a = vColor.a * glow;
  outColor = vec4(mix(vColor.rgb, vec3(1.0), glow * 0.5) * a, a);
}`,ot=16,rt=.8,nt=22,it=.45,_e=1.5,Se=1.35,oe=7,S=(v,m,b)=>Math.min(b,Math.max(m,v)),l=(v,m)=>v+Math.random()*(m-v);function ut(v,m,b){const e=v.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"low-power"});if(!e)return null;e.getExtension("EXT_color_buffer_float");function re(t,r){const o=e.createShader(t);if(e.shaderSource(o,r),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(o));return o}function p(t,r){const o=e.createProgram();if(e.attachShader(o,t),e.attachShader(o,re(e.FRAGMENT_SHADER,r)),e.bindAttribLocation(o,0,"aPosition"),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(o));const u={},n=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const{name:s}=e.getActiveUniform(o,i);u[s]=e.getUniformLocation(o,s)}return{program:o,uniforms:u}}let y,Ee;try{const t=re(e.VERTEX_SHADER,ze);y={splat:p(t,He),advect:p(t,qe),divergence:p(t,We),curl:p(t,ke),vorticity:p(t,je),pressure:p(t,Ke),gradient:p(t,Je),scale:p(t,Qe),display:p(t,Ze)},Ee=p(re(e.VERTEX_SHADER,et),tt)}catch{return null}const ne=e.createVertexArray();e.bindVertexArray(ne),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const C=new Float32Array(m.particles*oe),Te=e.createVertexArray(),pe=e.createBuffer();e.bindVertexArray(Te),e.bindBuffer(e.ARRAY_BUFFER,pe),e.bufferData(e.ARRAY_BUFFER,C.byteLength,e.DYNAMIC_DRAW);const ie=oe*4;e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,ie,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,ie,8),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,1,e.FLOAT,!1,ie,24),e.bindVertexArray(null);let M=1,g=1,a,w,A,ue,ae;const ce=[];function J(t,r,o,u){const n=e.createTexture();e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,o,t,r,0,u,e.HALF_FLOAT,null);const i=e.createFramebuffer();if(e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw new Error("gas: half-float render targets are not supported");e.viewport(0,0,t,r),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);const s={tex:n,fbo:i,w:t,h:r};return ce.push(s),s}function le(t,r,o,u){let n=J(t,r,o,u),i=J(t,r,o,u);return{get read(){return n},get write(){return i},swap(){[n,i]=[i,n]}}}function ye(t){const r=M/g;return r>=1?[Math.round(t*r),t]:[t,Math.round(t/r)]}function Ae(){for(const i of ce.splice(0))e.deleteTexture(i.tex),e.deleteFramebuffer(i.fbo);M=Math.max(1,v.clientWidth),g=Math.max(1,v.clientHeight);const t=m.scale*Math.min(window.devicePixelRatio||1,1);v.width=Math.max(1,Math.round(M*t)),v.height=Math.max(1,Math.round(g*t));const[r,o]=ye(m.sim),[u,n]=ye(m.dye);a=le(r,o,e.RG16F,e.RG),A=le(r,o,e.R16F,e.RED),ue=J(r,o,e.R16F,e.RED),ae=J(r,o,e.R16F,e.RED),w=le(u,n,e.RGBA16F,e.RGBA)}try{Ae()}catch{return null}function h(t,r){return e.useProgram(t.program),r&&e.uniform2f(t.uniforms.uTexel,1/r.w,1/r.h),t.uniforms}function f(t,r){return e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,r.tex),t}function d(t){t?(e.viewport(0,0,t.w,t.h),e.bindFramebuffer(e.FRAMEBUFFER,t.fbo)):(e.viewport(0,0,v.width,v.height),e.bindFramebuffer(e.FRAMEBUFFER,null)),e.drawArrays(e.TRIANGLE_STRIP,0,4)}function Be(t){const r=h(y.splat,a.read);e.uniform1f(r.uAspect,M/g),e.uniform2f(r.uPoint,t.x/M,1-t.y/g),e.uniform1f(r.uRadius,(t.radius/g)**2);const o=a.read.h/g;e.uniform3f(r.uColor,t.vx*o,-t.vy*o,0),e.uniform1i(r.uTarget,f(0,a.read)),d(a.write),a.swap(),t.color&&(e.uniform3f(r.uColor,t.color[0],t.color[1],t.color[2]),e.uniform1i(r.uTarget,f(0,w.read)),d(w.write),w.swap())}function Ve(t,r){let o=h(y.curl,a.read);e.uniform1i(o.uVelocity,f(0,a.read)),d(ae),o=h(y.vorticity,a.read),e.uniform1i(o.uVelocity,f(0,a.read)),e.uniform1i(o.uCurl,f(1,ae)),e.uniform1f(o.uCurlStrength,nt),e.uniform1f(o.uDt,t),d(a.write),a.swap(),o=h(y.divergence,a.read),e.uniform1i(o.uVelocity,f(0,a.read)),d(ue),o=h(y.scale,A.read),e.uniform1i(o.uTexture,f(0,A.read)),e.uniform1f(o.uValue,rt),d(A.write),A.swap(),o=h(y.pressure,A.read),e.uniform1i(o.uDivergence,f(1,ue));for(let u=0;u<ot;u++)e.uniform1i(o.uPressure,f(0,A.read)),d(A.write),A.swap();o=h(y.gradient,a.read),e.uniform1i(o.uPressure,f(0,A.read)),e.uniform1i(o.uVelocity,f(1,a.read)),d(a.write),a.swap(),o=h(y.advect,a.read),e.uniform2f(o.uVelTexel,1/a.read.w,1/a.read.h),e.uniform2f(o.uShift,0,r),e.uniform1f(o.uDt,t),e.uniform1i(o.uVelocity,f(0,a.read)),e.uniform1i(o.uSource,f(0,a.read)),e.uniform1f(o.uDissipation,it),d(a.write),a.swap(),e.uniform1i(o.uVelocity,f(0,a.read)),e.uniform1i(o.uSource,f(1,w.read)),e.uniform1f(o.uDissipation,_e),d(w.write),w.swap()}const R=m.particles,B=new Float32Array(R),V=new Float32Array(R),I=new Float32Array(R),O=new Float32Array(R),_=new Float32Array(R),X=new Float32Array(R),Q=new Float32Array(R),G=new Float32Array(R*3);let D=0;function se(t,r,o,u,n,i,s){if(D>=R)return;const c=D++;B[c]=t,V[c]=r,I[c]=o,O[c]=u,_[c]=X[c]=n,Q[c]=i,G.set(s,c*3)}function Ie(t,r,o){const u=Math.exp(-1.4*t);for(let n=0;n<D;){if(_[n]-=t,_[n]<=0){const i=--D;B[n]=B[i],V[n]=V[i],I[n]=I[i],O[n]=O[i],_[n]=_[i],X[n]=X[i],Q[n]=Q[i],G.copyWithin(n*3,i*3,i*3+3);continue}I[n]=(I[n]+Math.sin(V[n]*.012+o*1.7)*46*t)*u,O[n]=(O[n]+Math.cos(B[n]*.011-o*1.3)*46*t-22*t)*u,B[n]+=I[n]*t,V[n]+=O[n]*t-r,n++}}function Oe(){for(let r=0;r<D;r++){const o=r*oe,u=_[r]/X[r],n=Math.min(1,(X[r]-_[r])/.12);C[o]=B[r],C[o+1]=V[r],C[o+2]=G[r*3],C[o+3]=G[r*3+1],C[o+4]=G[r*3+2],C[o+5]=n*u**1.3,C[o+6]=Q[r]}const t=h(Ee);e.uniform2f(t.uView,M,g),e.uniform1f(t.uScale,v.width/M),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(Te),e.bindBuffer(e.ARRAY_BUFFER,pe),e.bufferSubData(e.ARRAY_BUFFER,0,C,0,D*oe),e.drawArrays(e.POINTS,0,D),e.disable(e.BLEND),e.bindVertexArray(ne)}const fe=[];let Y=!1,$=!1,z=0,ve=0,me=0,xe=0,he=window.scrollY;function de(t,r,o,u,n,i){if(fe.push({x:t,y:r,vx:o,vy:u,color:n,radius:i}),n){const s=Math.max(n[0],n[1],n[2]),c=Math.log(Math.max(2*s*255*Se,1))/_e;me=Math.max(me,performance.now()+c*1e3)}}function Fe(){Y||$||(Y=!0,ve=performance.now(),z=requestAnimationFrame(Ce))}function Ce(t){const r=S((t-ve)/1e3,.001,.03333333333333333);ve=t,e.disable(e.BLEND),e.bindVertexArray(ne);for(const n of fe)Be(n);fe.length=0;const o=xe;xe=0,Ve(r,o/g),Ie(r,o,t/1e3);const u=h(y.display,w.read);if(e.uniform1i(u.uDye,f(0,w.read)),e.uniform1f(u.uExposure,Se),d(null),D&&Oe(),t>me&&D===0){Ne();return}z=requestAnimationFrame(Ce)}function Ne(){Y=!1,z=0;for(const t of ce)e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null),e.clear(e.COLOR_BUFFER_BIT)}const Z=()=>b[Math.random()*b.length|0],Re=(t,r)=>[t[0]*r,t[1]*r,t[2]*r];function ge(t,r,o,u,n){let i=n%1*2*(o+u);return i<o?[t+i,r,0,-1]:(i-=o,i<u?[t+o,r+i,1,0]:(i-=u,i<o?[t+o-i,r+u,0,1]:[t,r+u-(i-o),-1,0]))}function Xe(t){const r=b.length,o=t*.12%r,u=b[Math.floor(o)],n=b[(Math.floor(o)+1)%r],i=o-Math.floor(o);return[u[0]+(n[0]-u[0])*i,u[1]+(n[1]-u[1])*i,u[2]+(n[2]-u[2])*i]}function Ge(t,{mode:r="disperse",dir:o=[0,-1],strength:u=1}={}){if($)return;const n=u*m.intensity,{x:i,y:s,width:c,height:F}=t,Le=i+c/2,Ue=s+F/2,be=Math.max(Math.min(c,F),40);if(r==="condense"){const H=S(Math.round(m.splats*(c+F)/900),4,m.splats*2),N=S(be*.16,22,80);for(let P=0;P<H;P++){const[q,W,E,T]=ge(i,s,c,F,(P+l(.2,.8))/H);de(q+E*N*.6,W+T*N*.6,-E*240*n,-T*240*n,Re(Z(),.2*n),N)}const te=Math.round(Math.min(R*.06,(c+F)/40)*u);for(let P=0;P<te;P++){const[q,W,E,T]=ge(i,s,c,F,Math.random()),L=l(20,60),U=l(70,150);se(q+E*L,W+T*L,-E*U,-T*U,l(.5,.9),l(1.4,3),Z())}}else{const H=Math.hypot(o[0],o[1])||1,N=o[0]/H,te=o[1]/H,P=Math.max(3,Math.round(m.splats*Math.min(1.6,Math.sqrt(c*F)/400+.4))),q=S(be*.2,18,130);for(let E=0;E<P;E++){const T=i+c*l(.1,.9),L=s+F*l(.1,.9),U=T-Le,k=L-Ue,j=Math.hypot(U,k)||1,K=l(260,520)*n;de(T,L,N*K+U/j*120*n,te*K+k/j*120*n-80*n,Re(Z(),.34*n),q*l(.8,1.2))}const W=Math.round(S(Math.sqrt(c*F)/3,10,R*.7)*u);for(let E=0;E<W;E++){const T=i+c*Math.random(),L=s+F*Math.random(),U=T-Le,k=L-Ue,j=Math.hypot(U,k)||1,K=l(60,220),Me=l(20,140);se(T,L,N*K+U/j*Me,te*K+k/j*Me-l(10,50),l(1.1,2.3),l(1.4,4.2),Z())}}Fe()}function Ye(t,r,o,u){if($||!m.stir)return;const n=Math.hypot(o,u);if(n<.5)return;const i=S(o*60,-2400,2400),s=S(u*60,-2400,2400),c=Xe(performance.now()/1e3);de(t,r,i*.45,s*.45,Re(c,Math.min(.05,n*.0025)*m.intensity),26),n>8&&Math.random()<.5&&se(t+l(-6,6),r+l(-6,6),i*.05+l(-20,20),s*.05+l(-30,10),l(.5,.9),l(1.2,2.4),c),Fe()}function we(){const t=window.scrollY;Y&&(xe+=t-he),he=t}let ee=0;function De(){ee||(ee=requestAnimationFrame(()=>{ee=0;try{Ae()}catch{$=!0}}))}function Pe(t){t.preventDefault(),$=!0,Y=!1,cancelAnimationFrame(z)}window.addEventListener("scroll",we,{passive:!0}),window.addEventListener("resize",De,{passive:!0}),v.addEventListener("webglcontextlost",Pe);function $e(){cancelAnimationFrame(z),cancelAnimationFrame(ee),window.removeEventListener("scroll",we),window.removeEventListener("resize",De),v.removeEventListener("webglcontextlost",Pe),e.getExtension("WEBGL_lose_context")?.loseContext()}return{puff:Ge,stir:Ye,dispose:$e}}export{ut as createEngine};

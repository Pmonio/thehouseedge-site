document.querySelectorAll('.league').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.league').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));document.querySelectorAll('.tabs').forEach(t=>t.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{t.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active')})));document.querySelector('#search').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim())document.querySelector('.disclosure').textContent='Search preview: live search is not connected yet. Use the live platform to search fixtures.'});(async()=>{
const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
const canvas=document.getElementById('stadium3d'),hero=canvas.closest('.hero');
try{
const scene=new THREE.Scene();scene.background=new THREE.Color(0x07130b);scene.fog=new THREE.FogExp2(0x07130b,.019);
const camera=new THREE.PerspectiveCamera(48,1,.1,500);camera.position.set(22,37,75);camera.lookAt(0,0,0);
const renderer=new THREE.WebGLRenderer({canvas,antialias:window.devicePixelRatio<2,alpha:false,powerPreference:'low-power'});
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.65;
const turf=new THREE.Group();scene.add(turf);
for(let i=0;i<12;i++){const strip=new THREE.Mesh(new THREE.PlaneGeometry(110,7),new THREE.MeshStandardMaterial({color:i%2?0x235b2e:0x1a4925,roughness:1}));strip.rotation.x=-Math.PI/2;strip.position.z=-38.5+i*7; turf.add(strip)}
const lineMat=new THREE.LineBasicMaterial({color:0xc9efd0,transparent:true,opacity:.83});
function lines(points){const geo=new THREE.BufferGeometry().setFromPoints(points.map(([x,z])=>new THREE.Vector3(x,.075,z)));turf.add(new THREE.Line(geo,lineMat))}
function rect(x1,z1,x2,z2){lines([[x1,z1],[x2,z1],[x2,z2],[x1,z2],[x1,z1]])}
rect(-52,-35,52,35);lines([[0,-35],[0,35]]);
const circle=[];for(let i=0;i<=80;i++){const a=i*Math.PI*2/80;circle.push([9.15*Math.cos(a),9.15*Math.sin(a)])}lines(circle);
rect(-52,-20,-36,20);rect(36,-20,52,20);rect(-52,-9,-47,9);rect(47,-9,52,9);
function box(w,h,d,x,y,z,col){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:col,roughness:.95}));m.position.set(x,y,z);scene.add(m);return m}
for(let i=0;i<11;i++){const rise=i*1.75;const shade=i%2?0x172b20:0x213629;box(130,1.7,3,0,rise-1,-45-i*3.1,shade);box(130,1.7,3,0,rise-1,45+i*3.1,shade);box(3,1.7,100+6*i,-63-i*3,rise-1,0,shade);box(3,1.7,100+6*i,63+i*3,rise-1,0,shade)}
scene.add(new THREE.HemisphereLight(0xaed9ff,0x0b180d,2.2));
for(const [x,z] of [[-67,-57],[67,-57],[-67,57],[67,57]]){const light=new THREE.SpotLight(0xd8f8ff,1800,230,Math.PI/4,.8,1.1);light.position.set(x,45,z);light.target.position.set(0,0,0);scene.add(light,light.target);box(1,43,1,x,22,z,0x536459);box(12,1.2,2,x,45,z,0xe5f8ec)}
const resize=()=>{const w=hero.clientWidth,h=hero.clientHeight;renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.set(w<700?30:22, w<700?38:37,w<700?83:75);camera.lookAt(0,0,0);camera.updateProjectionMatrix();renderer.render(scene,camera)};new ResizeObserver(resize).observe(hero);resize();
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let frame=0,visible=true;new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:0}).observe(hero);
function animate(t){requestAnimationFrame(animate);if(!visible||document.hidden)return;if(!reduced&&frame++%2===0){camera.position.x+=(Math.sin(t*.00015)*2-camera.position.x*.02)*.008;camera.lookAt(0,0,0)}renderer.render(scene,camera)}requestAnimationFrame(animate);
}catch(e){canvas.style.display='none';hero.style.background='radial-gradient(ellipse at 70% 80%,#1b7940,#00220e 80%)';console.error('Stadium 3D failed',e);}
})();
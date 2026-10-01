const roles=['Server Hardware • Break/Fix • Remote Hands','Network Engineering • Arista • Cisco','Fiber Optics • SMF/MMF • OTDR','Rack & Stack • Power • Data Center Operations'];let r=0,c=0,d=false,t=document.querySelector('#typed');function type(){let s=roles[r];t.textContent=s.slice(0,c);if(!d&&c<s.length){c++;setTimeout(type,48)}else if(!d){d=true;setTimeout(type,1350)}else if(c>0){c--;setTimeout(type,24)}else{d=false;r=(r+1)%roles.length;setTimeout(type,250)}}setTimeout(type,800);const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');o.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>o.observe(e));let done=false;new IntersectionObserver(es=>{if(es[0].isIntersecting&&!done){done=true;document.querySelectorAll('[data-n]').forEach(e=>{let n=+e.dataset.n,s=performance.now();function a(x){let p=Math.min((x-s)/1000,1);e.textContent=Math.floor(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(a)}requestAnimationFrame(a)})}},{threshold:.25}).observe(document.querySelector('.metrics'));addEventListener('scroll',()=>document.querySelector('#progress').style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%');document.querySelector('#year').textContent=new Date().getFullYear();
const scene=document.querySelector('.rackScene');
if(scene && matchMedia('(pointer:fine)').matches){
  document.querySelector('.hero').addEventListener('mousemove',e=>{
    const x=(e.clientX/innerWidth-.5)*5,y=(e.clientY/innerHeight-.5)*4;
    scene.style.transform=`rotateY(${-5+x}deg) rotateX(${-y}deg)`;
  });
  document.querySelector('.hero').addEventListener('mouseleave',()=>scene.style.transform='rotateY(-5deg)');
}

// V7: smooth header state + gentle hero parallax
const hdr=document.querySelector('header');
const hero=document.querySelector('.hero');
function motionScroll(){
  hdr?.classList.toggle('scrolled',scrollY>28);
}
addEventListener('scroll',motionScroll,{passive:true}); motionScroll();

if(hero && matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
  hero.addEventListener('mousemove',e=>{
    const r=hero.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    hero.style.setProperty('--mx',`${x*10}px`);
    hero.style.setProperty('--my',`${y*8}px`);
  });
}

// V8 ambient cursor glow
if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
  const glow=document.createElement('div');
  glow.id='ambientGlow'; document.body.appendChild(glow);
  addEventListener('pointermove',e=>{
    glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
  },{passive:true});
}

// V11: single-view navigation with a subtle fade / lift transition.
const routeMap={
  home:['home','.home-extra'],
  about:['about','.about-extra'],
  experience:['experience'],
  work:['work'],
  skills:['skills','.skills-extra'],
  contact:['contact']
};
document.body.classList.add('route-mode');
function routeName(){
  const h=(location.hash||'#home').slice(1);
  return routeMap[h]?h:'home';
}
function activateRoute(name){
  document.querySelectorAll('main > section, main > .ticker').forEach(el=>el.classList.remove('route-active'));
  (routeMap[name]||routeMap.home).forEach(key=>{
    if(key.startsWith('.')) document.querySelectorAll(key).forEach(el=>el.classList.add('route-active'));
    else document.getElementById(key)?.classList.add('route-active');
  });
  [...document.body.classList].filter(x=>x.startsWith('route-')&&x!=='route-mode').forEach(x=>document.body.classList.remove(x));
  document.body.classList.add('route-'+name);
  document.querySelectorAll('nav .navRoute').forEach(a=>a.classList.toggle('active',a.dataset.route===name));
  scrollTo({top:0,left:0,behavior:'instant'});
}
let switching=false;
function navigate(name){
  if(switching||name===routeName()) return;
  switching=true;
  document.body.classList.add('route-leaving');
  setTimeout(()=>{
    history.pushState(null,'','#'+name);
    document.body.classList.remove('route-leaving');
    activateRoute(name);
    switching=false;
  },220);
}
document.querySelectorAll('.navRoute').forEach(a=>a.addEventListener('click',e=>{
  const name=a.dataset.route;
  if(!name) return;
  e.preventDefault(); navigate(name);
}));
addEventListener('popstate',()=>activateRoute(routeName()));
addEventListener('hashchange',()=>activateRoute(routeName()));
activateRoute(routeName());

// V15 navigation transition accent
document.addEventListener("DOMContentLoaded",()=>{
  const flash=document.createElement("div");
  flash.id="v15Flash";
  document.body.appendChild(flash);
  document.querySelectorAll(".navRoute").forEach(link=>{
    link.addEventListener("click",()=>{
      flash.classList.remove("play");
      void flash.offsetWidth;
      flash.classList.add("play");
      document.body.classList.add("v15-leaving");
      setTimeout(()=>document.body.classList.remove("v15-leaving"),320);
    });
  });
});

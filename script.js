document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>nav.style.display=nav.style.display==='flex'?'none':'flex');
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<=900)nav.style.display='none'}));

(function(){
  var d=document,root=d.documentElement;
  root.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // apparitions au défilement (le contenu est dans le HTML, il reste lisible sans JS)
  var els=[].slice.call(d.querySelectorAll('.rv'));
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){io.observe(e)});
    setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},4000);
  }else{els.forEach(function(e){e.classList.add('in')})}

  // lueur qui suit le pointeur, écrans qui bougent doucement au défilement
  var hero=d.querySelector('.hero');
  if(hero && !reduce && window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')});
  }
  var sheets=[].slice.call(d.querySelectorAll('.sheet'));
  if(sheets.length && !reduce){
    var tick=false;
    window.addEventListener('scroll',function(){if(tick)return;tick=true;requestAnimationFrame(function(){var y=Math.min(window.scrollY,700);sheets.forEach(function(s,i){s.style.marginTop=(-y*(0.05+i*0.04))+'px'});tick=false})},{passive:true});
  }

  // menu mobile
  var b=d.querySelector('.burger'),m=d.querySelector('.mobile');
  if(b&&m){
    b.addEventListener('click',function(){m.classList.add('open');b.setAttribute('aria-expanded','true')});
    m.querySelector('.close').addEventListener('click',function(){m.classList.remove('open');b.setAttribute('aria-expanded','false')});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open')}});
  }

  // formulaire d'audit : ouvre l'agenda de rendez-vous avec le nom, l'email et le site déjà remplis.
  // Rien n'est envoyé à un serveur tiers par cette page.
  var f=d.getElementById('audit-form');
  if(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var v=function(n){return encodeURIComponent((f.elements[n]&&f.elements[n].value||'').trim())};
      window.location.href='https://calendly.com/next-business-fr/diagnostic?name='+v('nom')+'&email='+v('email')+'&a1='+v('site');
    });
  }
})();

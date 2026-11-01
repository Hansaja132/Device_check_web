'use strict';
const $=id=>document.getElementById(id);
const setText=(id,text)=>{const el=$(id);if(el)el.textContent=text};
const errorMessage=e=>({NotAllowedError:'Permission was denied. Allow access in browser settings.',NotFoundError:'No suitable device was found.',NotReadableError:'Device is busy or unavailable.',OverconstrainedError:'The requested device settings are unavailable.'}[e?.name]||e?.message||'This feature is unavailable in this browser.');

document.addEventListener('DOMContentLoaded',()=>{
  const current=document.body.dataset.page;
  document.querySelectorAll('[data-page]').forEach(link=>{
    if(link.tagName==='A'&&link.dataset.page===current)link.setAttribute('aria-current','page');
  });

  const menu=$('menuButton');
  const nav=$('nav');
  const closeMenu=()=>{
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded','false');
    if(menu){menu.setAttribute('aria-label','Open navigation');menu.textContent='Menu'}
  };
  const openMenu=()=>{
    nav?.classList.add('open');
    menu?.setAttribute('aria-expanded','true');
    if(menu){menu.setAttribute('aria-label','Close navigation');menu.textContent='Close'}
  };

  menu?.setAttribute('aria-label','Open navigation');
  menu?.addEventListener('click',()=>nav?.classList.contains('open')?closeMenu():openMenu());
  nav?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu()});
  document.addEventListener('click',event=>{
    if(nav?.classList.contains('open')&&!event.target.closest('.site-header'))closeMenu();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menu?.focus()}
  });
  window.addEventListener('resize',()=>{if(window.innerWidth>1050)closeMenu()});

  const theme=$('themeButton');
  let savedTheme=null;
  try{savedTheme=localStorage.getItem('devicecheck-theme')}catch(error){}
  const prefersLight=window.matchMedia?.('(prefers-color-scheme: light)').matches;
  const setTheme=light=>{
    document.body.classList.toggle('light',light);
    theme?.setAttribute('aria-pressed',String(light));
    if(theme){theme.textContent=light?'☾':'☀';theme.title=light?'Use dark mode':'Use light mode'}
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',light?'#f4f7fb':'#0b1220');
  };
  setTheme(savedTheme?savedTheme==='light':prefersLight);
  theme?.addEventListener('click',()=>{
    const light=!document.body.classList.contains('light');
    setTheme(light);
    try{localStorage.setItem('devicecheck-theme',light?'light':'dark')}catch(error){}
  });
});

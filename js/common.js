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
    document.querySelectorAll('.brand-logo').forEach(logo=>{
      logo.src=light?'assets/logo-light.png':'assets/logo_dark.png';
    });
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

  const escapeAttribute=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;');
  let adFrameSequence=0;
  const createAdFrame=({title,width,height,key,src,native=false})=>{
    const frame=document.createElement('iframe');
    const frameId=`ad-frame-${++adFrameSequence}`;
    frame.className='ad-frame';
    frame.dataset.adFrame=frameId;
    frame.title=title;
    frame.width=String(width);
    frame.height=String(height);
    frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.setAttribute('scrolling','no');
    const readyScript=`<script>addEventListener('DOMContentLoaded',()=>{const report=()=>{if(document.querySelector('iframe,a[href],img,object,embed'))parent.postMessage({type:'devicecheck-ad-ready',id:'${frameId}'},'*')};new MutationObserver(report).observe(document.body,{childList:true,subtree:true});report()});<\/script>`;
    frame.srcdoc=native
      ?`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;overflow:hidden;background:transparent}#container-${key}{width:100%}</style>${readyScript}</head><body><script async data-cfasync="false" src="${escapeAttribute(src)}"><\/script><div id="container-${key}"></div></body></html>`
      :`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;overflow:hidden;background:transparent;text-align:center}</style>${readyScript}</head><body><script>window.atOptions={key:'${key}',format:'iframe',height:${height},width:${width},params:{}};<\/script><script src="${escapeAttribute(src)}"><\/script></body></html>`;
    return frame;
  };

  const createZone=(className,label)=>{
    const zone=document.createElement('aside');
    zone.className=`ad-zone ad-pending ${className}`;
    zone.setAttribute('aria-label','Advertisement');
    const caption=document.createElement('span');
    caption.className='ad-label';
    caption.textContent=label;
    zone.append(caption);
    return zone;
  };

  window.addEventListener('message',event=>{
    if(event.data?.type!=='devicecheck-ad-ready'||typeof event.data.id!=='string')return;
    const frame=document.querySelector(`[data-ad-frame="${event.data.id}"]`);
    if(frame&&event.source===frame.contentWindow)frame.closest('.ad-zone')?.classList.remove('ad-pending');
  });

  const adAnchor=document.querySelector('main > .panel:not(.editorial)')||$('tools');
  if(adAnchor){
    const banner=innerWidth>=760
      ?{width:728,height:90,key:'c1091456bcf49bc47c073104c5048281'}
      :innerWidth>=500
        ?{width:468,height:60,key:'f78ba977ed24eb17d291eac84f76c4a7'}
        :{width:320,height:50,key:'981f0699842dc0bbb2189c7092a7ae88'};
    const bannerZone=createZone('ad-zone-banner','Advertisement');
    bannerZone.style.setProperty('--ad-height',`${banner.height}px`);
    bannerZone.append(createAdFrame({
      title:'Advertisement banner',
      ...banner,
      src:`https://bauval.org/22/${banner.key}`
    }));

    const directLink=document.createElement('a');
    directLink.className='ad-direct-link';
    directLink.href='https://araplhn.org/4/9dee8daae72858506920e0825f556c5d';
    directLink.target='_blank';
    directLink.rel='sponsored noopener noreferrer';
    directLink.textContent='Sponsored link';
    bannerZone.append(directLink);
    adAnchor.insertAdjacentElement('afterend',bannerZone);

    const nativeAnchor=document.querySelector('.panel.editorial')||document.querySelector('.related');
    if(nativeAnchor){
      const nativeZone=createZone('ad-zone-native','Sponsored');
      nativeZone.append(createAdFrame({
        title:'Sponsored content',
        width:1140,
        height:250,
        key:'6a326ee0ae685e5bbe43a87a652e562b',
        src:'https://bauval.org/21/6a326ee0ae685e5bbe43a87a652e562b',
        native:true
      }));
      nativeAnchor.insertAdjacentElement('afterend',nativeZone);
    }

    if(innerWidth>=1500){
      const rail=innerHeight>=820
        ?{width:160,height:600,key:'5883ce89c3e01cbe43a87a652e562b'}
        :{width:160,height:300,key:'556cdd940e0ae7d0c4650c9940d19c3b'};
      const railZone=createZone('ad-zone-rail','Advertisement');
      railZone.append(createAdFrame({
        title:'Advertisement sidebar',
        ...rail,
        src:`https://bauval.org/22/${rail.key}`
      }));
      document.body.append(railZone);
    }

    ['https://abscloud.org/1/d1d87c8946abd9e7507d899db497a067','https://bauval.org/14/2cd804c04a8cf82d0cc6c7d77826fb10'].forEach(src=>{
      const script=document.createElement('script');
      script.dataset.cfasync='false';
      script.src=src;
      document.body.append(script);
    });
  }
});

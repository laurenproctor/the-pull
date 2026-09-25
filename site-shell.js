/* Set preferences before paint, then enhance navigation once the DOM is ready. */
(() => {
  const themeKey='the-pull:theme:v1', sidebarKey='the-pull:sidebar:v1';
  const system=matchMedia('(prefers-color-scheme: dark)');let explicit=null;
  try{const stored=localStorage.getItem(themeKey);if(['light','dark'].includes(stored))explicit=stored;
    if(localStorage.getItem(sidebarKey)==='collapsed')document.documentElement.dataset.sidebar='collapsed';}catch{}
  document.documentElement.dataset.theme=explicit||(system.matches?'dark':'light');
  const paths={
    discover:'<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/>',
    shortlist:'<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
    projects:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v3h4v-3"/>',
    intelligence:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M10 7v6M7 10h6"/>',
    analytics:'<path d="M4 3v17h17M8 16v-4M13 16V7M18 16v-6"/>',
    legal:'<path d="M12 3v17M7 21h10M4 7h16M6 7l-3 7h6L6 7Zm12 0-3 7h6l-3-7Z"/>',
    creative:'<path d="m14 4 6 6M4 20l5-1L21 7a2 2 0 0 0-4-4L5 15l-1 5Z"/>',
    campaign:'<path d="m3 9 14-5v16L3 15V9Zm4 7 2 5h3l-2-4M20 9l2-1M20 15l2 1"/>',
    support:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4M12 16v1"/>',
    brief:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM9 11h6M9 15h6"/>',
    assessment:'<path d="m4 6 2 2 3-4m-5 9 2 2 3-4M12 6h8M12 13h8M4 20h16"/>',
    compare:'<rect x="3" y="4" width="7" height="16" rx="1"/><rect x="14" y="4" width="7" height="16" rx="1"/>',
    opportunity:'<path d="M9 18h6M9 21h6M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2Z"/>',
    tracker:'<path d="M4 21V3m0 1h13l-3 4 3 4H4"/>',
    home:'<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
    collaboration:'<path d="m8 14 8-8M9 7l2-2a5 5 0 0 1 7 7l-2 2M15 17l-2 2a5 5 0 0 1-7-7l2-2"/>',
    approvals:'<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
    timeline:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h3M14 17h3"/>',
    files:'<path d="M3 6h7l2 3h9v12H3V6Z"/>',
    privacy:'<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z"/><path d="m8 12 3 3 5-6"/>',
    accessibility:'<circle cx="12" cy="4" r="2"/><path d="m4 8 8 2 8-2M12 10v5m0 0-5 6m5-6 5 6"/>',
    cookies:'<circle cx="12" cy="12" r="9"/><path d="M8 8h.01M15 7h.01M12 12h.01M7 15h.01M16 16h.01"/>',
    panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m7-11-3 3 3 3"/>',
    moon:'<path d="M20 15a9 9 0 0 1-11-11A9 9 0 1 0 20 15Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1 1M18 18l1 1M5 19l1-1M18 6l1-1"/>'
  };
  const icon=name=>'<svg class="pull-nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[name]||paths.files)+'</svg>';
  function updateTheme(){
    const dark=document.documentElement.dataset.theme==='dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(b=>{
      b.setAttribute('aria-checked',String(dark));b.title=dark?'Switch to light mode':'Switch to dark mode';
      b.innerHTML=icon(dark?'moon':'sun')+'<span>'+ (dark?'Dark':'Light')+'</span>';
    });
  }
  function init(){
    const nav=document.querySelector('[data-theme-host]')||document.querySelector('.pull-nav nav')||document.querySelector('.topbar-right');
    if(nav){const b=document.createElement('button');b.type='button';b.className='pull-theme-toggle';b.dataset.themeToggle='';b.setAttribute('role','switch');b.setAttribute('aria-label','Dark mode');nav.append(b);}
    updateTheme();
    document.addEventListener('click',e=>{if(e.target.closest('[data-theme-toggle]')){
      explicit=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=explicit;
      try{localStorage.setItem(themeKey,explicit)}catch{}updateTheme();
    }});
    const sidebar=document.getElementById('appSidebar');if(!sidebar)return;
    sidebar.querySelectorAll('[data-primary],[data-screen],[data-client-screen]').forEach(b=>{
      const name=b.dataset.primary||b.dataset.screen||b.dataset.clientScreen;
      const text=[...b.childNodes].map(n=>n.textContent.trim()).filter(Boolean).join(' ');b.setAttribute('aria-label',text);b.title=text;
      if(!b.querySelector('span'))b.innerHTML='<span>'+b.textContent+'</span>';
      b.insertAdjacentHTML('afterbegin',icon(name==='results'?'analytics':name));
    });
    sidebar.querySelectorAll('.pull-sidebar-links a,.pull-sidebar-links button').forEach(b=>{
      const label=b.textContent.trim(),href=b.getAttribute('href')||'';
      const kind=href==='/'?'home':href.includes('privacy')?'privacy':href.includes('terms')?'legal':href.includes('accessibility')?'accessibility':href.includes('support')?'support':'cookies';
      b.setAttribute('aria-label',label);b.title=label;b.innerHTML=icon(kind)+'<span>'+label+'</span>';
    });
    const collapse=document.getElementById('pullSidebarToggle');
    const sync=()=>{const collapsed=document.documentElement.dataset.sidebar==='collapsed';collapse.setAttribute('aria-expanded',String(!collapsed));collapse.setAttribute('aria-label',collapsed?'Expand sidebar':'Collapse sidebar');collapse.title=collapsed?'Expand sidebar':'Collapse sidebar';collapse.innerHTML=icon('panel');};
    collapse.addEventListener('click',()=>{const next=document.documentElement.dataset.sidebar==='collapsed'?'expanded':'collapsed';document.documentElement.dataset.sidebar=next;try{localStorage.setItem(sidebarKey,next)}catch{}sync();});sync();
  }
  system.addEventListener('change',()=>{if(!explicit){document.documentElement.dataset.theme=system.matches?'dark':'light';updateTheme();}});
  window.addEventListener('storage',e=>{if(e.key===themeKey){explicit=['light','dark'].includes(e.newValue)?e.newValue:null;document.documentElement.dataset.theme=explicit||(system.matches?'dark':'light');updateTheme();}});
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();

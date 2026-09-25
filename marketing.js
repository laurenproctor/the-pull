(() => {
  const header=document.querySelector('.m-header');
  const menu=document.querySelector('.m-menu-toggle');
  if(header&&menu){
    header.dataset.enhanced='true';
    const close=()=>{header.dataset.open='false';menu.setAttribute('aria-expanded','false');menu.textContent='Menu';};
    menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';header.dataset.open=String(open);menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu';});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.dataset.open==='true'){close();menu.focus();}});
    document.addEventListener('click',e=>{if(!header.contains(e.target))close();});
  }
  const form=document.getElementById('enquiry-form');
  if(!form)return;
  const interestLabels={general:'A collaboration / general inquiry',press:'Press inquiry',sprint:'Opportunity Sprint ($5,000)',managed:'Managed Collaboration (from $30,000)',programme:'Ongoing collaboration program',legal:'Independent agreement review (fee confirmed by counsel)'};
  const interest=document.getElementById('enquiry-interest');
  const requested=new URLSearchParams(location.search).get('interest');
  if(interest&&Object.hasOwn(interestLabels,requested))interest.value=requested;
  const preview=document.getElementById('enquiry-preview'),draft=document.getElementById('enquiry-draft'),email=document.getElementById('enquiry-email'),status=document.getElementById('enquiry-status');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form),clean=key=>String(data.get(key)||'').trim();
    const selectedInterest=interestLabels[clean('interest')]||interestLabels.general;
    const subject=selectedInterest+(clean('company')?' — '+clean('company'):'');
    const body=`Hello The Pull,\n\n${clean('message')}\n\nInterested in: ${selectedInterest}\nStarting point: ${clean('stage')}\nBrand / company: ${clean('company')||'Not specified'}\n\n${[clean('firstName'),clean('lastName')].filter(Boolean).join(' ')}\n${clean('email')}\nPhone: ${clean('phone')||'Not provided'}`;
    draft.value=`To: support@the---pull.com\nSubject: ${subject}\n\n${body}`;
    email.href='mailto:support@the---pull.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    preview.hidden=false;status.textContent='Draft prepared. Review it below, then open your email app to send.';draft.focus();
  });
  form.addEventListener('input',()=>{if(!preview.hidden){preview.hidden=true;status.textContent='Details changed. Prepare your inquiry again to update the draft.';}});
  document.getElementById('enquiry-copy').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(draft.value);status.textContent='Inquiry copied. Paste it into an email to support@the---pull.com.';}
    catch{draft.focus();draft.select();status.textContent='Select and copy the draft above, then paste it into your email app.';}
  });
  email.addEventListener('click',()=>{status.textContent='Your email app can now open the draft. Send it there when you’re ready. Nothing has been submitted by this website.';});
})();

/* Attraction, tension and release. All targets keep their original hit areas. */
(() => {
  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const toggle=document.querySelector('[data-motion-toggle]');
  let paused=false,active=false,frame=0,lastTime=0,layoutDirty=true;
  try{paused=localStorage.getItem('pull-motion-paused')==='true'}catch{}
  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
  const pair=document.querySelector('[data-attraction]');
  const footer=document.querySelector('.m-footer-brand');
  const rows=[...document.querySelectorAll('.m-step,.m-launch-rows article,.m-price-card,.m-duo article,.m-account-benefits article')];
  const reveals=[...document.querySelectorAll('.m-page-intro h1 em,.m-home-offer h1 em,.m-intro h2,.m-newsletter h2,.m-about-question h2')];
  const visible=new Set();
  const springs=[];
  const cords=[];
  const tracked=[pair,footer,...rows].filter(Boolean);
  rows.forEach(el=>el.classList.add('m-pull-row'));
  reveals.forEach(el=>el.dataset.pullReveal='');
  const schedule=()=>{if(active&&!document.hidden&&!frame)frame=requestAnimationFrame(draw)};
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    for(const e of entries){
      if(e.isIntersecting){visible.add(e.target);e.target.classList.add('is-in-view')}
      else visible.delete(e.target);
    }
    layoutDirty=true;schedule();
  },{rootMargin:'60px 0px',threshold:0}):null;
  [...tracked,...reveals].forEach(el=>{if(observer)observer.observe(el);else{visible.add(el);el.classList.add('is-in-view')}});

  // A restrained elastic connection, drawn in the CTA's existing negative space.
  document.querySelectorAll('.m-newsletter,.m-contact-info').forEach(section=>{
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 1000 96');svg.setAttribute('preserveAspectRatio','none');
    svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.classList.add('m-pull-cord');
    const anchors=document.createElementNS(ns,'path');anchors.setAttribute('d','M 2 37 V 59 M 998 37 V 59');anchors.classList.add('m-cord-anchors');
    const line=document.createElementNS(ns,'path');line.setAttribute('d','M 2 48 Q 500 48 998 48');line.classList.add('m-cord-line');
    svg.append(anchors,line);section.prepend(svg);
    const cord={section,svg,line,x:500,y:0,target:0,velocity:0,held:false,entered:false,base:0};cords.push(cord);observer?.observe(section);
    const release=()=>{cord.held=false;cord.target=0;schedule()};
    section.addEventListener('pointermove',e=>{
      if(!active||!fine.matches||e.pointerType==='touch')return;
      const r=svg.getBoundingClientRect();
      if(e.clientY<r.top-65||e.clientY>r.bottom+65){release();return}
      cord.held=true;cord.x=clamp((e.clientX-r.left)/r.width*1000,60,940);
      cord.target=clamp((e.clientY-r.top-r.height/2)*.6,-32,32);schedule();
    });
    section.addEventListener('pointerleave',release);
  });

  function magnet(host,target,strengthX,strengthY){
    if(!target)return;
    const s={host,target,x:0,y:0,tx:0,ty:0,vx:0,vy:0};springs.push(s);
    host.addEventListener('pointermove',e=>{
      if(!active||!fine.matches||e.pointerType==='touch')return;
      const b=host.getBoundingClientRect();
      s.tx=clamp((e.clientX-b.left)/b.width*2-1,-1,1)*strengthX;
      s.ty=clamp((e.clientY-b.top)/b.height*2-1,-1,1)*strengthY;schedule();
    });
    const release=()=>{s.tx=s.ty=0;schedule()};
    host.addEventListener('pointerleave',release);host.addEventListener('blur',release,true);
  }
  document.querySelectorAll('.m-button>span').forEach(el=>magnet(el.parentElement,el,12,7));
  document.querySelectorAll('.m-logo,.m-footer .m-brand').forEach(el=>magnet(el,el.querySelector('i'),9,3));
  document.querySelectorAll('.m-portrait').forEach(el=>magnet(el,el.querySelector('img'),7,5));
  // Only wrap link text, preserving labels, focus rings, and click geometry.
  document.querySelectorAll('.m-nav>a,.m-text-link,.m-offer-link').forEach(link=>{
    const label=document.createElement('span');label.className='m-magnetic-label';
    label.append(...link.childNodes);link.append(label);magnet(link,label,5,3);
  });
  function updateLayout(){
    const h=innerHeight;
    if(pair&&visible.has(pair)){
      const r=pair.getBoundingClientRect();
      pair.style.setProperty('--pull-progress',clamp((h-r.top)/(h*.85),0,1).toFixed(4));
    }
    for(const el of rows){if(!visible.has(el))continue;
      const r=el.getBoundingClientRect();el.style.setProperty('--section-pull',clamp((h-r.top)/(h*.55),0,1).toFixed(4));
    }
    if(footer&&visible.has(footer)){
      const r=footer.getBoundingClientRect();footer.style.setProperty('--footer-pull',clamp((h-r.top)/(h*.65),0,1).toFixed(4));
    }
    for(const c of cords){if(!visible.has(c.section))continue;
      const r=c.section.getBoundingClientRect();c.base=28*(1-clamp((h-r.top)/(h*.65),0,1));
      if(!c.entered){c.entered=true;c.y=23;c.velocity=-1.5}
    }
    layoutDirty=false;
  }
  function draw(time){
    frame=0;if(!active||document.hidden)return;
    const dt=lastTime?clamp((time-lastTime)/16.667,.3,2):1;lastTime=time;
    if(layoutDirty)updateLayout();
    let settling=false;
    for(const s of springs){
      if(Math.abs(s.tx-s.x)+Math.abs(s.ty-s.y)+Math.abs(s.vx)+Math.abs(s.vy)<.025){
        s.x=s.tx;s.y=s.ty;s.vx=s.vy=0;
      }else{
        s.vx=(s.vx+(s.tx-s.x)*.14*dt)*Math.pow(.69,dt);s.vy=(s.vy+(s.ty-s.y)*.14*dt)*Math.pow(.69,dt);
        s.x+=s.vx*dt;s.y+=s.vy*dt;settling=true;
      }
      s.target.style.setProperty('--magnet-x',s.x.toFixed(3)+'px');s.target.style.setProperty('--magnet-y',s.y.toFixed(3)+'px');
    }
    for(const c of cords){if(!visible.has(c.section))continue;
      const target=c.held?c.target:c.base;
      if(Math.abs(target-c.y)+Math.abs(c.velocity)>.03){
        c.velocity=(c.velocity+(target-c.y)*.12*dt)*Math.pow(.77,dt);c.y+=c.velocity*dt;settling=true;
      }else{c.y=target;c.velocity=0}
      c.line.setAttribute('d',`M 2 48 Q ${c.x.toFixed(1)} ${(48+c.y).toFixed(2)} 998 48`);
    }
    if(settling)schedule();else lastTime=0;
  }
  function sync(){
    active=!paused&&!reduced.matches;root.dataset.motion=active?'on':'off';
    if(toggle){toggle.hidden=false;toggle.disabled=reduced.matches;toggle.textContent=reduced.matches?'Reduced motion':paused?'Enable motion':'Pause motion';toggle.setAttribute('aria-pressed',String(!active))}
    for(const s of springs){s.x=s.y=s.tx=s.ty=s.vx=s.vy=0;s.target.style.removeProperty('--magnet-x');s.target.style.removeProperty('--magnet-y')}
    for(const c of cords){c.y=c.target=c.velocity=c.base=0;c.held=false;c.line.setAttribute('d','M 2 48 Q 500 48 998 48')}
    if(frame){cancelAnimationFrame(frame);frame=0}lastTime=0;layoutDirty=true;schedule();
  }
  toggle?.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('pull-motion-paused',String(paused))}catch{}sync()});
  reduced.addEventListener('change',sync);fine.addEventListener('change',sync);
  addEventListener('scroll',()=>{layoutDirty=true;schedule()},{passive:true});
  addEventListener('resize',()=>{layoutDirty=true;schedule()},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0}else{layoutDirty=true;schedule()}});
  addEventListener('pagehide',()=>{if(frame)cancelAnimationFrame(frame);frame=0});
  addEventListener('pageshow',()=>{layoutDirty=true;schedule()});
  addEventListener('storage',e=>{if(e.key==='pull-motion-paused'){paused=e.newValue==='true';sync()}});
  sync();
})();

/* Store opt-in requests through the site's host; never store contact details locally. */
(() => {
  document.querySelectorAll('[data-pull-subscribe]').forEach(form=>{
    const status=form.querySelector('[data-subscription-status]');
    const phone=form.querySelector('[data-sms-phone]'),sms=form.querySelector('[data-sms-consent]');
    const syncPhone=()=>{phone.required=sms.checked;phone.setCustomValidity(sms.checked&&!/^\+?[\d\s().-]{7,40}$/.test(phone.value.trim())?'Enter a phone number with country code for text updates.':'')};
    phone.addEventListener('input',syncPhone);sms.addEventListener('change',syncPhone);
    let pending=false;
    form.addEventListener('submit',async event=>{
      event.preventDefault();syncPhone();if(pending||!form.reportValidity())return;
      // Netlify removes data-netlify when its build has registered the form.
      if(form.hasAttribute('data-netlify')){status.textContent='Subscriptions are being connected. Your details have not been sent or saved. Please try again when registration opens.';return}
      const body=new URLSearchParams(new FormData(form));
      body.set('email-consent',form.elements['email-consent'].checked?'yes':'no');body.set('sms-consent',sms.checked?'yes':'no');
      if(!sms.checked)body.set('phone','');
      const button=form.querySelector('[type=submit]');pending=true;button.disabled=true;form.setAttribute('aria-busy','true');status.textContent='Sending your request…';
      try{
        const response=await fetch(form.getAttribute('action'),{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});
        if(!response.ok)throw new Error('Submission unavailable');
        status.textContent=form.name==='pull-account-access'?'Your access request has been received. We’ll contact you when accounts open. No account or password has been created.':'Your subscription request has been received. Newsletter delivery will begin when publishing opens. Text updates are not active yet.';
        form.reset();syncPhone();
      }catch{status.textContent='We couldn’t confirm your request. Your details are still in the form; please try again later.'}
      finally{pending=false;button.disabled=false;form.removeAttribute('aria-busy')}
    });
  });
})();

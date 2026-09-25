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

/* A small motion system: stable hit areas, no scroll interception, no hidden copy. */
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.querySelector('[data-motion-toggle]');
  let paused = false;
  try { paused = localStorage.getItem('pull-motion-paused') === 'true'; } catch {}
  let active = false, frame = 0;
  const pair = document.querySelector('[data-attraction]');
  let pairVisible = !!pair;
  const reveal = [...document.querySelectorAll('.m-step h2,.m-service-card h3,.m-launch-rows h3,.m-intro h2,.m-cta h2')];
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-in-view'); observer.unobserve(entry.target);
    }
  }, { threshold: .12 }) : null;
  for (const el of reveal) {
    if (observer) { el.dataset.pullReveal = ''; observer.observe(el); }
  }
  const draw = () => {
    frame = 0;
    if (!active || !pair || !pairVisible) return;
    const rect = pair.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height * .3)));
    pair.style.setProperty('--pull-progress', progress.toFixed(3));
  };
  const schedule = () => { if (active && pairVisible && !frame) frame = requestAnimationFrame(draw); };
  if (pair && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => { pairVisible = entries[0].isIntersecting; schedule(); }).observe(pair);
  }
  const magnets = [];
  document.querySelectorAll('.m-button > span').forEach(label => {
    const link = label.parentElement;
    const reset = () => { label.style.transform = ''; };
    link.addEventListener('pointermove', e => {
      if (!active || !fine.matches || e.pointerType === 'touch') return;
      const box = link.getBoundingClientRect();
      const x = Math.max(-7, Math.min(7, (e.clientX - box.left - box.width / 2) * .07));
      const y = Math.max(-5, Math.min(5, (e.clientY - box.top - box.height / 2) * .2));
      label.style.transform = `translate(${x}px,${y}px)`;
    });
    link.addEventListener('pointerleave', reset); link.addEventListener('blur', reset);
    magnets.push(reset);
  });
  const sync = () => {
    active = !paused && !reduced.matches;
    root.dataset.motion = active ? 'on' : 'off';
    if (toggle) {
      toggle.hidden = false;
      toggle.disabled = reduced.matches;
      toggle.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Enable motion' : 'Pause motion';
      toggle.setAttribute('aria-pressed', String(!active));
    }
    magnets.forEach(reset => reset());
    if (!active && frame) { cancelAnimationFrame(frame); frame = 0; }
    schedule();
  };
  toggle?.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('pull-motion-paused', String(paused)); } catch {}
    sync();
  });
  reduced.addEventListener('change', sync);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('pagehide', () => { if (frame) cancelAnimationFrame(frame); });
  sync();
})();

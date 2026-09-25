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

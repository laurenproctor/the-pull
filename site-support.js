(() => {
  const form=document.getElementById('pullSupportForm');if(!form)return;
  const status=document.getElementById('pullSupportStatus');
  function request(){
    const topic=document.getElementById('pullSupportTopic').value;
    const url=document.getElementById('pullSupportUrl').value.trim();
    const details=document.getElementById('pullSupportDetails').value.trim();
    return {to:topic==='Privacy request'?'privacy@the---pull.com':'support@the---pull.com',subject:'The Pull — '+topic,body:topic+'\n'+(url?'Page: '+url+'\n':'')+'\n'+details};
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();if(!form.reportValidity())return;const r=request();
    const link=document.createElement('a');link.href='mailto:'+r.to+'?subject='+encodeURIComponent(r.subject)+'&body='+encodeURIComponent(r.body);link.click();
    status.textContent='Email draft requested. Review and send it in your email application. If it did not open, copy the request and email '+r.to+'. Nothing has been sent by this page.';
  });
  document.getElementById('pullSupportCopy').addEventListener('click',async()=>{
    if(!form.reportValidity())return;const r=request();
    try{await navigator.clipboard.writeText('To: '+r.to+'\nSubject: '+r.subject+'\n\n'+r.body);status.textContent='Request copied. Paste it into an email and send it to '+r.to+'.';}
    catch{status.textContent='Copy was unavailable. Select your message above and copy it manually, then email '+r.to+'.';}
  });
})();

/* Optional services are blocked until the visitor makes a choice. */
(() => {
  'use strict';
  const key='the-pull:consent:v1', maxAge=180*24*60*60*1000;
  let choice=null, feedbackLoaded=false, returnFocus=null;
  try { const saved=JSON.parse(localStorage.getItem(key)); if(saved?.version===1 && Date.now()-saved.savedAt<maxAge && saved.savedAt<=Date.now()) choice=saved; } catch {}
  const allowed=category=>choice?.[category]===true;
  function activate(){
    if(allowed('feedback')&&!feedbackLoaded){
      const template=document.querySelector('script[data-pull-feedback]');
      if(template){const script=document.createElement('script');script.src=template.dataset.src;script.async=true;script.dataset.feedbackActive='true';document.head.append(script);feedbackLoaded=true;}
    }
    document.querySelectorAll('[data-consent-src]').forEach(frame=>{
      if(allowed('media')) {if(!frame.hasAttribute('src'))frame.src=frame.dataset.consentSrc;frame.hidden=false;}
      else {frame.removeAttribute('src');frame.hidden=true;}
    });
    document.querySelectorAll('.pull-media-blocked').forEach(el=>el.hidden=allowed('media'));
  }
  function save(feedback,media){
    const revoke=feedbackLoaded&&!feedback;
    choice={version:1,feedback,media,savedAt:Date.now()};
    let persisted=true;
    try{localStorage.setItem(key,JSON.stringify(choice));}catch{persisted=false;}
    document.getElementById('pull-cookie-banner')?.remove();
    document.getElementById('pull-cookie-dialog')?.close();
    activate();
    const status=document.getElementById('pull-consent-status');
    status.textContent=persisted?'Cookie preferences saved.':'Preferences apply to this page. Your browser did not allow us to save them.';
    if(revoke&&persisted)location.reload();
    else if(revoke)status.textContent+=' Reload this page to stop the already loaded feedback tool.';
  }
  function preferences(){
    const dialog=document.getElementById('pull-cookie-dialog');
    document.getElementById('pull-feedback-choice').checked=allowed('feedback');
    document.getElementById('pull-media-choice').checked=allowed('media');
    returnFocus=document.activeElement;dialog.showModal();
  }
  function init(){
    const host=document.createElement('div');host.id='pull-consent';
    host.innerHTML=`<p id="pull-consent-status" class="pull-sr-only" role="status"></p><dialog id="pull-cookie-dialog" aria-labelledby="pull-cookie-title"><div class="pull-dialog-head"><p class="pull-eyebrow">Your side of the partnership</p><button type="button" data-cookie-close aria-label="Close cookie preferences">×</button></div><h2 id="pull-cookie-title">Choose your ingredients.</h2><p>Keep the essentials. Add only the extras you want.</p><div class="pull-cookie-option"><div><strong>Essential storage</strong><p>Remembers your privacy choice and saves the profile or research records you choose to keep in this browser.</p></div><span>Always on</span></div><label class="pull-cookie-option"><div><strong>Website feedback</strong><p>Loads BugHerd so you can pin feedback to a page. Reports can include screenshots and browser details.</p></div><input type="checkbox" id="pull-feedback-choice"></label><label class="pull-cookie-option"><div><strong>Embedded social media</strong><p>Loads YouTube and Instagram players. These providers receive connection information and may use cookies or similar storage.</p></div><input type="checkbox" id="pull-media-choice"></label><p class="pull-small">No advertising or audience analytics tags are configured in this preview. External images and links are described in our <a href="/privacy/">privacy notice</a>.</p><div class="pull-cookie-actions"><button type="button" data-cookie-reject>Reject optional</button><button type="button" data-cookie-save>Save choices</button><button type="button" data-cookie-accept>Accept optional</button></div><p class="pull-small">You can change your mind at any time using Cookie settings in the footer.</p></dialog>`;
    document.body.append(host);
    if(!choice){
      const banner=document.createElement('section');banner.id='pull-cookie-banner';banner.setAttribute('aria-labelledby','pull-cookie-heading');
      banner.innerHTML=`<div class="pull-cookie-badge" aria-hidden="true">🍪 <span>×</span> YOU</div><div class="pull-cookie-copy"><p class="pull-eyebrow">A tiny collaboration</p><h2 id="pull-cookie-heading">Good chemistry. Clear consent.</h2><p>Cookies want to partner with your browser. Essential storage keeps things working; optional extras power feedback and social embeds. You choose who gets an invite.</p><a href="/cookies/">Meet the ingredients</a></div><div class="pull-cookie-actions"><button type="button" data-cookie-reject>Reject optional</button><button type="button" data-cookie-accept>Accept optional</button><button type="button" data-cookie-settings>Choose ingredients</button></div>`;
      document.body.append(banner);
    }
    document.addEventListener('click',e=>{
      if(e.target.closest('[data-cookie-settings]'))preferences();
      if(e.target.closest('[data-cookie-reject]'))save(false,false);
      if(e.target.closest('[data-cookie-accept]'))save(true,true);
      if(e.target.closest('[data-cookie-save]'))save(document.getElementById('pull-feedback-choice').checked,document.getElementById('pull-media-choice').checked);
      if(e.target.closest('[data-cookie-close]'))document.getElementById('pull-cookie-dialog').close();
    });
    document.getElementById('pull-cookie-dialog').addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus();});
    new MutationObserver(activate).observe(document.body,{childList:true,subtree:true});
    window.addEventListener('storage',e=>{if(e.key===key)location.reload();});
    activate();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();

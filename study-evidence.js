/* Public source records and browser-local additions; no simulated collection. */
'use strict';
const studyNetworks = [
  {id:'instagram',name:'Instagram',query:'site:instagram.com'},
  {id:'youtube',name:'YouTube',query:'site:youtube.com'},
  {id:'x',name:'X',query:'(site:x.com OR site:twitter.com)'},
  {id:'tiktok',name:'TikTok',query:'site:tiktok.com'},
  {id:'linkedin',name:'LinkedIn',query:'site:linkedin.com'},
  {id:'facebook-pages',name:'Facebook Pages',query:'site:facebook.com -inurl:groups'},
  {id:'facebook-groups',name:'Facebook Groups',query:'site:facebook.com/groups/'},
  {id:'reddit',name:'Reddit',query:'site:reddit.com'},
  {id:'pinterest',name:'Pinterest',query:'site:pinterest.com'},
  {id:'substack',name:'Substack',query:'site:substack.com'},
  {id:'mastodon',name:'Mastodon',query:'(Mastodon OR site:mastodon.social OR site:mastodon.online)'}
];
const studyEvidenceStorageKey = 'the-pull:study-evidence:v1';
const evidenceEscape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function evidenceUrl(value){
  try{const url=new URL(value);return url.protocol==='https:'?url.href:''}catch{return ''}
}
function evidenceDate(value){
  if(!value || !/^\d{4}-\d{2}-\d{2}(T|$)/.test(value))return '';
  return Number.isNaN(Date.parse(value))?'':value;
}
function evidenceTime(value){
  const valid=evidenceDate(value);if(!valid)return 'Not recorded';
  const date=new Date(valid);
  const label=date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
  return valid.length===10?`${label} · time not recorded`:`${label}, ${date.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'UTC'})} UTC`;
}
function loadLocalStudyEvidence(){
  try{const state=JSON.parse(localStorage.getItem(studyEvidenceStorageKey)||'{}');return state&&typeof state==='object'&&!Array.isArray(state)?state:{}}catch{return {}}
}
function localStudyEvidence(id){
  const stored=loadLocalStudyEvidence()[id];
  if(!stored||typeof stored!=='object')return {records:[],previous:null};
  return {records:Array.isArray(stored.records)?stored.records.filter(p=>p&&p.localId&&studyNetworks.some(n=>n.id===p.network)&&['owned','earned'].includes(p.lane)&&evidenceUrl(p.sourceUrl)&&evidenceDate(p.collectedAt)):[],previous:stored.previous||null};
}
function evidenceIdentity(record){
  const url=evidenceUrl(record.sourceUrl);const clean=url?url.split('?')[0].replace(/\/$/,''):'';
  const parsed=url?new URL(url):null;
  const youtube=parsed&&(/(^|\.)youtube\.com$/.test(parsed.hostname)||parsed.hostname==='youtu.be');
  const videoId=youtube?(parsed.hostname==='youtu.be'?parsed.pathname.slice(1):parsed.searchParams.get('v')):null;
  const individual=/\/(?:p|reel|status|comments|posts)\//.test(url)||videoId;
  const key=videoId?`youtube:${videoId}`:individual?clean:clean+'|'+(record.handle||'')+'|'+(record.quote||record.copy||record.title||'');
  return `${record.lane}|${record.network}|${key}`;
}
function uniqueEvidence(records){
  const seen=new Set();return records.filter(p=>{const key=evidenceIdentity(p);if(seen.has(key))return false;seen.add(key);return true});
}
function recordedSourceDate(study,url){return study.sources?.find(src=>src.url===url)?.captured||null}
function studySocialRecords(id,study){
  let owned=(study.ownedSocial||study.social||[]).map((p,i)=>({...p,lane:'owned',network:({IG:'instagram',YT:'youtube',LI:'linkedin',in:'linkedin'})[p.badge]||({LinkedIn:'linkedin',X:'x'})[p.platform],recordId:`${id}:owned:${i}`,media:[]}));
  const earned=(study.conversationSocial||[]).map((p,i)=>({...p,lane:'earned',network:({X:'x',LinkedIn:'linkedin'})[p.platform],recordId:`${id}:earned:${i}`,collectedAt:null,media:p.media||[]}));
  if(id==='supreme-apresse'){
    owned.forEach(p=>{p.sourceUrl=study.sources.find(s=>s.url.includes('pictame.com'))?.url;p.collectedAt=recordedSourceDate(study,p.sourceUrl);p.sourceType='Third-party Instagram mirror';p.media=[{type:'image',url:p.img,context:true,caption:'Related official product image · original Instagram media was not captured.'}];});
  }
  if(id==='carolina-taffin'){
    // The legacy third card described a missing post. It is not an observation.
    owned=owned.slice(0,2);
    owned.forEach((p,i)=>{p.sourceUrl=study.sources.filter(s=>s.url.includes('imginn.com'))[i]?.url;p.collectedAt=recordedSourceDate(study,p.sourceUrl);p.sourceType='Third-party mirror · collection context';p.contextOnly=true;p.media=[{type:'image',url:p.img,context:true,caption:'Related runway image · original Instagram media was not captured.'}];});
  }
  if(id==='paul-barbour'){
    owned=owned.slice(0,2);
    owned[0].sourceUrl='https://www.youtube.com/watch?v=-FQxnLlQz_Y';
    owned[0].sourceType='Official Paul Smith YouTube';
    owned[0].media=[{type:'youtube',url:owned[0].sourceUrl,caption:'Official campaign film · play here or open on YouTube.'}];
    owned[1].sourceUrl=study.sources.find(s=>s.url.includes('linkedin.com'))?.url;
    owned[1].sourceType='Official LinkedIn post';
    owned[1].media=[{type:'image',url:owned[1].img,context:true,caption:'Related official campaign image · LinkedIn post media was not captured.'}];
    owned.forEach(p=>p.collectedAt=recordedSourceDate(study,p.sourceUrl));
    // Durable permalinks recovered from the cited editorial embeds on this pass.
    const posts=[['Dcxwx4IDXAR','@barbour'],['Dc0Vx87Ag4s','@barbour'],['Dc2mtH8J3Mi','@paulsmithdesign']];
    posts.forEach(([code,handle],i)=>owned.push({recordId:`${id}:instagram:${code}`,lane:'owned',network:'instagram',handle,title:`Highland Odyssey · launch Reel ${i+1}`,copy:'Official campaign Reel referenced by The Impression. Open the original post if Instagram requires sign-in to play it here.',sourceUrl:`https://www.instagram.com/reel/${code}/`,sourceType:'Official Instagram permalink · observed in editorial embed',evidenceUrl:'https://theimpression.com/barbour-and-paul-smith-head-to-the-highlands-for-third-collaboration/',collectedAt:'2026-09-25T00:23:51Z',captureNote:'Permalink recovered from the editorial page. No new engagement snapshot collected.',media:[{type:'instagram',url:`https://www.instagram.com/reel/${code}/`,caption:'Original Instagram Reel · playback depends on Instagram availability.'}]}));
  }
  return uniqueEvidence([...owned,...earned,...localStudyEvidence(id).records]);
}
function getStudyCoverage(id,study,posts){
  const press=[...new Map((study.press||[]).map(p=>[p.link,{...p,category:'press',collectedAt:recordedSourceDate(study,p.link),sourceUrl:p.link}])).values()];
  const official=(study.sources||[]).filter(p=>p.tier==='A'&&!/youtube\.com|linkedin\.com|instagram\.com|facebook\.com|pictame\.com|imginn\.com/.test(p.url)).map(p=>({...p,category:'official',collectedAt:p.captured,sourceUrl:p.url}));
  const all=[...posts.map(p=>({...p,category:p.lane})),...press,...official];
  const counts={owned:posts.filter(p=>p.lane==='owned').length,earned:posts.filter(p=>p.lane==='earned').length,press:press.length,official:official.length};
  return {all,counts,total:all.length,networks:new Set(posts.map(p=>p.network)).size,previous:localStudyEvidence(id).previous};
}
function collectedStamp(records,label='Last data collected'){
  const dates=records.map(p=>evidenceDate(p.collectedAt)).filter(Boolean).sort();
  const unknown=records.length-dates.length;const last=dates.at(-1);
  return `<div class="collection-stamp">${label}: ${last?`<time datetime="${evidenceEscape(last)}">${evidenceTime(last)}</time>`:'Not recorded'}${unknown?` · ${unknown} record${unknown===1?' has':'s have'} no collection timestamp`:''}.</div>`;
}
function evidenceMediaMarkup(media,post){
  const items=Array.isArray(media)?media:[];
  const result=items.map(m=>{
    const url=evidenceUrl(m.url);if(!url)return '';
    const caption=evidenceEscape(m.caption||(m.context?'Related campaign media':'Post media'));
    let html='',kind='';
    if(m.type==='image')html=`<img src="${evidenceEscape(url)}" alt="${evidenceEscape(m.alt||post.title||'Social post image')}" loading="lazy" data-evidence-media>`;
    else if(m.type==='video')html=`<video controls preload="none" data-evidence-media ${evidenceUrl(m.poster)?`poster="${evidenceEscape(m.poster)}"`:''}><source src="${evidenceEscape(url)}">Your browser cannot play this video.</video>`;
    else if(m.type==='audio')html=`<audio controls preload="none" src="${evidenceEscape(url)}" data-evidence-media>Your browser cannot play this audio.</audio>`;
    else if(m.type==='youtube'){
      const parsed=new URL(url);const code=parsed.hostname==='youtu.be'?parsed.pathname.slice(1):parsed.searchParams.get('v');
      if(!/^[\w-]{11}$/.test(code||''))return '';
      html=`<iframe title="${evidenceEscape(post.title||'YouTube post')}" src="https://www.youtube-nocookie.com/embed/${code}" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }else if(m.type==='instagram'){
      const parsed=new URL(url);const match=parsed.pathname.match(/^\/(p|reel)\/([\w-]+)\/?$/);
      if(!/(^|\.)instagram\.com$/.test(parsed.hostname)||!match)return '';
      kind=' instagram';html=`<iframe title="${evidenceEscape(post.title||'Instagram post')}" src="https://www.instagram.com/${match[1]}/${match[2]}/embed/" loading="lazy" allow="fullscreen" allowfullscreen></iframe>`;
    }
    if(!html)return '';
    return `<figure class="social-media${kind}">${html}<div class="social-media-fallback" hidden>Preview unavailable. Open the media or original post to view it.</div><figcaption>${caption}</figcaption><a class="media-source-link" href="${evidenceEscape(url)}" target="_blank" rel="noopener noreferrer">${m.type==='image'?'Open image':'Open original media'} ↗</a></figure>`;
  }).join('');
  return result||'<div class="media-missing">Post media was not captured. Open the source to check for images, video, or audio.</div>';
}
function studyPostMarkup(post){
  const network=studyNetworks.find(n=>n.id===post.network);const url=evidenceUrl(post.sourceUrl);
  return `<article class="social-post-card"><div class="social-post-head"><div class="social-post-author"><div class="social-platform-badge">${evidenceEscape(network?.name==='Instagram'?'IG':network?.name==='YouTube'?'YT':network?.name?.slice(0,2)||'↗')}</div><div><strong>${evidenceEscape(post.handle||'Public source')}</strong><span>${evidenceEscape(post.accountRole||post.sourceType||'Manually collected')}</span></div></div>${post.contextOnly?'<span class="pill">Collection context</span>':''}</div>${post.title?`<h4 style="font-size:14px;margin:14px 0 0">${evidenceEscape(post.title)}</h4>`:''}${evidenceMediaMarkup(post.media,post)}<div class="social-post-quote">${evidenceEscape(post.quote||post.copy||'')}</div><div class="social-post-tags">${(post.tags||post.engagement||[]).map(t=>`<span class="tag">${evidenceEscape(t)}</span>`).join('')}</div><div class="social-post-source"><small>${evidenceEscape(post.captureNote||post.sourceType||'Public source record')}${post.publishedAt?`<br>Published: ${evidenceEscape(post.publishedAt)}`:''}${post.localId?'<br>Saved in this browser only.':''}</small>${url?`<a href="${evidenceEscape(url)}" target="_blank" rel="noopener noreferrer">Open source ↗</a>`:''}${post.evidenceUrl?`<a href="${evidenceEscape(evidenceUrl(post.evidenceUrl))}" target="_blank" rel="noopener noreferrer">Source of embed ↗</a>`:''}</div>${collectedStamp([post])}${post.localId?`<button type="button" class="remove-local-evidence" data-remove-evidence="${evidenceEscape(post.localId)}">Remove local record</button>`:''}</article>`;
}
function renderNetworkSections(id,study,posts,lane){
  return studyNetworks.map(network=>{
    const records=posts.filter(p=>p.network===network.id&&p.lane===lane);
    const note=id==='carolina-taffin'&&network.id==='instagram'&&lane==='owned'?'<p class="coverage-explainer" style="margin-bottom:14px">The Herrera posts are collection context. TAFFIN-owned posts about the collaboration were not observed.</p>':'';
    return `<details class="study-network" data-network="${network.id}" data-lane="${lane}" ${records.length?'open':''}><summary><span class="network-dot ${records.length?'observed':''}" aria-hidden="true"></span><strong>${network.name}</strong><span class="network-count">${records.length?`${records.length} evidence record${records.length===1?'':'s'}`:'Posts were not observed'}</span></summary><div class="network-content">${note}${records.length?`<div class="social-preview-grid">${records.map(studyPostMarkup).join('')}</div>`:`<div class="network-empty"><strong>Posts were not observed.</strong>No ${lane==='owned'?'brand-owned':'earned'} posts on ${network.name} are saved in this study. Public, private, deleted, and inaccessible content may be missing.</div>`}<div class="network-actions"><span class="coverage-explainer">${lane==='owned'?'Owned / official':'Conversation / earned'} · ${network.name}</span><button class="button secondary" type="button" data-retry-network="${network.id}" data-retry-lane="${lane}">Try data collection again</button></div>${collectedStamp(records)}</div></details>`;
  }).join('');
}
function coverageTrend(current,previous){
  if(!Number.isFinite(previous))return '— · no earlier saved snapshot';
  const delta=current-previous;return `${delta>0?'+':''}${delta} records${previous?` (${delta>0?'+':''}${Math.round(delta/previous*100)}%)`:delta>0?' · first records':''} vs previous saved snapshot`;
}
function renderCoverageDashboard(id,study,posts){
  const data=getStudyCoverage(id,study,posts);const labels={owned:'Owned social',earned:'Earned social',press:'Editorial / press',official:'Official web / email'};
  const max=Math.max(1,...Object.values(data.counts));
  const dateCounts={};data.all.forEach(p=>{const d=evidenceDate(p.collectedAt)?.slice(0,10);if(d)dateCounts[d]=(dateCounts[d]||0)+1});
  const dates=Object.keys(dateCounts).sort();const peak=Math.max(1,...Object.values(dateCounts));
  const undated=data.all.filter(p=>!evidenceDate(p.collectedAt)).length;
  const bars=dates.map((d,i)=>{const step=300/Math.max(1,dates.length),x=45+i*step,w=Math.min(65,step*.7),height=120*dateCounts[d]/peak;return `<rect x="${x}" y="${145-height}" width="${w}" height="${height}" rx="4" fill="#436b50"/><text x="${x+w/2}" y="${135-height}" text-anchor="middle" fill="#26472e" font-size="12">${dateCounts[d]}</text><text x="${x+w/2}" y="166" text-anchor="middle" fill="#66766b" font-size="10">${evidenceEscape(d.slice(5))}</text>`}).join('');
  const last=dates.at(-1);const before=dates.at(-2);const collectionTrend=before?`${dateCounts[last]} records collected on ${last}; ${dateCounts[before]} on ${before}.`:'One dated collection period is available. A trend needs another comparable collection.';
  return `<section class="coverage-dashboard" aria-labelledby="coverage-dashboard-title"><div class="section-label">Digital coverage</div><h3 id="coverage-dashboard-title">How much evidence have we collected?</h3><p class="coverage-explainer">Counts describe this study’s saved source records. Feed observations and provisional mirrors remain labeled in the cards below.</p><div class="coverage-kpis"><div class="coverage-kpi"><strong>${data.total}</strong><span>Total digital evidence records</span><small>${coverageTrend(data.total,data.previous?.total)}</small></div><div class="coverage-kpi"><strong>${data.counts.owned}</strong><span>Owned social records</span><small>${coverageTrend(data.counts.owned,data.previous?.counts?.owned)}</small></div><div class="coverage-kpi"><strong>${data.counts.earned}</strong><span>Earned social records</span><small>${coverageTrend(data.counts.earned,data.previous?.counts?.earned)}</small></div><div class="coverage-kpi"><strong>${data.networks} / ${studyNetworks.length}</strong><span>Networks with social evidence</span><small>${studyNetworks.length-data.networks} networks have no saved social posts</small></div></div><div class="coverage-charts"><div class="coverage-chart"><h4>Evidence across digital channels</h4><p>Each bar counts records in its own evidence set.</p>${Object.entries(labels).map(([key,label])=>`<div class="digital-bar-row"><span>${label}</span><div class="track" aria-hidden="true"><div class="fill" style="width:${data.counts[key]/max*100}%"></div></div><strong>${data.counts[key]}</strong></div>`).join('')}</div><div class="coverage-chart"><h4>Records by collection date</h4><p>${collectionTrend}</p>${dates.length?`<svg viewBox="0 0 370 185" role="img" aria-label="Records by collection date: ${evidenceEscape(dates.map(d=>`${d}: ${dateCounts[d]}`).join('; '))}"><line x1="30" y1="145" x2="350" y2="145" stroke="#dfe6df"/>${bars}</svg>`:'<div class="network-empty">No dated collection records are available.</div>'}<p>${undated} undated records excluded. Dates show collection activity, not when posts were published.</p></div></div><details class="coverage-method"><summary>Network counts, trends, and counting rules</summary><div class="coverage-table-wrap"><table class="coverage-table"><caption class="coverage-explainer">Social evidence by network · zero means no saved records</caption><thead><tr><th>Network</th><th>Owned</th><th>Earned</th><th>Change*</th></tr></thead><tbody>${studyNetworks.map(n=>{const owned=posts.filter(p=>p.network===n.id&&p.lane==='owned').length,earned=posts.filter(p=>p.network===n.id&&p.lane==='earned').length;const previous=data.previous?.networks?.[n.id];return `<tr><th scope="row">${n.name}</th><td>${owned}</td><td>${earned}</td><td>${Number.isFinite(previous)?(owned+earned-previous>0?'+':'')+(owned+earned-previous):'—'}</td></tr>`}).join('')}</tbody></table></div><p>*Changes compare the current record set with the snapshot before the most recent local addition or removal. No prior snapshot means no trend number. Opening or refreshing a page does not create a collection timestamp.</p><p>Duplicate post links are counted once per social lane and network. Feed and mirror observations use their recorded text to distinguish items. Editorial URLs are deduplicated. Official web/email counts include source pages. Collection context is labeled and included as evidence, not as partnership performance. These totals do not estimate unique reach, impressions, engagement, sales, or complete platform coverage.</p></details>${collectedStamp(data.all)}</section>`;
}
function renderStudyEvidence(id,study){
  const posts=studySocialRecords(id,study);
  const networkCount=new Set(posts.map(p=>p.network)).size;
  const networkPercent=Math.round(networkCount/studyNetworks.length*100);
  document.getElementById('coveragePct').textContent=`${networkCount} / ${studyNetworks.length}`;
  document.getElementById('coverageLabel').textContent='Networks with evidence';
  document.getElementById('coverageCopy').textContent=`Social evidence is saved for ${networkCount} of ${studyNetworks.length} monitored networks. This measures the source pack’s breadth, not the completeness of collection or the collaboration’s performance.`;
  document.querySelector('.coverage-donut').style.background=`conic-gradient(#143e33 0 ${networkPercent}%,#e4ebe8 ${networkPercent}% 100%)`;
  document.getElementById('studyOwnedSocial').innerHTML=renderNetworkSections(id,study,posts,'owned');
  document.getElementById('studyConversationSocial').innerHTML=renderNetworkSections(id,study,posts,'earned');
  document.getElementById('studyDigitalCoverage').innerHTML=renderCoverageDashboard(id,study,posts);
  document.getElementById('studyOwnedCollected').innerHTML=collectedStamp(posts.filter(p=>p.lane==='owned'),'Owned social · last data collected');
  document.getElementById('studyEarnedCollected').innerHTML=collectedStamp(posts.filter(p=>p.lane==='earned'),'Earned social · last data collected');
  const sourceRecords=(study.sources||[]).map(p=>({collectedAt:p.captured}));
  ['studyGalleryCollected','studyMetricsCollected','studyPressCollected'].forEach(id=>document.getElementById(id).innerHTML=collectedStamp(sourceRecords,'Source pack · last recorded collection'));
  document.getElementById('studyPageCollected').innerHTML=collectedStamp(getStudyCoverage(id,study,posts).all,'Study · last data collected');
  document.querySelectorAll('[data-retry-network]').forEach(button=>button.addEventListener('click',()=>openStudyCollection(id,button.dataset.retryNetwork,button.dataset.retryLane)));
  document.querySelectorAll('[data-evidence-media]').forEach(media=>media.addEventListener('error',()=>{media.hidden=true;media.closest('figure').querySelector('.social-media-fallback').hidden=false},true));
  document.querySelectorAll('[data-remove-evidence]').forEach(button=>button.addEventListener('click',()=>{
    const state=loadLocalStudyEvidence(),entry=localStudyEvidence(id);state[id]={records:entry.records.filter(p=>p.localId!==button.dataset.removeEvidence),previous:studyCoverageSnapshot(id,study)};
    try{localStorage.setItem(studyEvidenceStorageKey,JSON.stringify(state));renderStudyEvidence(id,study)}catch{showSystemToast('Record not removed','This browser could not save the change.');}
  }));
}
function studyCoverageSnapshot(id,study){
  const posts=studySocialRecords(id,study),data=getStudyCoverage(id,study,posts);
  return {total:data.total,counts:data.counts,networks:Object.fromEntries(studyNetworks.map(n=>[n.id,posts.filter(p=>p.network===n.id).length]))};
}
function openStudyCollection(id,networkId,lane){
  const study=observatoryStudies[id],network=studyNetworks.find(n=>n.id===networkId);if(!study||!network)return;
  document.getElementById('studyCollectionDialog')?.remove();
  const pair=`"${study.scopeA}" "${study.scopeB}"`;
  const query=`${pair} ${network.query} ${lane==='owned'?'official':''}`.trim();
  const dialog=document.createElement('dialog');dialog.id='studyCollectionDialog';dialog.className='collection-dialog';
  dialog.setAttribute('aria-labelledby','collectionDialogTitle');
  dialog.innerHTML=`<header><div><div class="section-label">${evidenceEscape(lane==='owned'?'Owned / official':'Conversation / earned')}</div><h2 id="collectionDialogTitle">Collect ${network.name} evidence again</h2></div><button class="close-collection" type="button" aria-label="Close collection dialog">×</button></header><p>${evidenceEscape(study.title)}</p><div class="collection-status" role="status"><strong>Automatic collection is not connected.</strong><p>Use the targeted search to check for new public posts, then save any evidence you find below. Searching alone will not update the study or its collection date.</p></div><a class="button collection-search" href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">Search ${network.name} again ↗</a>${networkId==='mastodon'?'<p>Mastodon search covers indexed public posts; it cannot search every instance.</p>':''}${networkId==='facebook-groups'?'<p>Private Facebook Groups require permission and are outside this public search.</p>':''}<details><summary>Add a post from your search</summary><p>New records are saved in this browser only. They update its coverage charts; they are not published to the shared site.</p><form id="studyCollectionForm"><label for="colSource">Source or post URL *</label><input id="colSource" name="sourceUrl" type="url" placeholder="https://…" required><label for="colHandle">Account or publisher *</label><input id="colHandle" name="handle" maxlength="160" required><label for="colCopy">Post text or observation *</label><textarea id="colCopy" name="copy" maxlength="3000" required></textarea><div class="collection-form-grid"><div><label for="colPublished">Publication date, if known</label><input id="colPublished" name="publishedAt" type="date"></div><div><label for="colMediaType">Media format</label><select id="colMediaType" name="mediaType"><option value="image">Image / GIF</option><option value="video">Video file</option><option value="audio">Audio file</option><option value="youtube">YouTube video</option><option value="instagram">Instagram post / Reel</option></select></div></div><label for="colMedia">Media URL, if available</label><input id="colMedia" name="mediaUrl" type="url" placeholder="https://…"><p>Use the post’s actual media URL or an original YouTube / Instagram permalink. If no media is available, leave this blank.</p><div id="collectionError" class="collection-error" role="alert"></div><button class="button collection-submit" type="submit">Save collected post</button></form></details>`;
  document.body.append(dialog);dialog.querySelector('.close-collection').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>dialog.remove());
  dialog.querySelector('form').addEventListener('submit',event=>{
    event.preventDefault();const form=new FormData(event.target),error=dialog.querySelector('#collectionError');
    const sourceUrl=evidenceUrl(form.get('sourceUrl')),mediaUrl=form.get('mediaUrl').trim(),mediaType=form.get('mediaType');
    if(!sourceUrl || (mediaUrl&&!evidenceUrl(mediaUrl))){error.textContent='Use a valid HTTPS source and media URL.';return}
    if(mediaUrl&&['instagram','youtube'].includes(mediaType)){
      const parsed=new URL(mediaUrl);const valid=mediaType==='instagram'?/(^|\.)instagram\.com$/.test(parsed.hostname)&&/^\/(p|reel)\/[\w-]+\/?$/.test(parsed.pathname):((parsed.hostname==='youtu.be'&&/^[\w-]{11}$/.test(parsed.pathname.slice(1)))||(/(^|\.)youtube\.com$/.test(parsed.hostname)&&/^[\w-]{11}$/.test(parsed.searchParams.get('v')||'')));
      if(!valid){error.textContent=`Use an original ${mediaType==='instagram'?'Instagram post or Reel':'YouTube video'} link for this media format.`;return}
    }
    const record={localId:crypto.randomUUID(),network:networkId,lane,sourceUrl,handle:form.get('handle').trim(),copy:form.get('copy').trim(),publishedAt:form.get('publishedAt')||null,collectedAt:new Date().toISOString(),sourceType:'Manually collected source',media:mediaUrl?[{type:mediaType,url:mediaUrl,caption:'Post media · manually collected'}]:[]};
    if(!record.handle||!record.copy){error.textContent='Add the publisher and your observation.';return}
    const existing=studySocialRecords(id,study);if(existing.some(p=>evidenceIdentity(p)===evidenceIdentity(record))){error.textContent='This post is already saved in this evidence set.';return}
    const state=loadLocalStudyEvidence(),entry=localStudyEvidence(id);state[id]={records:[...entry.records,record],previous:studyCoverageSnapshot(id,study)};
    try{localStorage.setItem(studyEvidenceStorageKey,JSON.stringify(state))}catch{error.textContent='This browser could not save the record. Check storage settings and try again.';return}
    dialog.close();renderStudyEvidence(id,study);showSystemToast('Post collected','Saved in this browser. Coverage counts and collection timestamps are updated.');
  });
  dialog.showModal();
}

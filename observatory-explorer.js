'use strict';
const obsBrands=[
  {
    "id": "budweiser",
    "name": "Budweiser",
    "vertical": "Food & beverage",
    "category": "Beer"
  },
  {
    "id": "dickies",
    "name": "Dickies",
    "vertical": "Fashion",
    "category": "Workwear"
  },
  {
    "id": "supreme",
    "name": "Supreme",
    "vertical": "Fashion",
    "category": "Streetwear"
  },
  {
    "id": "apresse",
    "name": "A.PRESSE",
    "vertical": "Fashion",
    "category": "Menswear"
  },
  {
    "id": "carolina-herrera",
    "name": "Carolina Herrera",
    "vertical": "Luxury",
    "category": "Fashion"
  },
  {
    "id": "taffin",
    "name": "TAFFIN",
    "vertical": "Luxury",
    "category": "Jewelry"
  },
  {
    "id": "paul-smith",
    "name": "Paul Smith",
    "vertical": "Fashion",
    "category": "Designer apparel"
  },
  {
    "id": "barbour",
    "name": "Barbour",
    "vertical": "Fashion",
    "category": "Outerwear"
  }
];
const obsCatalog=[
  {
    "id": "budweiser-dickies",
    "brands": [
      "budweiser",
      "dickies"
    ],
    "date": "2026-09-15",
    "format": "Product capsule",
    "summary": "Workwear, beer heritage, and a nomination contest.",
    "events": [
      {
        "date": "2026-09-15",
        "type": "launch",
        "label": "Drop 1 launch",
        "market": "United States"
      },
      {
        "date": "2026-09-21",
        "type": "milestone",
        "label": "Contest closes",
        "market": "United States"
      },
      {
        "month": "2026-11",
        "type": "launch",
        "label": "Drop 2 announced for November",
        "market": "Not specified"
      }
    ]
  },
  {
    "id": "supreme-apresse",
    "brands": [
      "supreme",
      "apresse"
    ],
    "date": "2026-09-10",
    "format": "Product capsule",
    "summary": "Japanese menswear craftsmanship meets streetwear distribution.",
    "events": [
      {
        "date": "2026-09-07",
        "type": "announcement",
        "label": "Announcement email",
        "market": "Global"
      },
      {
        "date": "2026-09-10",
        "type": "launch",
        "label": "Global release",
        "market": "Global"
      },
      {
        "date": "2026-09-12",
        "type": "regional",
        "label": "Asia release",
        "market": "Asia"
      }
    ]
  },
  {
    "id": "carolina-taffin",
    "brands": [
      "carolina-herrera",
      "taffin"
    ],
    "date": "2026-09-14",
    "format": "Runway collaboration",
    "summary": "High jewelry integrated into an anniversary runway collection.",
    "events": [
      {
        "date": "2026-09-14",
        "type": "launch",
        "label": "Spring 27 runway activation",
        "market": "New York"
      }
    ]
  },
  {
    "id": "paul-barbour",
    "brands": [
      "paul-smith",
      "barbour"
    ],
    "date": "2026-09-04",
    "format": "Product capsule + film",
    "summary": "A third collection built around a recurring campaign world.",
    "events": [
      {
        "date": "2026-09-04",
        "type": "launch",
        "label": "Global launch",
        "market": "Global"
      },
      {
        "date": "2026-09-08",
        "type": "announcement",
        "label": "Campaign film published",
        "market": "Global"
      },
      {
        "date": "2026-09-18",
        "type": "regional",
        "label": "Japan release",
        "market": "Japan"
      }
    ]
  }
];
const obsReviews={
  "budweiser-dickies": {
    "verdict": "The launch is documented. Audience impact is still unproven.",
    "perspective": "The nomination mechanic gives the partnership a reason to involve people beyond the product purchase. The small set of recovered replies shows participation existed, but it cannot establish how widely the idea traveled.",
    "signals": [
      "Three saved press articles document the release.",
      "Two contest-entry observations and one distributor post are saved as earned social."
    ],
    "limits": "No reliable post engagement totals, comment sample, incremental sales, or brand-lift study.",
    "next": "Collect official launch-post metrics and a timestamped comment sample; connect contest entries and sales to a consistent launch window."
  },
  "supreme-apresse": {
    "verdict": "Visible social attention; commercial performance remains unknown.",
    "perspective": "A.PRESSE gains a larger distribution stage while giving Supreme a distinct material story. The captured posts support an attention signal. They do not establish whether the collaboration won new customers or improved either brand’s reputation.",
    "signals": [
      "Three saved Instagram mirror snapshots report approximately 46,300 likes and 191 comments in total.",
      "Three saved press articles explain the collection and its price range."
    ],
    "limits": "Metrics come from a provisional mirror, are not unique people, and cover three saved posts rather than the entire launch. Comment text and sales are missing.",
    "next": "Confirm canonical post metrics, collect comment text, and compare traffic and new-customer orders with a pre-launch baseline."
  },
  "carolina-taffin": {
    "verdict": "Strong integration evidence; no isolated performance result.",
    "perspective": "TAFFIN participates in the visual language of the runway rather than appearing only as a sponsor name. That makes the creative fit persuasive. The available collection-wide attention cannot tell us what TAFFIN itself gained.",
    "signals": [
      "Runway imagery and editorial reporting document the jewelry’s role.",
      "One collection-wide mirror snapshot reports 15,827 likes and 123 comments; it is not TAFFIN-specific."
    ],
    "limits": "No verified TAFFIN-owned launch post, attributable comment sample, or partner-specific commercial outcome.",
    "next": "Collect references specifically naming TAFFIN and request partner-level traffic, inquiry, or sales evidence."
  },
  "paul-barbour": {
    "verdict": "Substantial recorded film viewing; customer outcomes unverified.",
    "perspective": "The repeated characters and Highland setting give this partnership a recognizable identity across seasons. The film’s view count supports distribution, while the story and collection establish creative coherence. Neither demonstrates incremental demand on its own.",
    "signals": [
      "The official campaign film recorded 1,351,574 views at the 23 September snapshot.",
      "Three original Instagram Reel links and three press articles are saved."
    ],
    "limits": "No third-party comment sample, normalized cross-post engagement, sales attribution, or brand-lift measurement.",
    "next": "Collect daily comment timestamps and official engagement snapshots; pair campaign traffic with product and customer data."
  }
};
let obsState;
function obsFiltered(){
 const query=obsState.q.trim().toLowerCase();
 return obsCatalog.filter(c=>{const bs=c.brands.map(id=>obsBrands.find(b=>b.id===id));return (!obsState.brand||c.brands.includes(obsState.brand))&&(!obsState.vertical||bs.some(b=>b.vertical===obsState.vertical))&&(!query||[observatoryStudies[c.id]?.title,c.summary,...bs.map(b=>b.name)].join(' ').toLowerCase().includes(query));}).sort((a,b)=>b.date.localeCompare(a.date));
}

function obsReadUrl(){
 const q=new URLSearchParams(location.search);
 obsState={view:['collaborations','brands','calendar'].includes(q.get('view'))?q.get('view'):'collaborations',q:q.get('q')||'',brand:obsBrands.some(b=>b.id===q.get('brand'))?q.get('brand'):'',vertical:obsBrands.some(b=>b.vertical===q.get('vertical'))?q.get('vertical'):'',month:/^\d{4}-(0[1-9]|1[0-2])$/.test(q.get('month')||'')?q.get('month'):'2026-09',event:['launch','announcement','regional','all'].includes(q.get('event'))?q.get('event'):'launch',page:Math.max(1,parseInt(q.get('page')||'1',10)||1)};
}

function obsWriteUrl(){
 const q=new URLSearchParams();Object.entries(obsState).forEach(([key,value])=>{if(value&&!(key==='view'&&value==='collaborations')&&!(key==='page'&&value===1))q.set(key,value)});
 writeAppRoute('/observatory'+(q.size?'?'+q.toString():''),'Observatory');
}

function obsSet(values){
 Object.assign(obsState,values);if(!Object.hasOwn(values,'page'))obsState.page=1;obsWriteUrl();renderObservatoryExplorer();
}

function obsBrandLink(id){
 const b=obsBrands.find(x=>x.id===id);return `<button type="button" class="obs-brand-link" data-obs-brand="${id}">${evidenceEscape(b?.name||id)}</button>`;
}

function obsCollabCard(c){
 const s=observatoryStudies[c.id];const verticals=[...new Set(c.brands.map(id=>obsBrands.find(b=>b.id===id).vertical))];
 return `<article class="obs-record-card"><div class="obs-record-top"><span>${evidenceEscape(verticals.join(' × '))}</span><time datetime="${c.date}">${new Date(c.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}</time></div><h3><a href="/observatory/studies/${c.id}" data-obs-study="${c.id}">${evidenceEscape(s.title)}</a></h3><p>${evidenceEscape(c.summary)}</p><div class="obs-brand-links">${c.brands.map(obsBrandLink).join('<span>×</span>')}</div><footer><span>${evidenceEscape(c.format)}</span><a href="/observatory/studies/${c.id}" data-obs-study="${c.id}">Open study ↗</a></footer></article>`;
}

function obsBrandCards(records){
 const matched=new Set(records.flatMap(c=>c.brands));const brands=obsBrands.filter(b=>matched.has(b.id)&&(!obsState.brand||b.id===obsState.brand)&&(!obsState.vertical||b.vertical===obsState.vertical));
 return brands.length?`<div class="obs-record-grid">${brands.map(b=>{const all=obsCatalog.filter(c=>c.brands.includes(b.id)),visible=records.filter(c=>c.brands.includes(b.id)),partners=[...new Set(all.flatMap(c=>c.brands).filter(id=>id!==b.id))];return `<article class="obs-record-card"><div class="obs-record-top"><span>${evidenceEscape(b.vertical)}</span><span>${evidenceEscape(b.category)}</span></div><h3>${evidenceEscape(b.name)}</h3><div class="obs-brand-kpis"><div><strong>${all.length}</strong><span>collaboration${all.length===1?'':'s'} in database</span></div><div><strong>${partners.length}</strong><span>partner${partners.length===1?'':'s'}</span></div></div><p>${visible.length} collaboration${visible.length===1?' matches':'s match'} your current filters.</p><div class="obs-brand-links">${partners.map(obsBrandLink).join('')}</div><footer><span>One brand record · linked studies</span><button type="button" data-obs-profile="${b.id}">View brand history →</button></footer></article>`}).join('')}</div>`:'<div class="obs-empty">No brands match these filters.</div>';
}

function obsEvents(records){
 return records.flatMap(c=>c.events.filter(e=>obsState.event==='all'||e.type===obsState.event).map(e=>({...e,studyId:c.id,title:observatoryStudies[c.id].title})));
}

function obsCalendar(records){
 const events=obsEvents(records),year=Number(obsState.month.slice(0,4)),month=Number(obsState.month.slice(5))-1,first=new Date(Date.UTC(year,month,1)),offset=(first.getUTCDay()+6)%7,days=new Date(Date.UTC(year,month+1,0)).getUTCDate();
 const exact=events.filter(e=>e.date?.startsWith(obsState.month)),uncertain=events.filter(e=>e.month===obsState.month);
 const yearMonths=Array.from({length:12},(_,i)=>`${year}-${String(i+1).padStart(2,'0')}`);
 const counts=yearMonths.map(m=>new Set(events.filter(e=>(e.date||e.month||'').startsWith(m)).map(e=>e.studyId)).size);
 const peak=Math.max(0,...counts),peaks=yearMonths.filter((m,i)=>counts[i]===peak&&peak>0);
 const monthName=first.toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'});
 return `<section class="obs-calendar"><div class="obs-calendar-toolbar"><div><h3>${monthName}</h3><p>${new Set([...exact,...uncertain].map(e=>e.studyId)).size} collaborations · ${exact.length} dated milestones · ${uncertain.length} without an exact day</p></div><div class="obs-calendar-controls"><button type="button" data-obs-month="-1" aria-label="Previous month">←</button><label>Month<input aria-label="Calendar month" type="month" id="obsMonth" value="${obsState.month}"></label><button type="button" data-obs-month="1" aria-label="Next month">→</button><label>Show<select id="obsEvent"><option value="launch" ${obsState.event==='launch'?'selected':''}>Launches / activations</option><option value="announcement" ${obsState.event==='announcement'?'selected':''}>Announcements</option><option value="regional" ${obsState.event==='regional'?'selected':''}>Regional releases</option><option value="all" ${obsState.event==='all'?'selected':''}>All milestones</option></select></label></div></div><div class="obs-calendar-scroll"><div class="obs-calendar-grid" role="group" aria-label="${monthName} collaboration calendar">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="obs-weekday">${d}</div>`).join('')}${Array.from({length:offset},()=>'<div class="obs-calendar-day outside" aria-hidden="true"></div>').join('')}${Array.from({length:days},(_,i)=>{const date=obsState.month+'-'+String(i+1).padStart(2,'0'),items=exact.filter(e=>e.date===date);return `<div class="obs-calendar-day"><time datetime="${date}">${i+1}</time>${items.map(e=>`<a class="obs-calendar-event ${e.type}" href="/observatory/studies/${e.studyId}" data-obs-study="${e.studyId}"><strong>${evidenceEscape(e.title.split(' — ')[0])}</strong><span>${evidenceEscape(e.label)} · ${evidenceEscape(e.market)}</span></a>`).join('')}</div>`}).join('')}</div></div>${uncertain.length?`<div class="obs-date-unknown"><strong>Scheduled in ${monthName} · exact date not recorded</strong>${uncertain.map(e=>`<a href="/observatory/studies/${e.studyId}" data-obs-study="${e.studyId}">${evidenceEscape(e.title)} — ${evidenceEscape(e.label)}</a>`).join('')}</div>`:''}${!exact.length&&!uncertain.length?'<p class="obs-empty">No matching events are saved for this month. This does not establish that none occurred in the market.</p>':''}<details class="obs-calendar-agenda"><summary>View dated events as a list</summary>${exact.length?exact.sort((a,b)=>a.date.localeCompare(b.date)).map(e=>`<p><time>${e.date}</time> · <a href="/observatory/studies/${e.studyId}" data-obs-study="${e.studyId}">${evidenceEscape(e.title)}</a> · ${evidenceEscape(e.label)}</p>`).join(''):'<p>No dated events match this month.</p>'}</details><div class="obs-seasonality"><h4>When are launches clustering?</h4><p>${peak?`Most in this ${year} sample: ${peaks.map(m=>new Date(m+'-01').toLocaleDateString('en-GB',{month:'short',timeZone:'UTC'})).join(', ')} · ${peak} unique collaboration${peak===1?'':'s'}.`:'No dated events in this filtered year.'} Each collaboration is counted once per month for the selected event type.</p><div class="obs-month-bars" role="group" aria-label="Unique collaborations per month">${yearMonths.map((m,i)=>`<button type="button" data-obs-jump="${m}" aria-label="${m}: ${counts[i]} collaborations" class="${m===obsState.month?'active':''}"><strong>${counts[i]}</strong><span class="obs-month-track"><i style="height:${peak?counts[i]/peak*70:0}px"></i></span><span>${new Date(m+'-01').toLocaleDateString('en-GB',{month:'short',timeZone:'UTC'})}</span></button>`).join('')}</div><p class="obs-limit">The current database contains four September launch studies. This view shows database coverage; it is too small and concentrated to establish market seasonality. Month-only dates contribute to the monthly count but are never placed on an invented day.</p></div></section>`;
}

function renderObservatoryExplorer(){
 const target=document.getElementById('observatoryExplorer');if(!target)return;
 const records=obsFiltered(),brandIds=new Set(records.flatMap(c=>c.brands)),verticals=[...new Set(obsBrands.map(b=>b.vertical))].sort();
 const selected=obsBrands.find(b=>b.id===obsState.brand);
 const pages=Math.max(1,Math.ceil(records.length/12));obsState.page=Math.min(obsState.page,pages);
 target.innerHTML=`<div class="obs-explorer-head"><div class="section-label">Collaboration Observatory</div><h2>${selected?evidenceEscape(selected.name)+' partnership history':'Explore brands and their collaborations'}</h2><p>Follow a brand across partnerships, compare collaborations, or see when launches happen.</p></div><nav class="obs-explorer-tabs" aria-label="Browse Observatory">${[['collaborations','Collaborations'],['brands','Brands'],['calendar','Calendar']].map(([key,label])=>`<button type="button" data-obs-view="${key}" aria-pressed="${obsState.view===key}" class="${obsState.view===key?'active':''}">${label}</button>`).join('')}</nav><form id="obsFilters" class="obs-explorer-filters"><label>Search brands or collaborations<input name="q" value="${evidenceEscape(obsState.q)}" placeholder="Brand, partner, or collaboration…"></label><label>Brand<select name="brand"><option value="">All brands</option>${obsBrands.map(b=>`<option value="${b.id}" ${obsState.brand===b.id?'selected':''}>${evidenceEscape(b.name)}</option>`).join('')}</select></label><label>Vertical<select name="vertical"><option value="">All verticals</option>${verticals.map(v=>`<option ${v===obsState.vertical?'selected':''}>${evidenceEscape(v)}</option>`).join('')}</select></label><button class="button" type="submit">Apply filters</button><button class="button secondary" type="button" id="obsReset">Clear</button></form><div class="obs-results-summary" role="status"><strong>${records.length} collaboration${records.length===1?'':'s'}</strong><span>${brandIds.size} participating brands</span><span>${obsState.brand||obsState.vertical||obsState.q?'Filtered database':'Entire database'} · one study per collaboration</span></div>${selected?`<div class="obs-brand-context"><strong>${evidenceEscape(selected.vertical)} · ${evidenceEscape(selected.category)}</strong><p>All saved collaborations involving ${evidenceEscape(selected.name)} appear here. The same studies are also linked from each partner’s brand page.</p></div>`:''}${obsState.view==='calendar'?obsCalendar(records):obsState.view==='brands'?obsBrandCards(records):records.length?`<div class="obs-record-grid">${records.slice((obsState.page-1)*12,obsState.page*12).map(obsCollabCard).join('')}</div><div class="obs-pagination"><button type="button" data-obs-page="-1" ${obsState.page===1?'disabled':''}>Previous</button><span>Page ${obsState.page} of ${pages}</span><button type="button" data-obs-page="1" ${obsState.page>=pages?'disabled':''}>Next</button></div>`:'<div class="obs-empty"><h3>No collaborations match these filters.</h3><p>Clear a filter or try another brand name.</p></div>'}`;
 target.querySelector('#obsFilters').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);obsSet({q:f.get('q').trim(),brand:f.get('brand'),vertical:f.get('vertical')})});
 target.querySelector('#obsReset').onclick=()=>obsSet({q:'',brand:'',vertical:''});
 target.querySelectorAll('[data-obs-view]').forEach(b=>b.onclick=()=>obsSet({view:b.dataset.obsView}));
 target.querySelectorAll('[data-obs-brand],[data-obs-profile]').forEach(b=>b.onclick=()=>obsSet({brand:b.dataset.obsBrand||b.dataset.obsProfile,q:'',vertical:'',view:'collaborations'}));
 target.querySelectorAll('[data-obs-study]').forEach(a=>a.onclick=e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();openStudy(a.dataset.obsStudy)});
 target.querySelectorAll('[data-obs-month]').forEach(b=>b.onclick=()=>{const d=new Date(obsState.month+'-01T00:00:00Z');d.setUTCMonth(d.getUTCMonth()+Number(b.dataset.obsMonth));obsSet({month:d.toISOString().slice(0,7)})});
 target.querySelectorAll('[data-obs-jump]').forEach(b=>b.onclick=()=>obsSet({month:b.dataset.obsJump}));
 target.querySelectorAll('[data-obs-page]').forEach(b=>b.onclick=()=>obsSet({page:obsState.page+Number(b.dataset.obsPage)}));
 if(target.querySelector('#obsMonth'))target.querySelector('#obsMonth').onchange=e=>{if(/^\d{4}-(0[1-9]|1[0-2])$/.test(e.target.value))obsSet({month:e.target.value})};
 if(target.querySelector('#obsEvent'))target.querySelector('#obsEvent').onchange=e=>obsSet({event:e.target.value});
}
function enrichStudyPost(studyId,post){
 const metricMap={
 'supreme-apresse:owned:0':{likes:15800,comments:118,approximate:['likes'],quality:'Provisional Instagram mirror'},
 'supreme-apresse:owned:1':{likes:19400,comments:49,approximate:['likes'],quality:'Provisional Instagram mirror'},
 'supreme-apresse:owned:2':{likes:11100,comments:24,approximate:['likes'],quality:'Provisional Instagram mirror'},
 'carolina-taffin:owned:0':{quality:'Withheld: mirror snapshots conflicted'},
 'carolina-taffin:owned:1':{likes:15827,comments:123,quality:'Collection-wide mirror snapshot; not TAFFIN-specific'},
 'paul-barbour:owned:0':{views:1351574,quality:'Official YouTube view snapshot'}
 };
 const raw=loadLocalStudyEvidence()[studyId]?.annotations?.[evidenceIdentity(post)];
 const comments=Array.isArray(raw)?raw.filter(c=>c&&typeof c.text==='string'&&typeof c.author==='string'&&evidenceDate(c.publishedAt)&&evidenceDate(c.collectedAt)&&evidenceUrl(c.sourceUrl)).map(c=>({...c,likes:Number.isFinite(c.likes)&&c.likes>=0?c.likes:null,sentiment:['positive','neutral','negative','mixed'].includes(c.sentiment)?c.sentiment:'unclassified',affiliation:c.affiliation==='brand'?'brand':'third-party'})):[];
 return {...post,metrics:metricMap[post.recordId]||{quality:'No metric snapshot collected'},comments};
}

function postCommentChart(comments){
 if(!comments.length)return '<div class="post-comment-empty">No timestamped comments collected. Daily comment activity is unavailable.</div>';
 const counts={};comments.forEach(c=>{const date=c.publishedAt.slice(0,10);counts[date]=(counts[date]||0)+1});const dates=Object.keys(counts).sort(),shown=dates.slice(-14),max=Math.max(...shown.map(d=>counts[d]));
 const first=Date.parse(shown[0]),last=Date.parse(shown.at(-1)),span=Math.max(86400000,last-first),step=260/Math.max(2,Math.round(span/86400000)+1),w=Math.min(20,step*.7);
 return `<svg class="comment-spark" viewBox="0 0 320 104" role="img" aria-label="Collected comments by publication date: ${evidenceEscape(shown.map(d=>`${d}: ${counts[d]}`).join('; '))}"><line x1="22" y1="72" x2="298" y2="72" stroke="#dce5dc"/>${shown.map(d=>{const x=shown.length===1?150:28+(Date.parse(d)-first)/span*260,h=counts[d]/max*44;return `<rect x="${x-w/2}" y="${72-h}" width="${w}" height="${h}" rx="2" fill="#3f7050"/><text x="${x}" y="${65-h}" text-anchor="middle" font-size="9" fill="#365841">${counts[d]}</text>`}).join('')}<text x="22" y="93" font-size="9" fill="#617365">${shown[0]}</text><text x="298" y="93" font-size="9" text-anchor="end" fill="#617365">${shown.at(-1)}</text></svg><p class="post-insight-note">Daily counts of saved comments, by publication date (UTC). Gaps are unobserved days, not confirmed zero activity. ${shown.length<dates.length?'Chart shows the latest 14 recorded dates.':''}</p><details class="comment-date-table"><summary>See each recorded day</summary><table><thead><tr><th>Date (UTC)</th><th>Saved comments</th></tr></thead><tbody>${dates.map(d=>`<tr><td>${d}</td><td>${counts[d]}</td></tr>`).join('')}</tbody></table></details>`;
}

function postInsightsMarkup(post){
 const m=post.metrics||{},comments=post.comments||[],third=comments.filter(c=>c.affiliation==='third-party'),ranked=third.filter(c=>c.likes!==null).sort((a,b)=>b.likes-a.likes||a.publishedAt.localeCompare(b.publishedAt)),top=ranked[0],id=post.recordId||post.localId;
 const topMarkup=top?`<blockquote>${evidenceEscape(top.text)}</blockquote><p class="post-insight-note">${evidenceEscape(top.author)} · ${top.likes.toLocaleString()} likes · ${evidenceEscape(top.publishedAt)}<br>Most liked among ${ranked.length} saved third-party comments with like counts. <a href="${evidenceEscape(evidenceUrl(top.sourceUrl))}" target="_blank" rel="noopener noreferrer">Open comment/source ↗</a></p>`:third.length?'<p class="post-comment-empty">Comments are saved, but no like counts were collected. A top comment cannot be ranked yet.</p>':'<p class="post-comment-empty">A top third-party comment was not collected.</p>';
 return `<section class="post-insights" aria-label="Post statistics and comments"><h5>Post statistics</h5><dl class="post-stat-grid">${[['likes','Likes'],['comments','Comments'],['shares','Shares'],['views','Views'],['saves','Saves']].map(([key,label])=>`<div><dt>${label}</dt><dd>${Number.isFinite(m[key])?(m.approximate?.includes(key)?'≈':'')+m[key].toLocaleString():'—'}</dd></div>`).join('')}</dl><p class="post-insight-note">${evidenceEscape(m.quality||'No metric snapshot collected')} · ${Object.values(m).some(v=>typeof v==='number')?'captured '+evidenceTime(post.collectedAt):'unknown values are not zero'}. Counts describe this post only.</p><div class="post-comment-heading"><h5>Top third-party comment</h5><span>${third.length} saved</span></div>${topMarkup}<h5>When comments arrived</h5>${postCommentChart(comments)}<button type="button" class="button secondary" data-add-post-comment="${evidenceEscape(id)}">Add a collected comment</button><p class="post-insight-note">Comment text, timestamps, and sentiment require a collected sample. A post’s total comment count is not a comment dataset.</p></section>`;
}

function thirdPartySentiment(posts){
 const seen=new Set();const comments=posts.flatMap(p=>p.comments||[]).filter(c=>{if(c.affiliation!=='third-party')return false;const key=[c.sourceUrl,c.author,c.text,c.publishedAt].join('|');if(seen.has(key))return false;seen.add(key);return true});
 const labels={positive:0,neutral:0,negative:0,mixed:0};comments.forEach(c=>{if(Object.hasOwn(labels,c.sentiment))labels[c.sentiment]++});const analyzed=Object.values(labels).reduce((a,b)=>a+b,0);
 return {comments,labels,analyzed,unclassified:comments.length-analyzed};
}

function renderStudyPerformance(studyId,study,posts){
 const review=obsReviews[studyId],target=document.getElementById('studyPerformance');if(!target||!review)return;
 const sentiment=thirdPartySentiment(posts);
 target.innerHTML=`<section class="study-performance"><div class="section-label">Performance review</div><h3>${evidenceEscape(review.verdict)}</h3><p class="performance-perspective">${evidenceEscape(review.perspective)}</p><div class="performance-evidence-grid"><div><h4>Observed signals</h4><ul>${review.signals.map(s=>`<li>${evidenceEscape(s)}</li>`).join('')}</ul></div><div><h4>What remains unknown</h4><p>${evidenceEscape(review.limits)}</p></div></div><div class="performance-next"><strong>Next measurement step</strong><p>${evidenceEscape(review.next)}</p></div><p class="post-insight-note">Editorial assessment based on the study’s public source pack. Historical snapshots retain their original capture dates; this is not a causal ROI estimate.</p><div class="study-sentiment"><div class="post-comment-heading"><div><div class="section-label">Third-party comment sentiment</div><h4>${sentiment.analyzed?'Sentiment in the collected sample':'Sentiment is not yet measurable'}</h4></div><span>${sentiment.analyzed} analyzed / ${sentiment.comments.length} saved</span></div>${sentiment.analyzed?`<div class="sentiment-stack" role="img" aria-label="${Object.entries(sentiment.labels).map(([k,n])=>`${k}: ${n}`).join(', ')}">${Object.entries(sentiment.labels).filter(([,n])=>n>0).map(([key,n])=>`<span class="${key}" style="width:${n/sentiment.analyzed*100}%" title="${key}: ${n}"></span>`).join('')}</div><div class="sentiment-legend">${Object.entries(sentiment.labels).map(([key,n])=>`<span><i class="${key}"></i>${key} <strong>${n} · ${Math.round(n/sentiment.analyzed*100)}%</strong></span>`).join('')}</div>`:'<p>No classified third-party comments have been collected. Earned social posts and aggregate comment counts are not substitutes for comment text.</p>'}<p class="post-insight-note">${sentiment.unclassified} unclassified comments excluded from percentages. Brand-authored comments are excluded. Labels are manually reviewed; this sample does not represent all audiences.</p>${collectedStamp(sentiment.comments,'Comments · last data collected')}</div></section>`;
 document.querySelectorAll('[data-add-post-comment]').forEach(button=>button.onclick=()=>{const post=posts.find(p=>(p.recordId||p.localId)===button.dataset.addPostComment);if(post)openPostCommentCollection(studyId,post)});
}

function openPostCommentCollection(studyId,post){
 document.getElementById('postCommentDialog')?.remove();
 const dialog=document.createElement('dialog');dialog.id='postCommentDialog';dialog.className='collection-dialog';dialog.setAttribute('aria-labelledby','postCommentTitle');
 dialog.innerHTML=`<header><div><div class="section-label">Comment evidence</div><h2 id="postCommentTitle">Add a collected comment</h2></div><button type="button" class="close-collection" aria-label="Close comment dialog">×</button></header><p>${evidenceEscape(post.handle)} · ${evidenceEscape(post.title||post.network)}</p><p>Save the comment you observed, its publication date, and any visible like count. This record stays in this browser and updates its comment chart and sentiment sample.</p><a href="${evidenceEscape(evidenceUrl(post.sourceUrl))}" target="_blank" rel="noopener noreferrer">Open original post ↗</a><form id="postCommentForm"><label for="pcAuthor">Comment author *</label><input id="pcAuthor" name="author" required maxlength="160"><label for="pcText">Comment text *</label><textarea id="pcText" name="text" required maxlength="3000"></textarea><label for="pcSource">Comment or source URL *</label><input type="url" id="pcSource" name="sourceUrl" required value="${evidenceEscape(evidenceUrl(post.sourceUrl))}"><div class="collection-form-grid"><div><label for="pcDate">Date comment was published *</label><input type="date" id="pcDate" name="publishedAt" required max="${new Date().toISOString().slice(0,10)}"></div><div><label for="pcLikes">Visible likes, if known</label><input type="number" id="pcLikes" name="likes" min="0" step="1" placeholder="Unknown"></div><div><label for="pcAffiliation">Author relationship</label><select id="pcAffiliation" name="affiliation"><option value="third-party">Third party</option><option value="brand">Brand / brand representative</option></select></div><div><label for="pcSentiment">Reviewed sentiment</label><select id="pcSentiment" name="sentiment"><option value="unclassified">Not classified</option><option value="positive">Positive</option><option value="neutral">Neutral</option><option value="negative">Negative</option><option value="mixed">Mixed</option></select></div></div><div id="postCommentError" class="collection-error" role="alert"></div><button class="button collection-submit" type="submit">Save comment</button></form>`;
 document.body.append(dialog);dialog.querySelector('.close-collection').onclick=()=>dialog.close();dialog.addEventListener('close',()=>dialog.remove());
 dialog.querySelector('form').onsubmit=e=>{
  e.preventDefault();const f=new FormData(e.target),error=dialog.querySelector('#postCommentError'),url=evidenceUrl(f.get('sourceUrl')),date=evidenceDate(f.get('publishedAt')),text=f.get('text').trim(),author=f.get('author').trim(),likes=f.get('likes')===''?null:Number(f.get('likes'));
  if(!url||!date||!text||!author||(likes!==null&&(!Number.isInteger(likes)||likes<0))){error.textContent='Provide a valid HTTPS source, publication date, author, text, and a nonnegative whole like count if known.';return}
  if(date>new Date().toISOString().slice(0,10)){error.textContent='A collected comment cannot have a future publication date.';return}
  const state=loadLocalStudyEvidence(),entry=state[studyId]||{},key=evidenceIdentity(post),existing=Array.isArray(entry.annotations?.[key])?entry.annotations[key]:[];
  if(existing.some(c=>c.author===author&&c.text===text&&c.publishedAt===date)){error.textContent='This comment is already saved for this post.';return}
  const comment={id:crypto.randomUUID(),author,text,sourceUrl:url,publishedAt:date,collectedAt:new Date().toISOString(),likes,affiliation:f.get('affiliation'),sentiment:f.get('sentiment')};
  state[studyId]={...entry,annotations:{...entry.annotations,[key]:[...existing,comment]}};
  try{localStorage.setItem(studyEvidenceStorageKey,JSON.stringify(state))}catch{error.textContent='This browser could not save the comment. No data was changed.';return}
  dialog.close();renderStudyEvidence(studyId,observatoryStudies[studyId]);showSystemToast('Comment saved','The comment timeline and third-party sentiment sample are updated in this browser.');
 };
 dialog.showModal();
}
obsReadUrl();

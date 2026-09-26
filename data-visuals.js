/* Shared, evidence-aware charts for The Pull's research and reporting screens. */
(() => {
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const finite=v=>v!==''&&v!==null&&v!==undefined&&Number.isFinite(Number(v));
const fmt=(v,u='')=>!finite(v)?'Not measured':Number(v).toLocaleString(undefined,{maximumFractionDigits:2})+(u==='%'?'%':u==='USD'?' USD':u==='/100'?' / 100':'');
function figure(c){
 const rows=c.labels.map((label,i)=>`<tr><th scope="row">${esc(label)}</th>${c.series.map(s=>`<td>${esc(fmt(s.values[i],c.unit))}</td>`).join('')}</tr>`).join('');
 return `<figure class="pull-chart"><figcaption><strong>${esc(c.title)}</strong><span>${esc(c.note||'')}</span></figcaption><div class="pull-chart-legend">${c.series.map((s,i)=>`<span class="series-${i}">${esc(s.name)}</span>`).join('')}</div><canvas tabindex="0" role="img" aria-label="${esc(c.title+'. '+(c.note||'')+' Use arrow keys to inspect values; exact values are also in the data table.')}" data-pull-chart="${esc(JSON.stringify(c))}"></canvas><output class="pull-chart-readout" aria-live="polite">Hover or use arrow keys to inspect values.</output><details><summary>View chart data</summary><div class="pull-chart-table"><table><thead><tr><th scope="col">${c.type==='compare'?'Measure':'Period'}</th>${c.series.map(s=>`<th scope="col">${esc(s.name)}${c.unit?' ('+esc(c.unit)+')':''}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div></details></figure>`;
}
function compare(title,unit,before,after,note='Same metric and scope · baseline vs reporting window'){
 if(!finite(before)||!finite(after))return `<div class="pull-chart-empty"><strong>${esc(title)}</strong><p>${finite(after)?'Result recorded. Add a comparable baseline to see change.':'Add a result and comparable baseline to see change.'}</p></div>`;
 return figure({type:'compare',title,unit,note,labels:[title],series:[{name:'Baseline',values:[Number(before)]},{name:'Result',values:[Number(after)]}],fixedMax:['%','/100'].includes(unit)?100:null});
}
function series(raw,start,end){
 if(!String(raw||'').trim())return {points:[],error:''};
 const points=[];
 for(const line of raw.trim().split('\n')){const parts=line.trim().split(',').map(s=>s.trim());const [date,value]=parts;
 if(parts.length!==2||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!finite(value)||!Number.isFinite(Date.parse(date))||new Date(date+'T00:00:00Z').toISOString().slice(0,10)!==date)return {points:[],error:'Use one valid YYYY-MM-DD, value per line.'};
 if(points.some(p=>p.date===date))return {points:[],error:'Use only one observation per date.'};
 points.push({date,value:Number(value)});}
 return {points:points.filter(p=>(!start||p.date>=start)&&(!end||p.date<=end)).sort((a,b)=>a.date.localeCompare(b.date)),error:''};
}
window.PullCharts={figure,compare,series,fmt,esc};
const tracked=new Set();
function draw(canvas){
 const w=canvas.getBoundingClientRect().width;if(w<10)return;
 const c=JSON.parse(canvas.dataset.pullChart),h=c.type==='compare'?105:184,ratio=window.devicePixelRatio||1;
 canvas.width=w*ratio;canvas.height=h*ratio;const ctx=canvas.getContext('2d');ctx.scale(ratio,ratio);
 const css=getComputedStyle(canvas),ink=css.getPropertyValue('--chart-ink').trim()||'#255d48',muted=css.getPropertyValue('--muted').trim()||'#66707a',grid=css.getPropertyValue('--line').trim()||'#dfe4e8',surface=css.getPropertyValue('--surface').trim()||'#fff';
 const values=c.series.flatMap(s=>s.values).filter(finite).map(Number);if(!values.length)return;
 const min=Math.min(0,...values),max=c.fixedMax||Math.max(1,...values),span=max-min||1,left=46,right=w-24,top=18,bottom=h-32;
 ctx.font='11px sans-serif';ctx.fillStyle=muted;ctx.strokeStyle=grid;ctx.lineWidth=1;
 const x=i=>{if(c.type==='bar'&&!c.dates)return left+(i+.5)/c.labels.length*(right-left);if(c.dates&&c.labels.length>1){const a=Date.parse(c.labels[0]),b=Date.parse(c.labels.at(-1));return left+(Date.parse(c.labels[i])-a)/(b-a||1)*(right-left)}return left+i/Math.max(1,c.labels.length-1)*(right-left)};
 const y=v=>bottom-(Number(v)-min)/span*(bottom-top),cx=v=>left+(Number(v)-min)/span*(right-left);
 const dot=(px,py,open)=>{ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fillStyle=open?surface:ink;ctx.fill();ctx.strokeStyle=ink;ctx.stroke()};
 if(c.type==='compare'){
  const cy=37;ctx.beginPath();ctx.moveTo(left,cy);ctx.lineTo(right,cy);ctx.stroke();
  const a=cx(c.series[0].values[0]),b=cx(c.series[1].values[0]);ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(a,cy);ctx.lineTo(b,cy);ctx.stroke();dot(a,cy,true);dot(b,cy,false);
  ctx.fillStyle=muted;ctx.textAlign='left';ctx.fillText(fmt(min,c.unit),left,76);ctx.textAlign='right';ctx.fillText(fmt(max,c.unit),right,76);
 }else{
  for(let j=0;j<3;j++){const v=min+span*j/2,py=y(v);ctx.strokeStyle=grid;ctx.beginPath();ctx.moveTo(left,py);ctx.lineTo(right,py);ctx.stroke();ctx.fillStyle=muted;ctx.textAlign='right';ctx.fillText(fmt(v,c.unit),left-7,py+4)}
  c.series.forEach((s,si)=>{ctx.strokeStyle=ink;ctx.fillStyle=ink;ctx.lineWidth=si?1.5:2.5;ctx.setLineDash(si?[4,4]:[]);ctx.globalAlpha=si?.55:1;
   if(c.type==='bar'){const bw=Math.min(14,(right-left)/Math.max(c.labels.length,2)*.4);s.values.forEach((v,i)=>{if(finite(v))ctx.fillRect(x(i)-bw/2,Math.min(y(v),y(0)),bw,Math.max(1,Math.abs(y(v)-y(0))))})}
   else{ctx.beginPath();let active=false;s.values.forEach((v,i)=>{if(!finite(v)){active=false;return}if(!active)ctx.moveTo(x(i),y(v));else ctx.lineTo(x(i),y(v));active=true});ctx.stroke();ctx.setLineDash([]);s.values.forEach((v,i)=>{if(finite(v))dot(x(i),y(v),!!si)})}
  });ctx.globalAlpha=1;ctx.setLineDash([]);ctx.fillStyle=muted;ctx.textAlign='left';ctx.fillText(c.labels[0]||'',left,h-10);ctx.textAlign='right';ctx.fillText(c.labels.at(-1)||'',right,h-10);
 }
 const out=canvas.parentElement.querySelector('output');let selected=0;
 const inspect=i=>{selected=Math.max(0,Math.min(c.labels.length-1,i));out.textContent=c.labels[selected]+': '+c.series.map(s=>s.name+' '+fmt(s.values[selected],c.unit)).join(' · ')};
 canvas.onpointermove=e=>{const px=e.clientX-canvas.getBoundingClientRect().left;let nearest=0;c.labels.forEach((_,i)=>{if(Math.abs(x(i)-px)<Math.abs(x(nearest)-px))nearest=i});inspect(nearest)};
 canvas.onfocus=()=>inspect(selected);canvas.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();inspect(e.key==='Home'?0:e.key==='End'?c.labels.length-1:selected+(e.key==='ArrowRight'?1:-1))}};
 if(c.type==='compare')inspect(0);
}
const resize=new ResizeObserver(entries=>entries.forEach(e=>draw(e.target)));
function scan(){for(const c of tracked){if(!c.isConnected){resize.unobserve(c);tracked.delete(c)}}document.querySelectorAll('canvas[data-pull-chart]').forEach(c=>{if(!tracked.has(c)){tracked.add(c);resize.observe(c);draw(c)}})}
let queued=false;new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;scan()})}}).observe(document.documentElement,{childList:true,subtree:true});
new MutationObserver(()=>document.querySelectorAll('canvas[data-pull-chart]').forEach(draw)).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
document.addEventListener('DOMContentLoaded',scan);
})();

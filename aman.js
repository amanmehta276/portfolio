const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement;
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
let mode='eee';
const RESUMES={
  eee:'Aman Mehta Resume.pdf',
  cse:'Aman_Mehta_Resume_CSE.pdf'
};

/* ---------- data ---------- */
const PRJ=[
{m:'e',t:'Pure Sine Wave Inverter',k:'Power electronics project',s:'Transformerless inverter on STM32 with mains THD sensing.',l:'Designing a boost converter, unipolar SPWM H-bridge and LC filter. Senses mains THD for auto charge/battery switchover, and protects against overcurrent, overvoltage, thermal and short-circuit faults.',g:['STM32','Embedded C','SPWM','Power electronics']},
{m:'e',t:'PV-STATCOM in Simulink',k:'Power quality analysis',s:'Grid current THD cut from 26.45% to 1.34%.',l:'Single-phase grid-integrated solar PV-STATCOM: VSI with hysteresis current control and day and night modes. Unity power factor and IEEE-519 compliance. Try it yourself with the slider at the top.',g:['MATLAB','Simulink','IEEE-519']},
{m:'ec',t:'CSPDCL Substation Dashboard',k:'Client work, Nawapara Rajim 33/11 kV',s:'Substation management website with a zoomable single-line diagram.',l:'Fully responsive frontend with image fallback handling and a pinch-zoom single-line diagram (SLD) for the 33/11 kV substation.',g:['HTML','CSS','JavaScript','SLD'],u:'https://cspdcl.netlify.app/'},
{m:'ec',t:'VyomsTech PCB Designer',k:'Browser-based PCB tool',s:'Design, simulate and export PCBs without leaving the browser.',l:'Built on the tscircuit engine with live PCB, schematic and 3D preview, SPICE-based simulation and one-click Gerber export. Includes Trace, an in-house AI assistant that generates a full circuit from plain language, plus an audio filter tester using live Web Audio output and downloadable waveforms.',g:['tscircuit','SPICE','Web Audio API','AI'],u:'https://electogram.netlify.app/'},
{m:'cp',t:'Sangam',k:'CGIT student and alumni network',s:'Full-stack networking platform for a whole college.',l:'OTP roll-number login, JWT auth, directory, feed, jobs board, chat and an admin panel.',g:['Flask','MongoDB','JWT'],u:'https://cgitsangam.netlify.app/'},
{m:'c',t:'GateHub',k:'Academic resources, web and mobile',s:'Subject-wise study material in one place.',l:'Students upload, manage and access study material through a Node.js REST API, shipped as both a web platform and a mobile app.',g:['Node.js','Supabase','MongoDB','REST']},
{m:'cp',t:'TrackMind',k:'AI study analysis platform',s:'Finds knowledge gaps in your notes.',l:'Evaluates notes, identifies gaps and gives personalised feedback, including image-based note recognition and study performance tracking.',g:['Python','FastAPI','AI'],u:'https://trackmindnotes.netlify.app/'},
{m:'cp',t:'Ghosh Global Services',k:'Client work',s:'Full tech stack managed end to end.',l:'Manage hosting, SEO and email infrastructure for the client, and built a PDF rebranding automation tool with PyMuPDF.',g:['PyMuPDF','Hosting','SEO'],u:'https://www.ghoshglobalservices.com/'},
{m:'c',t:'Project Alps',k:'Engineering resources hub',s:'Verified learning materials organized by engineering stream.',l:'A central hub for engineering resources, with subject hubs, an admin control panel and an offline vault for synced materials.',g:['Engineering resources','Study platform','Offline access'],u:'https://projectalps.netlify.app/'},
{m:'c',t:'Pikachu Odyssey',k:'Browser game',s:'A Pikachu game with type-based bonuses and hazards.',l:'A browser-based Pikachu game featuring bonus and instant-KO elements based on Pokémon types.',g:['JavaScript','Browser game','Pokémon'],u:'https://pikachu-odyssy.netlify.app/'},
{m:'c',t:'VyomWorld',k:'Mini-games hub',s:'Five playable games in one place.',l:'GuessMon, Rock-Paper-Scissors vs AI, Tic-Tac-Toe, Pikachu-Dash and VyomShots.',g:['JavaScript','Three.js','Games']}
];
const D={
eee:{
 lede:'Final-year Electrical and Electronics Engineering student building inverters on STM32, simulating power quality in Simulink, and getting grid current under IEEE-519.',
 roles:['inverters on STM32','power quality simulations','PV-STATCOM models','PCB designs'],
 pSub:'Hardware, simulation and field work. Tap a card to open it.',
 sSub:'The electrical side of the toolbox.',
 stats:[[1.34,2,'%','grid current THD after PV-STATCOM'],[33,0,'/11 kV','substation I trained at'],[2,0,'','CSPDCL training terms']],
 skills:[['Power electronics',['Boost converter','SPWM H-bridge','LC filter','Inverters']],['Embedded',['STM32','ESP32','Embedded C','C','C++']],['Simulation',['MATLAB','Simulink','SPICE']],['Power quality',['THD','IEEE-519','PV-STATCOM','Power factor']],['Design',['PCB Design','Gerber export','tscircuit']],['Field',['33/11 kV substation','Single-line diagrams','Power systems']]]},
cse:{
 lede:'Full-stack developer shipping React, Node.js, FastAPI and Python products: alumni networks, study platforms, AI tools and a browser-based PCB tool.',
 roles:['full-stack web apps','REST APIs','AI-powered tools','mobile and web platforms'],
 pSub:'Apps, platforms and tools I have shipped. Tap a card to open it.',
 sSub:'The software side of the toolbox.',
 stats:[[10,0,'+','projects built'],[200,0,'+','DSA problems solved'],[3,0,'','client and independent platforms']],
 skills:[['Languages',['Python','C','C++','JavaScript']],['Web and backend',['HTML','CSS','React.js','Node.js','Express.js','FastAPI','REST APIs']],['Databases',['MongoDB','SQL','Supabase']],['CS fundamentals',['DSA','Operating Systems','OOPs','Computer Networks']],['AI',['Note recognition','Circuit generation']],['Tools',['Git/GitHub','VS Code','Chrome DevTools']]]},
python:{
 lede:'Python developer building AI-powered study tools, Flask platforms, and PDF automation with PyMuPDF.',
 roles:['FastAPI study tools','Flask web platforms','PDF automation','AI-powered note analysis'],
 pSub:'Python-powered platforms and tools. Tap a card to open it.',
 sSub:'Specialties: AI-powered study analysis, image-based note recognition and PDF rebranding automation.',
 stats:[[3,0,'','Python projects'],[2,0,'','Python web frameworks'],[1,0,'','PDF automation tool']],
 skills:[['Specialties',['AI-powered note analysis','Knowledge-gap detection','Image-based note recognition','PDF rebranding automation']],['Python stack',['Python','Flask','FastAPI']],['Backend',['REST APIs','JWT authentication','MongoDB']],['Libraries and tools',['PyMuPDF','Git/GitHub','VS Code','SQL']]]
}
};

/* ---------- typed roles ---------- */
let tk=0;
function typeRoles(list){
  const my=++tk,el=$('#typed');let ri=0,ci=0,del=false;
  (function step(){
    if(my!==tk)return;const w=list[ri];
    if(still){el.textContent=w;return}
    ci+=del?-1:1;el.textContent=w.slice(0,ci);
    let d=del?30:65;
    if(!del&&ci===w.length){del=true;d=1300}else if(del&&ci===0){del=false;ri=(ri+1)%list.length;d=250}
    setTimeout(step,d);
  })();
}

/* ---------- counters ---------- */
function count(el){
  const to=+el.dataset.to,dec=+el.dataset.dec,suf=el.dataset.suf;
  if(still){el.textContent=to.toFixed(dec)+suf;return}
  const t0=performance.now();
  (function f(n){const k=Math.min((n-t0)/1200,1),e=1-Math.pow(1-k,3);el.textContent=(to*e).toFixed(dec)+suf;if(k<1)requestAnimationFrame(f)})(t0);
}
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){count(e.target);cio.unobserve(e.target)}}),{threshold:.6});

/* ---------- mode ---------- */
function setMode(m){
  mode=m;root.dataset.mode=m;
  if(m!=='python')try{localStorage.setItem('mode',m)}catch(e){}
  $$('[data-set]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.set===m));
  const M=D[m];
  const resume=RESUMES[m]||RESUMES.cse;
  ['#resumeLink','#resumeButton','#resumeContactLink'].forEach(selector=>{
    const link=$(selector);
    if(link)link.href=resume;
  });
  $('#lede').textContent=M.lede;$('#projSub').textContent=M.pSub;$('#skillSub').textContent=M.sSub;
  $('#scope').hidden=m!=='eee';$('#term').hidden=m!=='cse';
  typeRoles(M.roles);
  $('#stats').innerHTML=M.stats.map(s=>`<div><div class="num" data-to="${s[0]}" data-dec="${s[1]}" data-suf="${s[2]}">0</div><p>${s[3]}</p></div>`).join('');
  $$('#stats .num').forEach(n=>cio.observe(n));
  const key=m==='eee'?'e':m==='python'?'p':'c';
  $('#proj').innerHTML=PRJ.filter(p=>p.m.includes(key)).map((p,i)=>`<article class="card" style="--i:${i}"><button class="head" aria-expanded="false"><h3>${p.t}</h3><span class="kind">${p.k}</span><p>${p.s}</p><span class="plus" aria-hidden="true">+</span></button><div class="more"><div><p>${p.l}</p><div class="tags">${p.g.map(t=>`<span>${t}</span>`).join('')}</div>${p.u?`<a class="visit" href="${p.u}" target="_blank" rel="noopener noreferrer">Visit live project <span aria-hidden="true">↗</span></a>`:''}</div></div></article>`).join('');
  $('#skillsList').innerHTML=M.skills.map(([k,v],i)=>`<div style="--i:${i}"><dt>${k}</dt><dd>${v.map(x=>`<span>${x}</span>`).join('')}</dd></div>`).join('');
}
$$('[data-set]').forEach(b=>b.onclick=()=>setMode(b.dataset.set));
$('#proj').addEventListener('click',e=>{
  const h=e.target.closest('.head');if(!h)return;
  const c=h.parentElement,o=c.classList.toggle('open');h.setAttribute('aria-expanded',o);
});
$('#proj').addEventListener('mousemove',e=>{
  const c=e.target.closest('.card');if(!c)return;const r=c.getBoundingClientRect();
  c.style.setProperty('--cx',e.clientX-r.left+'px');c.style.setProperty('--cy',e.clientY-r.top+'px');
});
addEventListener('mousemove',e=>{root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px')});

/* ---------- oscilloscope (EEE) ---------- */
const cv=$('#wave'),cx=cv.getContext('2d'),thdEl=$('#thd'),slider=$('#dist');
let thd=26.45,target=26.45,phase=0;
function setTarget(v){target=v;if(still){thd=v}}
slider.oninput=()=>{thd=target=+slider.value};
$('#fix').onclick=()=>setTarget(1.34);
$('#bad').onclick=()=>setTarget(26.45);
function draw(){
  requestAnimationFrame(draw);
  if(mode!=='eee')return;
  thd+=(target-thd)*.06;if(Math.abs(target-thd)<.01)thd=target;
  slider.value=thd;thdEl.textContent=thd.toFixed(2)+'%';
  $('#fix').classList.toggle('on',target<5);$('#bad').classList.toggle('on',target>=5);
  const W=cv.width,H=cv.height,mid=H/2,s=getComputedStyle(root),dist=thd/26.45;
  cx.clearRect(0,0,W,H);
  cx.strokeStyle=s.getPropertyValue('--line').trim();cx.lineWidth=1;
  for(let i=1;i<4;i++){cx.beginPath();cx.moveTo(0,H*i/4);cx.lineTo(W,H*i/4);cx.stroke()}
  for(let i=1;i<10;i++){cx.beginPath();cx.moveTo(W*i/10,0);cx.lineTo(W*i/10,H);cx.stroke()}
  cx.strokeStyle=s.getPropertyValue('--mute').trim();cx.globalAlpha=.5;cx.setLineDash([6,6]);
  cx.beginPath();for(let x=0;x<=W;x+=4){const y=mid-Math.sin(x/W*Math.PI*6+phase)*mid*.6;x?cx.lineTo(x,y):cx.moveTo(x,y)}cx.stroke();
  cx.setLineDash([]);cx.globalAlpha=1;
  cx.strokeStyle=s.getPropertyValue('--sig').trim();cx.lineWidth=3;cx.lineJoin='round';cx.shadowColor=cx.strokeStyle;cx.shadowBlur=10;cx.beginPath();
  for(let x=0;x<=W;x+=2){
    const a=x/W*Math.PI*6+phase;
    const v=Math.sin(a)+dist*(.22*Math.sin(5*a+1)+.16*Math.sin(7*a+2)+.08*Math.sin(11*a));
    const y=mid-v*mid*.6;x?cx.lineTo(x,y):cx.moveTo(x,y);
  }
  cx.stroke();cx.shadowBlur=0;
  if(!still)phase+=.025;
}

/* ---------- terminal (CSE) ---------- */
const out=$('#tout'),inp=$('#tin');
function say(t,c){const d=document.createElement('div');if(c)d.className=c;d.textContent=t;out.append(d);out.scrollTop=out.scrollHeight}
const C={
 help:()=>'whoami, projects, skills, contact, mode eee, mode cse, clear',
 whoami:()=>'Aman Mehta (Vyom). EEE student at CGIT Raipur, founder of VyomsTech.',
 projects:()=>PRJ.filter(p=>p.m.includes('c')).map(p=>'- '+p.t+': '+p.s).join('\n'),
 skills:()=>'Python, C, C++, JavaScript, React, Node.js, Express, FastAPI, MongoDB, SQL, Supabase',
 contact:()=>'amankrmehta02@gmail.com\ngithub.com/amanmehta276',
 clear:()=>{out.innerHTML='';return ''}
};
function run(raw){
  const cmd=raw.trim().toLowerCase();if(!cmd)return;
  say('$ '+raw,'cmd');
  if(cmd.startsWith('mode ')){const m=cmd.slice(5);if((m==='eee'||m==='cse')&&D[m]){say('Switching to '+m.toUpperCase()+' mode...');setTimeout(()=>setMode(m),350)}else say('Modes: eee, cse');return}
  const f=C[cmd];const r=f?f():'command not found: '+cmd+'. Type help.';if(r)say(r);
}
$('#tf').onsubmit=e=>{e.preventDefault();run(inp.value);inp.value=''};
$$('[data-cmd]').forEach(b=>b.onclick=()=>run(b.dataset.cmd));
$('#term').addEventListener('click',e=>{if(!e.target.closest('button'))inp.focus()});
say('Welcome. Type help, or tap a command below.');

/* ---------- nav, reveal ---------- */
const nav=$('#nav'),menu=$('#menu');
menu.onclick=()=>menu.setAttribute('aria-expanded',nav.classList.toggle('open'));
$$('#nav a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')});
const links=$$('#nav a');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
['about','work','projects','skills','contact'].forEach(id=>so.observe($('#'+id)));
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.1});
$$('.rv').forEach(n=>ro.observe(n));

mode='cse';
try{
  const saved=localStorage.getItem('mode');
  if(saved==='eee'||saved==='cse') mode=saved;
  localStorage.setItem('mode', mode);
}catch(e){}
setMode(mode);
draw();
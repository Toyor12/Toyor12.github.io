const projects=[
{type:'ANALYTICS · POWER BI',title:'Performance Review of Forggith Pharmaceuticals',description:'A structured performance analysis translating pharmaceutical data into product, revenue and sales-team insights.',source:'Operational records',process:'Clean · model · validate',output:'Decision dashboard',metric:'Performance clarity',path:'M0 246 C90 232 132 155 210 175 S350 252 430 134 S565 43 650 104 S770 220 900 54'},
{type:'PIPELINE · BUSINESS INTELLIGENCE',title:'Leveraging Data-Driven Insights for E-commerce Growth',description:'An end-to-end workflow for cleaning, integration and visualization, resulting in an actionable business dashboard.',source:'Commerce data',process:'Integrate · transform',output:'Growth dashboard',metric:'Revenue visibility',path:'M0 220 C90 190 145 240 220 160 S350 60 430 130 S560 215 650 125 S790 48 900 82'},
{type:'SQL · OPERATIONS',title:'Operational Efficiency & Customer Insight Analysis',description:'SQL analysis of Pizza Runner data to reveal operational opportunities and improve customer service.',source:'Orders · runners',process:'Query · benchmark',output:'Operations insight',metric:'Faster delivery',path:'M0 250 C110 240 160 200 245 210 S380 110 470 130 S610 90 700 105 S815 70 900 40'},
{type:'SQL · CUSTOMER',title:'Danny’s Diner Customer Spending Analysis',description:'Customer spending and preference analysis translated into recommendations for experience and retention.',source:'Transaction history',process:'Segment · compare',output:'Customer strategy',metric:'Retention signal',path:'M0 210 C100 160 150 170 235 195 S390 230 470 145 S620 80 690 120 S790 150 900 80'},
{type:'FORECASTING · MARKET',title:'Sales Forecast & Comparative Company Analysis',description:'Forecasting and comparative analysis of two US cab companies across market dynamics, profiles and performance.',source:'Market datasets',process:'Forecast · compare',output:'Market outlook',metric:'Demand forecast',path:'M0 252 C90 240 150 220 225 185 S355 210 450 125 S590 80 680 90 S795 55 900 35'},
{type:'MACHINE LEARNING · CLASSIFICATION',title:'Bank Term Deposit Subscription Prediction',description:'Data wrangling, feature engineering and a deployed predictive model for term-deposit subscriptions.',source:'Campaign records',process:'Engineer · classify',output:'Prediction model',metric:'Conversion likelihood',path:'M0 230 C100 210 165 120 245 165 S365 250 450 145 S590 55 675 112 S810 190 900 70'},
{type:'REGRESSION · POWER BI',title:'FIFA 21 Player Value Prediction',description:'A regression model for player valuation supported by a Power BI interface for exploration and comparison.',source:'Player attributes',process:'Model · regress',output:'Valuation interface',metric:'Fair value estimate',path:'M0 260 C95 180 155 195 230 145 S360 110 450 170 S600 210 680 120 S820 45 900 68'},
{type:'ALGORITHMS · NETWORKS',title:'Routing Optimization for Aeronautical Networks',description:'Dijkstra methods applied to routing across 216 aircraft while balancing throughput and latency.',source:'Aircraft network',process:'Graph · optimize',output:'Routing strategy',metric:'Lower latency',path:'M0 235 C120 235 145 120 240 120 S355 220 455 155 S600 95 690 95 S810 150 900 45'}
];

const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');document.body.classList.toggle('nav-open',open);menu.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');document.body.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');}));

document.getElementById('year').textContent=new Date().getFullYear();

const cursor=document.querySelector('.cursor-orbit');
window.addEventListener('pointermove',event=>{cursor.style.left=`${event.clientX}px`;cursor.style.top=`${event.clientY}px`;});
document.querySelectorAll('a,button').forEach(element=>{element.addEventListener('mouseenter',()=>cursor.classList.add('active'));element.addEventListener('mouseleave',()=>cursor.classList.remove('active'));});

const signalLabel=document.getElementById('signalLabel');
const signalDetail=document.getElementById('signalDetail');
const satellites=document.querySelectorAll('.satellite');
const signalDetails={Python:'Automation, transformation and reliable data logic.',SQL:'Trusted questions answered at warehouse speed.',PySpark:'Distributed processing for data at scale.','Power BI':'Complex analysis translated into clear decisions.','Machine Learning':'Patterns converted into practical predictions.'};
satellites.forEach(satellite=>satellite.addEventListener('click',()=>{satellites.forEach(item=>item.classList.remove('active'));satellite.classList.add('active');const label=satellite.dataset.label;signalLabel.textContent=label.toUpperCase();signalDetail.textContent=signalDetails[label];}));

const tabs=document.querySelectorAll('.system-tab');
const fields={number:document.getElementById('projectNumber'),type:document.getElementById('projectType'),title:document.getElementById('projectTitle'),description:document.getElementById('projectDescription'),source:document.getElementById('projectSource'),process:document.getElementById('projectProcess'),output:document.getElementById('projectOutput'),metric:document.getElementById('projectMetric'),path:document.getElementById('chartPath')};
function loadProject(index){const project=projects[index];tabs.forEach((tab,i)=>tab.classList.toggle('active',i===index));fields.number.textContent=`SYSTEM ${String(index+1).padStart(2,'0')}`;fields.type.textContent=project.type;fields.title.textContent=project.title;fields.description.textContent=project.description;fields.source.textContent=project.source;fields.process.textContent=project.process;fields.output.textContent=project.output;fields.metric.textContent=project.metric;fields.path.setAttribute('d',project.path);fields.path.style.strokeDashoffset='1200';requestAnimationFrame(()=>{fields.path.style.strokeDashoffset='0';});}
tabs.forEach((tab,index)=>tab.addEventListener('click',()=>loadProject(index)));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});revealObserver.unobserve(entry.target);}});},{threshold:.12});
document.querySelectorAll('.profile-manifesto,.profile-notes,.systems-intro,.system-deck,.capability-title,.capability-orbits,.contact-copy,.contact-terminal').forEach(element=>{element.style.opacity='0';revealObserver.observe(element);});

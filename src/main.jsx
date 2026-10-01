import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import confetti from 'canvas-confetti';
import {Heart, Gift, Menu, X, ChevronDown, Sparkles, LockKeyhole, Camera, Star} from 'lucide-react';
import './styles.css';

// ============================================================
// 💕 PERSONALIZATION — EDIT ONLY THIS SECTION FIRST
// ============================================================
const boyfriendName = "MY DEAR BUBU!!!";
const birthdayMessage = `Happy birthday to the most special person in my life. ❤️\nThank you for being there for me, making me smile, supporting me, and filling my life with so many beautiful memories.\n\nI hope this year brings you everything you've wished for and so much more. You deserve all the happiness in the world.\n\nI'm so lucky to have you.\nHappy Birthday, my love! 🥹❤️`;
const secretMessage = "If I could choose my favorite person all over again, I'd still choose you. Every single time.You have no idea how much I LOVE YOU ❤️";
const surpriseMessage = "You are the best thing that ever happened to me.\nYou are one of the sweetest parts of my life, and I hope you always know how loved you are. Today, tomorrow, and on all the ordinary days in between. 🥹💕";
const finalMessage = "No matter how many birthdays come and go, I hope I get to celebrate many more of them with you. ❤️";

const memories = [
  {image:"/photos/memory-1.jpeg", caption:"One of my favorite memories ❤️"},
  {image:"/photos/memory-2.jpeg", caption:"That smile 🥹"},
  {image:"/photos/memory-3.jpeg", caption:"Us being us 💕"},
  {image:"/photos/memory-4.jpeg", caption:"A moment I'll always remember"},
  {image:"/photos/memory-5.jpeg", caption:"My favorite person"},
  {image:"/photos/memory-6.jpeg", caption:"Another little piece of us ✨"}
];
const reasons = ["Your smile", "The way you make me laugh", "You always support me", "You make ordinary days special", "I can be myself around you", "You're simply you"];
const timeline = [
  {title:"The Beginning", text:"When we first met..."},
  {title:"The First Memory", text:"One moment I'll never forget..."},
  {title:"Today", text:"Your birthday ❤️"},
  {title:"The Future", text:"Hopefully many more birthdays together..."}
];
// ============================================================

function burst(amount=180){
  const end=Date.now()+1100;
  const colors=['#ff6b9a','#c8a4ff','#ffc6a5','#fff1a8','#ffffff'];
  const frame=()=>{
    confetti({particleCount:Math.min(9,amount),angle:60,spread:70,origin:{x:0,y:.25},colors});
    confetti({particleCount:Math.min(9,amount),angle:120,spread:70,origin:{x:1,y:.25},colors});
    if(Date.now()<end) requestAnimationFrame(frame);
  }; frame();
}
function heartBurst(x,y,setParticles){
  const now=Date.now();
  setParticles(p=>[...p,...Array.from({length:8},(_,i)=>({id:now+i,x,y,dx:Math.cos(i*Math.PI/4)*45,dy:Math.sin(i*Math.PI/4)*45}))]);
}

function FloatingDecor({onHeart}){
  const items=useMemo(()=>Array.from({length:22},(_,i)=>({id:i,left:Math.random()*100,delay:Math.random()*8,duration:7+Math.random()*7,type:i%4})),[]);
  return <div className="decor" aria-hidden="true">{items.map(it=><button key={it.id} className={`float-item f${it.type}`} style={{left:`${it.left}%`,animationDelay:`-${it.delay}s`,animationDuration:`${it.duration}s`}} onClick={(e)=>onHeart(e.clientX,e.clientY)} tabIndex={-1}>{it.type===0?'♡':it.type===1?'✦':it.type===2?'·':'♥'}</button>)}</div>
}

function Reveal({children,className=''}){
 const ref=useRef(null); const [show,setShow]=useState(false);
 useEffect(()=>{const el=ref.current; const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShow(true);obs.disconnect()}},{threshold:.12}); if(el)obs.observe(el); return()=>obs.disconnect()},[]);
 return <div ref={ref} className={`reveal ${show?'visible':''} ${className}`}>{children}</div>
}

function Nav({open,setOpen}){
 const links=[['Home','home'],['Message','message'],['Memories','memories'],['Reasons','reasons'],['Our Story','story']];
 return <header className="nav"><a className="brand" href="#home" onClick={()=>setOpen(false)}>for my love <Heart size={16} fill="currentColor"/></a><button className="menu-btn" aria-label="Open navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={open?'nav-links open':'nav-links'}>{links.map(([t,id])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)}>{t}</a>)}</nav></header>
}

function Hero({onOpen}){return <section id="home" className="hero"><div className="hero-glow"/><div className="hero-content"><div className="eyebrow"><Sparkles size={15}/> a little surprise, made with love</div><h1>Happy Birthday,<br/><em>My Love!</em> <span>❤️</span></h1><p>Today is all about you...</p><button className="primary-btn" onClick={onOpen}><Gift size={19}/> Open Your Surprise <span>→</span></button><div className="scroll-hint"><ChevronDown size={16}/> keep going, there's more</div></div></section>}

function Message({onSecret}){return <section id="message" className="section message-section"><Reveal><div className="section-label">01 · A little letter</div><div className="message-card"><div className="card-flower">✿</div><h2>Happy Birthday, <span>{boyfriendName}</span> ❤️</h2><div className="message-text">{birthdayMessage.split('\n').map((p,i)=><p key={i}>{p||'\u00a0'}</p>)}</div><div className="signature">always yours <span>♡</span></div><button className="soft-btn" onClick={onSecret}><LockKeyhole size={17}/> I have a secret for you 💌</button></div></Reveal></section>}

function Memories({onOpen}){return <section id="memories" className="section"><Reveal><div className="section-label">02 · little snapshots</div><div className="section-heading"><h2>Our Little Memories <span>📸</span></h2><p>A few moments I'd happily relive a hundred times.</p></div><div className="gallery">{memories.map((m,i)=><button className="memory" key={i} onClick={()=>onOpen(m)}><img src={m.image} alt={m.caption} loading="lazy" onError={(e)=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('placeholder')}}/><div className="photo-placeholder"><Camera size={22}/><span>ADD PHOTO {i+1}</span></div><div className="memory-caption">{m.caption}</div></button>)}</div></Reveal></section>}

function Reasons(){return <section id="reasons" className="section reasons"><Reveal><div className="section-label">03 · tiny reasons</div><div className="section-heading"><h2>Reasons I Love You <span>💕</span></h2><p>And honestly, this list could go on forever.</p></div><div className="reason-grid">{reasons.map((r,i)=><div className="reason" key={i} style={{'--delay':`${i*70}ms`}}><div className="reason-icon">{['♡','✦','☁','∞','☻','♥'][i]}</div><strong>{r}</strong><span>just one of a million things I adore about you</span></div>)}</div></Reveal></section>}

function Story(){return <section id="story" className="section story"><Reveal><div className="section-label">04 · us, in little chapters</div><div className="section-heading"><h2>Our Little Story <span>✨</span></h2><p>Some chapters are my favorites because you're in them.</p></div><div className="timeline">{timeline.map((t,i)=><div className="timeline-item" key={i}><div className="timeline-dot">{i===3?'♥':i+1}</div><div className="timeline-card"><small>{String(i+1).padStart(2,'0')}</small><h3>{t.title}</h3><p>{t.text}</p></div></div>)}</div></Reveal></section>}

function Final({onFinal}){return <section className="final"><div className="final-inner"><div className="section-label">05 · one last thing</div><div className="big-heart">♡</div><h2>And finally...</h2><p>Before you go, there's one more little thing I want you to see.</p><button className="primary-btn" onClick={onFinal}>Click Me <Heart size={18} fill="currentColor"/></button></div></section>}

function Modal({children,onClose,wide=false}){return <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className={`modal ${wide?'wide':''}`}><button className="close" onClick={onClose} aria-label="Close"><X/></button>{children}</div></div>}

function App(){
 const [navOpen,setNavOpen]=useState(false); const [started,setStarted]=useState(false); const [modal,setModal]=useState(null); const [lightbox,setLightbox]=useState(null); const [particles,setParticles]=useState([]);
 const triggerOpen=()=>{setStarted(true); burst(200); setTimeout(()=>document.getElementById('message')?.scrollIntoView({behavior:'smooth'}),350)};
 const particle=(x,y)=>{heartBurst(x,y,setParticles);setTimeout(()=>setParticles(p=>p.filter(a=>Date.now()-a.id<500)),600)};
 return <div className={started?'app started':'app'}><FloatingDecor onHeart={particle}/><Nav open={navOpen} setOpen={setNavOpen}/>{!started?<Hero onOpen={triggerOpen}/>:<><Message onSecret={()=>setModal('secret')}/><Memories onOpen={setLightbox}/><Reasons/><Story/><Final onFinal={()=>{setModal('final');burst(260)}}/><footer>made with a ridiculous amount of love <Heart size={13} fill="currentColor"/> for {boyfriendName}</footer></>}
 {particles.map(p=><span key={p.id} className="particle" style={{left:p.x,top:p.y,'--dx':`${p.dx}px`,'--dy':`${p.dy}px`}}>♥</span>)}
 {modal==='secret'&&<Modal onClose={()=>setModal(null)}><div className="modal-icon">💌</div><div className="section-label">psst... just between us</div><h2>A little secret</h2><p>{secretMessage}</p><div className="modal-sign">♡ yours</div></Modal>}
 {modal==='surprise'&&<Modal onClose={()=>setModal(null)}><div className="modal-icon">🎁</div><div className="section-label">you found another one</div><h2>One More Surprise</h2><p>{surpriseMessage}</p><button className="primary-btn" onClick={()=>burst(220)}>More confetti! ✨</button></Modal>}
 {modal==='final'&&<Modal onClose={()=>setModal(null)}><div className="modal-icon">🎂</div><div className="section-label">the last little note</div><h2>For you, always ❤️</h2><p>{finalMessage}</p><div className="final-line">Happy Birthday, My Love! 🥰🎂❤️</div><button className="soft-btn" onClick={()=>{burst(300);setModal('surprise')}}><Gift size={17}/> One More Surprise 🎁</button></Modal>}
 {lightbox&&<Modal wide onClose={()=>setLightbox(null)}><img className="lightbox-img" src={lightbox.image} alt={lightbox.caption}/><h3>{lightbox.caption}</h3></Modal>}
 </div>
}

createRoot(document.getElementById('root')).render(<App/>);

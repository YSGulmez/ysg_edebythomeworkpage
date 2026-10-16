const slides=[...document.querySelectorAll('.slide')];
let current=0;
const dots=document.getElementById('dots');

slides.forEach((_,i)=>{
  const dot=document.createElement('button');
  dot.className='dot';
  dot.setAttribute('aria-label',`${i+1}. slayta git`);
  dot.onclick=()=>show(i);
  dots.append(dot);
});

function show(i){
  current=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle('active',n===current));
  [...dots.children].forEach((d,n)=>d.classList.toggle('active',n===current));
  document.getElementById('progress').textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  document.getElementById('topProgress').style.width=`${((current+1)/slides.length)*100}%`;
}

show(0);
document.getElementById('next').onclick=()=>show(current+1);
document.getElementById('prev').onclick=()=>show(current-1);
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' ') show(current+1);
  if(e.key==='ArrowLeft') show(current-1);
});

const fullscreenButton=document.getElementById('fullscreen');
fullscreenButton.onclick=async()=>{
  if(!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
};
document.addEventListener('fullscreenchange',()=>{
  const on=Boolean(document.fullscreenElement);
  fullscreenButton.textContent=on?'⤢ Çıkış':'⛶ Tam ekran';
  fullscreenButton.setAttribute('aria-label',on?'Tam ekrandan çık':'Tam ekranı aç');
});

let touchStartX=0,touchStartY=0;
document.addEventListener('touchstart',e=>{
  const touch=e.changedTouches[0];
  touchStartX=touch.clientX;
  touchStartY=touch.clientY;
},{passive:true});
document.addEventListener('touchend',e=>{
  const touch=e.changedTouches[0];
  const dx=touch.clientX-touchStartX,dy=touch.clientY-touchStartY;
  if(e.target.closest('button,.sentence,.drop')||Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)) return;
  if(dx<0) show(current+1); else show(current-1);
},{passive:true});

let mouseStartX=0,mouseStartY=0,mouseDragging=false;
document.addEventListener('mousedown',e=>{
  if(e.button!==0||e.target.closest('button,.sentence,.drop')) return;
  mouseStartX=e.clientX;
  mouseStartY=e.clientY;
  mouseDragging=true;
  document.body.style.cursor='grabbing';
});
document.addEventListener('mouseup',e=>{
  if(!mouseDragging) return;
  mouseDragging=false;
  document.body.style.cursor='';
  const dx=e.clientX-mouseStartX,dy=e.clientY-mouseStartY;
  if(Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)) return;
  if(dx<0) show(current+1); else show(current-1);
});

document.querySelectorAll('#quizChoices button').forEach(b=>b.onclick=()=>{
  const ok=b.dataset.answer==='correct';
  document.querySelectorAll('#quizChoices button').forEach(x=>x.disabled=true);
  b.classList.add(ok?'correct':'wrong');
  if(!ok) document.querySelector('[data-answer="correct"]').classList.add('correct');
  document.getElementById('quizFeedback').textContent=ok
    ?'Doğru! İki dili bir arada gösterirken kısa çizgi kullanılır.'
    :'Tekrar bakalım: doğru cevap B. Kısa çizgi burada iki dili bağlıyor.';
});

let picked=null;
const feedback=document.getElementById('dropFeedback');
document.querySelectorAll('.sentence').forEach(s=>{
  s.addEventListener('dragstart',e=>e.dataTransfer.setData('text',s.dataset.type));
  s.onclick=()=>{
    picked=s;
    document.querySelectorAll('.sentence').forEach(x=>x.style.outline='none');
    s.style.outline='3px solid #8e2436';
  };
});
document.querySelectorAll('.drop').forEach(d=>{
  d.addEventListener('dragover',e=>e.preventDefault());
  d.addEventListener('drop',e=>place(d,e.dataTransfer.getData('text')));
  d.onclick=()=>{if(picked) place(d,picked.dataset.type)};
});
function place(box,type){
  const item=[...document.querySelectorAll('.sentence')].find(s=>s.dataset.type===type&&s.parentElement.id==='sentences');
  if(!item) return;
  if(box.dataset.drop===type){
    box.append(item);
    feedback.textContent='Harika! Doğru işareti buldun.';
  } else feedback.textContent='Bu cümle diğer işaretle ilgili. Bir kez daha dene.';
  picked=null;
  document.querySelectorAll('.sentence').forEach(x=>x.style.outline='none');
}

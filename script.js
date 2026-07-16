const d=document.querySelector('.floating-dust');function c(){let s=document.createElement('span');s.className='dust';s.style.left=Math.random()*100+'%';s.style.animationDuration=(8+Math.random()*8)+'s';d.appendChild(s);setTimeout(()=>s.remove(),16000)}for(let i=0;i<25;i++)c();setInterval(c,500);
const m=document.getElementById('bgMusic'),songBtns=document.querySelectorAll('.song-btn');

// Paste each song's lyrics here as a single line of text (spaces instead of
// line breaks work best for a smooth horizontal scroll). Key must match the
// button's data-title attribute exactly.
const LYRICS={
  'Ride_for_Me':'🎵 lyrics go here 🎵',
  'payphone':'🎵 lyrics go here 🎵'
};
const lyricsTrack=document.getElementById('lyricsTrack');
function setLyrics(title){
  if(!lyricsTrack)return;
  lyricsTrack.textContent=LYRICS[title]||'🎵 lyrics go here 🎵';
}

// Preload the first song so it's ready to go instantly.
const firstBtn=songBtns[0];
if(firstBtn){m.src=firstBtn.dataset.src;setLyrics(firstBtn.dataset.title);}
// Browsers (especially iOS Safari) block audio autoplay with sound until
// the visitor has interacted with the page at least once. So instead of
// waiting for them to find and tap the song button, we start playback on
// the very first tap/click anywhere on the page.
let autoStarted=false;
function startOnFirstInteraction(){
  if(autoStarted||!firstBtn)return;
  autoStarted=true;
  m.play().then(()=>{
    songBtns.forEach(b=>{b.textContent=(b===firstBtn?'⏸ ':'▶ ')+b.dataset.title});
  }).catch(()=>{
    // If it still fails for some reason, fall back silently -
    // the visitor can always tap the button manually.
    autoStarted=false;
  });
  document.removeEventListener('click',startOnFirstInteraction);
  document.removeEventListener('touchend',startOnFirstInteraction);
}
document.addEventListener('click',startOnFirstInteraction);
document.addEventListener('touchend',startOnFirstInteraction);
songBtns.forEach(btn=>{
  btn.onclick=()=>{
    autoStarted=true;
    document.removeEventListener('click',startOnFirstInteraction);
    document.removeEventListener('touchend',startOnFirstInteraction);
    const src=btn.dataset.src,title=btn.dataset.title;
    const isThisPlaying=m.src.includes(encodeURI(src).split('/').pop())&&!m.paused;
    if(isThisPlaying){
      m.pause();
      btn.textContent='▶ '+title;
    }else{
      if(!m.src.includes(encodeURI(src).split('/').pop())){
        m.src=src;
      }
      m.play();
      songBtns.forEach(b=>{if(b!==btn)b.textContent='▶ '+b.dataset.title});
      btn.textContent='⏸ '+title;
      setLyrics(title);
    }
  };
});
m.addEventListener('ended',()=>{songBtns.forEach(b=>{b.textContent='▶ '+b.dataset.title})});
document.getElementById('downloadBtn').onclick=()=>html2canvas(document.getElementById('letterContainer')).then(c=>{let a=document.createElement('a');a.download='Class_of_2026_Letter_Prototype.png';a.href=c.toDataURL();a.click();});

const d=document.querySelector('.floating-dust');function c(){let s=document.createElement('span');s.className='dust';s.style.left=Math.random()*100+'%';s.style.animationDuration=(8+Math.random()*8)+'s';d.appendChild(s);setTimeout(()=>s.remove(),16000)}for(let i=0;i<25;i++)c();setInterval(c,500);
const m=document.getElementById('bgMusic'),songBtns=document.querySelectorAll('.song-btn');
songBtns.forEach(btn=>{
  btn.onclick=()=>{
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
    }
  };
});
m.addEventListener('ended',()=>{songBtns.forEach(b=>{b.textContent='▶ '+b.dataset.title})});
document.getElementById('downloadBtn').onclick=()=>html2canvas(document.getElementById('letterContainer')).then(c=>{let a=document.createElement('a');a.download='Class_of_2026_Alaeto_Ifechukwu_Praise.png';a.href=c.toDataURL();a.click();});
/* ============================================================
   20 LETTERS FOR MY LOVE — APP LOGIC
   ============================================================ */

(function(){
  "use strict";

  const bgMusic = document.getElementById('bgMusic');
  const musicFab = document.getElementById('musicFab');
  let musicEnabled = false;

  /* ---------------- Screen navigation ---------------- */
  function showScreen(id){
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if(el){ el.classList.add('active'); window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'}); }
  }

  /* ---------------- Ambient floating hearts ---------------- */
  const particleLayer = document.getElementById('ambientParticles');
  function spawnAmbientHeart(){
    const h = document.createElement('span');
    h.className = 'ambient-heart';
    h.textContent = '♡';
    h.style.left = Math.random()*100 + '%';
    h.style.animationDuration = (10 + Math.random()*10) + 's';
    h.style.fontSize = (0.8 + Math.random()*1) + 'rem';
    particleLayer.appendChild(h);
    setTimeout(() => h.remove(), 21000);
  }
  for(let i=0;i<10;i++) setTimeout(spawnAmbientHeart, i*400);
  setInterval(spawnAmbientHeart, 1400);

  /* ---------------- 1. Music consent ---------------- */
  document.getElementById('playWithMusicBtn').onclick = () => {
    if(SITE.music && SITE.music.src){
      bgMusic.src = SITE.music.src;
      bgMusic.volume = 0.6;
      bgMusic.play().catch(()=>{ /* file may not exist yet - fail silently */ });
    }
    musicEnabled = true;
    musicFab.hidden = false;
    goToLoading();
  };
  document.getElementById('skipMusicBtn').onclick = () => {
    musicEnabled = false;
    goToLoading();
  };
  musicFab.onclick = () => {
    if(bgMusic.paused){ bgMusic.play().catch(()=>{}); musicFab.textContent = '🔊'; }
    else { bgMusic.pause(); musicFab.textContent = '🔇'; }
  };

  /* ---------------- 2. Loading ---------------- */
  function goToLoading(){
    showScreen('screen-loading');
    setTimeout(() => { populateWelcome(); showScreen('screen-welcome'); }, 2400);
  }

  /* ---------------- 3. Welcome ---------------- */
  function populateWelcome(){
    document.getElementById('welcomeEyebrow').textContent = `Happy 20th Birthday, ${SITE.herName}`;
    document.getElementById('welcomeHeading').textContent = `Happy 20th Birthday, ${SITE.herName}`;
    const sub = document.getElementById('welcomeSub');
    sub.innerHTML = SITE.welcome.subheadingLines.map(l => `<div>${l}</div>`).join('');
    document.getElementById('welcomeIntro').textContent = SITE.welcome.intro;
  }
  document.getElementById('beginJourneyBtn').onclick = () => {
    populateIntro();
    showScreen('screen-intro');
  };

  /* ---------------- 4. Introduction ---------------- */
  function populateIntro(){
    const wrap = document.getElementById('introParagraphs');
    wrap.innerHTML = SITE.introduction.paragraphs.map(p => `<p>${p}</p>`).join('');
  }
  document.getElementById('introContinueBtn').onclick = () => {
    showScreen('screen-journey');
    renderCurrentStep();
  };

  /* ---------------- 5. Letter journey engine ---------------- */
  const stage = document.getElementById('journeyStage');
  const progressLabel = document.getElementById('progressLabel');
  const progressFill = document.getElementById('progressFill');

  // Build a flat sequence: envelope steps + transition pages interleaved
  const sequence = [];
  LETTERS.forEach(letter => {
    sequence.push({ type:'envelope', letter });
    const t = SITE.transitions.find(t => t.afterLetter === letter.id);
    if(t) sequence.push({ type:'transition', data:t });
  });

  let stepIndex = 0;

  function updateProgress(letterNumber){
    progressLabel.textContent = `Letter ${letterNumber} of ${LETTERS.length}`;
    progressFill.style.width = Math.round((letterNumber / LETTERS.length) * 100) + '%';
  }

  function renderCurrentStep(){
    if(stepIndex >= sequence.length){ startEndingSequence(); return; }
    const step = sequence[stepIndex];
    if(step.type === 'envelope'){
      updateProgress(step.letter.id);
      renderEnvelope(step.letter);
    } else {
      renderTransition(step.data);
    }
  }

  function renderEnvelope(letter){
    stage.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'envelope-wrap';

    const env = document.createElement('div');
    env.className = 'envelope' + (letter.isFinal ? ' final' : '');
    env.tabIndex = 0;
    env.setAttribute('role','button');
    env.setAttribute('aria-label', `Open letter ${letter.id} of ${LETTERS.length}`);
    env.innerHTML = `
      <div class="envelope-body"></div>
      <div class="envelope-flap"></div>
      <div class="envelope-seal">${letter.isFinal ? '♥' : letter.id}</div>
      <div class="envelope-paper"></div>
    `;

    const hint = document.createElement('p');
    hint.className = 'envelope-hint';
    hint.textContent = letter.isFinal ? 'One final letter remains — tap to open' : 'Tap the envelope to open your letter';

    wrap.appendChild(env);
    wrap.appendChild(hint);
    stage.appendChild(wrap);

    const open = () => {
      if(env.classList.contains('opening')) return;
      env.classList.add('opening');
      setTimeout(() => {
        if(letter.isFinal){ playFinalDrama(letter); }
        else { renderLetterPage(letter); }
      }, 1500);
    };
    env.addEventListener('click', open);
    env.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } });
  }

  function renderLetterPage(letter){
    stage.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'letter-page';

    const photoHtml = letter.photo
      ? `<img class="letter-photo" src="${letter.photo}" alt="${letter.senderName}">`
      : `<div class="letter-photo-placeholder">${letter.senderName.charAt(0)}</div>`;

    page.innerHTML = `
      <p class="letter-number">Letter ${letter.id} of ${LETTERS.length}</p>
      ${photoHtml}
      <h2 class="letter-from serif">${letter.senderName}</h2>
      ${letter.relationship ? `<p class="letter-relationship">${letter.relationship}</p>` : ''}
      <div class="stationery">
        <div class="letter-paragraphs">
          ${letter.letterText.map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
      <div class="letter-extras" id="letterExtras-${letter.id}"></div>
      <div style="margin-top:32px;">
        <button class="btn btn-primary" id="letterContinueBtn">Continue</button>
      </div>
    `;
    stage.appendChild(page);

    const extras = document.getElementById(`letterExtras-${letter.id}`);
    if(letter.voiceSrc) extras.appendChild(buildAudioPlayer(letter.voiceSrc));
    if(letter.videoSrc) extras.appendChild(buildVideoButton(letter.videoSrc));
    if(letter.gallery && letter.gallery.length) extras.appendChild(buildGallery(letter.gallery));

    document.getElementById('letterContinueBtn').onclick = () => {
      stepIndex++;
      renderCurrentStep();
    };
  }

  function renderTransition(data){
    stage.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'transition-page';
    page.innerHTML = `
      <h2 class="serif">${data.title}</h2>
      <div class="transition-collage">
        ${data.photos.map(() => `<div class="ph"></div>`).join('')}
      </div>
      <p class="transition-quote">&ldquo;${data.quote}&rdquo;</p>
      <p class="transition-caption">${data.caption}</p>
      <button class="btn btn-primary" id="transitionContinueBtn">Continue</button>
    `;
    stage.appendChild(page);
    document.getElementById('transitionContinueBtn').onclick = () => {
      stepIndex++;
      renderCurrentStep();
    };
  }

  /* ---------------- Custom audio player ---------------- */
  function buildAudioPlayer(src){
    const wrap = document.createElement('div');
    wrap.className = 'audio-player-wrap';

    const toggle = document.createElement('button');
    toggle.className = 'btn btn-ghost voice-toggle';
    toggle.textContent = '🎙 Listen to Their Voice';

    const player = document.createElement('div');
    player.className = 'audio-player';
    player.hidden = true;
    player.innerHTML = `
      <button class="audio-playpause" aria-label="Play">▶</button>
      <input type="range" class="audio-seek" min="0" max="100" value="0">
      <span class="audio-time">0:00 / 0:00</span>
      <select class="audio-speed" aria-label="Playback speed">
        <option value="1">1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="0.75">0.75x</option>
      </select>
    `;

    const audio = new Audio(src);
    const playBtn = player.querySelector('.audio-playpause');
    const seek = player.querySelector('.audio-seek');
    const time = player.querySelector('.audio-time');
    const speed = player.querySelector('.audio-speed');

    function fmt(s){ if(!isFinite(s)) return '0:00'; const m=Math.floor(s/60), sec=Math.floor(s%60); return `${m}:${sec.toString().padStart(2,'0')}`; }

    toggle.onclick = () => {
      player.hidden = !player.hidden;
      toggle.hidden = !player.hidden ? false : true;
      if(!player.hidden) toggle.style.display = 'none'; else toggle.style.display = '';
    };

    playBtn.onclick = () => {
      if(audio.paused){ audio.play().catch(()=>{ time.textContent = 'Audio not available yet'; }); playBtn.textContent='⏸'; }
      else { audio.pause(); playBtn.textContent='▶'; }
    };
    audio.addEventListener('timeupdate', () => {
      seek.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      time.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
    });
    seek.addEventListener('input', () => {
      if(audio.duration) audio.currentTime = (seek.value/100) * audio.duration;
    });
    speed.addEventListener('change', () => { audio.playbackRate = parseFloat(speed.value); });
    audio.addEventListener('ended', () => { playBtn.textContent='▶'; });
    audio.addEventListener('error', () => { time.textContent = 'Audio file not found yet'; });

    wrap.appendChild(toggle);
    wrap.appendChild(player);
    return wrap;
  }

  /* ---------------- Video button + modal ---------------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  document.getElementById('modalCloseBtn').onclick = closeModal;
  modalOverlay.addEventListener('click', e => { if(e.target === modalOverlay) closeModal(); });
  function openModal(html){ modalContent.innerHTML = html; modalOverlay.hidden = false; }
  function closeModal(){
    modalOverlay.hidden = true;
    const vid = modalContent.querySelector('video');
    if(vid) vid.pause();
    modalContent.innerHTML = '';
  }

  function buildVideoButton(src){
    const btn = document.createElement('button');
    btn.className = 'btn btn-ghost';
    btn.textContent = '🎥 Watch Birthday Message';
    btn.onclick = () => {
      openModal(`<video class="modal-video" src="${src}" controls autoplay playsinline></video>`);
    };
    return btn;
  }

  /* ---------------- Gallery + lightbox ---------------- */
  function buildGallery(photos){
    const gal = document.createElement('div');
    gal.className = 'letter-gallery';
    photos.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.onclick = () => openModal(`<img class="lightbox-img" src="${src}" alt="">`);
      gal.appendChild(img);
    });
    return gal;
  }

  /* ---------------- Final letter dramatic sequence ---------------- */
  function playFinalDrama(letter){
    const drama = document.createElement('div');
    drama.className = 'drama-screen';
    document.body.appendChild(drama);

    const lines = ['One final letter remains.', 'This letter is different.', 'It comes from the person who loves you with all his heart.'];
    let i = 0;
    function nextLine(){
      drama.innerHTML = `<p class="drama-line">${lines[i]}</p>`;
      i++;
      if(i < lines.length) setTimeout(nextLine, 2200);
      else setTimeout(() => { drama.remove(); renderLetterPage(letter); }, 2200);
    }
    nextLine();
  }

  /* ---------------- 6. Ending sequence ---------------- */
  function startEndingSequence(){
    showScreen('screen-ending');
    const linesWrap = document.getElementById('endingLines');
    const collage = document.getElementById('endingCollage');
    const openBoxBtn = document.getElementById('openMemoryBoxBtn');
    linesWrap.innerHTML = '';
    collage.hidden = true;
    collage.innerHTML = '';
    openBoxBtn.hidden = true;

    const lines = SITE.ending.revealLines;
    let i = 0;
    function showNextLine(){
      const el = document.createElement('p');
      el.className = 'eline serif';
      el.textContent = lines[i];
      el.style.animationDelay = '0s';
      linesWrap.appendChild(el);
      i++;
      if(i < lines.length){ setTimeout(showNextLine, 1500); }
      else { setTimeout(revealCollage, 1800); }
    }
    setTimeout(showNextLine, 600);

    function revealCollage(){
      collage.hidden = false;
      SITE.ending.collagePhotos.forEach((src, idx) => {
        const ph = document.createElement('div');
        ph.className = 'ph';
        ph.style.animationDelay = (idx * 0.15) + 's';
        collage.appendChild(ph);
      });
      launchConfetti();
      setTimeout(() => { openBoxBtn.hidden = false; }, 1600);
    }
  }

  function launchConfetti(){
    const layer = document.getElementById('confettiLayer');
    const colors = ['#b8707c','#cda86a','#f4dde2','#ffffff'];
    for(let i=0;i<60;i++){
      const p = document.createElement('span');
      p.className = 'confetti-piece';
      p.style.left = Math.random()*100 + '%';
      p.style.width = (6 + Math.random()*6) + 'px';
      p.style.height = (10 + Math.random()*8) + 'px';
      p.style.background = colors[Math.floor(Math.random()*colors.length)];
      p.style.animationDuration = (3 + Math.random()*2.5) + 's';
      p.style.animationDelay = (Math.random()*1.2) + 's';
      layer.appendChild(p);
      setTimeout(() => p.remove(), 7000);
    }
  }

  document.getElementById('openMemoryBoxBtn').onclick = () => {
    buildMemoryBox();
    showScreen('screen-memorybox');
  };

  /* ---------------- 7. Memory box ---------------- */
  function buildMemoryBox(){
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    LETTERS.forEach(letter => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.innerHTML = `<div class="num serif">${letter.id}</div><div class="name">${letter.senderName}</div>`;
      card.onclick = () => openMemoryLetter(letter);
      grid.appendChild(card);
    });
  }

  function openMemoryLetter(letter){
    const photoHtml = letter.photo
      ? `<img class="letter-photo" src="${letter.photo}" alt="${letter.senderName}">`
      : `<div class="letter-photo-placeholder">${letter.senderName.charAt(0)}</div>`;
    let html = `
      <p class="letter-number">Letter ${letter.id} of ${LETTERS.length}</p>
      ${photoHtml}
      <h2 class="letter-from serif">${letter.senderName}</h2>
      ${letter.relationship ? `<p class="letter-relationship">${letter.relationship}</p>` : ''}
      <div class="letter-paragraphs">${letter.letterText.map(p => `<p>${p}</p>`).join('')}</div>
      <div class="letter-extras" id="memExtras"></div>
    `;
    openModal(html);
    const extras = document.getElementById('memExtras');
    if(letter.voiceSrc) extras.appendChild(buildAudioPlayer(letter.voiceSrc));
    if(letter.videoSrc) extras.appendChild(buildVideoButton(letter.videoSrc));
    if(letter.gallery && letter.gallery.length) extras.appendChild(buildGallery(letter.gallery));
  }

})();

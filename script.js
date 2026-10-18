/**
 * ONE LITTLE WEBSITE, ONE BIG SORRY 💌
 * Interactive script for best friend apology experience
 */

// ============================================================================
// CONFIGURATION & DEFAULT VALUES
// ============================================================================
const CONFIG = {
  DEFAULT_FRIEND_NAME: "Meri Best Friend",
  DEFAULT_YOUR_NAME: "Tumhara Dost"
};

// State
let appState = {
  friendName: CONFIG.DEFAULT_FRIEND_NAME,
  yourName: CONFIG.DEFAULT_YOUR_NAME,
  isAudioPlaying: false,
  isEnvelopeOpen: false
};

// ============================================================================
// URL PARAMETERS & LOCAL STORAGE INITIALIZATION
// ============================================================================
function initPersonalization() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramFriend = urlParams.get('friend');
  const paramSender = urlParams.get('sender') || urlParams.get('me');

  const storedFriend = localStorage.getItem('apology_friend_name');
  const storedSender = localStorage.getItem('apology_your_name');

  appState.friendName = (paramFriend || storedFriend || CONFIG.DEFAULT_FRIEND_NAME).trim();
  appState.yourName = (paramSender || storedSender || CONFIG.DEFAULT_YOUR_NAME).trim();

  updateDOMPersonalization();
}

function updateDOMPersonalization() {
  // Update friend name everywhere
  document.querySelectorAll('.display-friend-name').forEach(el => {
    el.textContent = appState.friendName;
  });

  // Update sender name everywhere
  document.querySelectorAll('.display-your-name').forEach(el => {
    el.textContent = appState.yourName;
  });

  // Update Form inputs if modal exists
  const inputFriend = document.getElementById('input-friend-name');
  const inputYour = document.getElementById('input-your-name');

  if (inputFriend) inputFriend.value = appState.friendName;
  if (inputYour) inputYour.value = appState.yourName;
}

// ============================================================================
// NATIVE WEB AUDIO API SYNTHESIZER (Gentle Lofi Kalimba / Music Box)
// No external MP3 dependencies, works 100% offline and reliably
// ============================================================================
class SoftAudioPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.step = 0;
    
    // Soothing Kalimba Lullaby Melody Notes (frequencies in Hz)
    // Chords: Cmaj7 -> Am9 -> Fmaj7 -> Gsus4
    this.notes = [
      523.25, 659.25, 783.99, 987.77, // C5, E5, G5, B5
      440.00, 523.25, 659.25, 830.61, // A4, C5, E5, G#5
      349.23, 440.00, 523.25, 698.46, // F4, A4, C5, F5
      392.00, 523.25, 587.33, 783.99  // G4, C5, D5, G5
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration = 1.2, volume = 0.08) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine wave with gentle chime harmonics
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Delicate pluck envelope (fast attack, exponential decay)
      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback issue:", e);
    }
  }

  playCuteChime() {
    this.init();
    if (!this.ctx) return;
    const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chimeNotes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.8, 0.09);
      }, idx * 110);
    });
  }

  startMelody() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.step = 0;

    const playNext = () => {
      if (!this.isPlaying) return;
      const freq = this.notes[this.step % this.notes.length];
      this.playTone(freq, 1.4, 0.06);
      
      // Add occasional gentle bass root note
      if (this.step % 4 === 0) {
        this.playTone(freq / 2, 2.0, 0.05);
      }

      this.step++;
      this.timerId = setTimeout(playNext, 600);
    };

    playNext();
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

const audioPlayer = new SoftAudioPlayer();

// ============================================================================
// AMBIENT CANVAS PARTICLES (Floating hearts, twinkling stars, soft circles)
// ============================================================================
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;

  const particles = [];
  const PARTICLE_COUNT = window.innerWidth < 600 ? 28 : 45;
  const colors = [
    'rgba(255, 182, 193, 0.55)', // Pastel Pink
    'rgba(192, 132, 252, 0.5)',  // Lavender
    'rgba(254, 205, 211, 0.6)',  // Soft Rose
    'rgba(254, 240, 138, 0.45)', // Pale Gold
    'rgba(221, 214, 254, 0.55)'  // Soft Lilac
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class AmbientParticle {
    constructor() {
      this.reset(true);
    }

    reset(initRandomY = false) {
      this.x = Math.random() * width;
      this.y = initRandomY ? Math.random() * height : height + 20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 0.45 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.5 + 0.25;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.type = Math.random() > 0.45 ? 'heart' : 'star';
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.25;
      this.rotation += this.rotSpeed;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;

      if (this.type === 'heart') {
        // Draw tiny heart path
        const s = this.size * 0.7;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.3, 0, s);
        ctx.bezierCurveTo(s, s * 0.3, s * 0.5, -s * 0.3, 0, s * 0.3);
        ctx.fill();
      } else {
        // Draw soft 4-point star
        const s = this.size * 0.6;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(Math.cos((i * Math.PI) / 2) * s, Math.sin((i * Math.PI) / 2) * s);
          ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (s * 0.35), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (s * 0.35));
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new AmbientParticle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    animationFrameId = requestAnimationFrame(loop);
  }

  loop();

  // Pause when page is hidden to save performance and battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      loop();
    }
  });
}

// ============================================================================
// CLICK / TAP HEART PARTICLES
// ============================================================================
function initClickParticles() {
  const container = document.getElementById('click-particles-container');
  if (!container) return;

  const heartIcons = ['💖', '✨', '🌸', '🥺', '💕', '🌷', '🤍'];

  window.addEventListener('pointerdown', (e) => {
    // Avoid triggering right on form controls to prevent UI distraction
    if (e.target.closest('input, textarea, select')) return;

    const heart = document.createElement('span');
    heart.className = 'floating-click-heart';
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1200);
  });
}

// ============================================================================
// CONFETTI BURST (Pure Canvas / Lightweight)
// ============================================================================
function triggerConfettiBurst() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9998';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  const confettiCount = 65;
  const confettiPieces = [];
  const palette = ['#FF6B8B', '#FA5276', '#C084FC', '#A78BFA', '#FBBF24', '#34D399', '#FFE4EC'];

  for (let i = 0; i < confettiCount; i++) {
    confettiPieces.push({
      x: width / 2,
      y: height / 2 + 50,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 9 + 6,
      color: palette[Math.floor(Math.random() * palette.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.38,
      opacity: 1
    });
  }

  let frames = 0;
  function renderConfetti() {
    ctx.clearRect(0, 0, width, height);
    let aliveCount = 0;

    for (const c of confettiPieces) {
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.vx *= 0.98;
      c.rotation += c.rotSpeed;
      if (frames > 40) {
        c.opacity -= 0.02;
      }

      if (c.opacity > 0) {
        aliveCount++;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, c.opacity);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.7);
        ctx.restore();
      }
    }

    frames++;
    if (aliveCount > 0 && frames < 120) {
      requestAnimationFrame(renderConfetti);
    } else {
      canvas.remove();
    }
  }

  renderConfetti();
}

// ============================================================================
// ENVELOPE OPENING ANIMATION & TRANSITION
// ============================================================================
function initEnvelopeExperience() {
  const envelopeWrap = document.getElementById('envelope-wrapper');
  const openBtn = document.getElementById('open-envelope-btn');
  const waxSeal = document.getElementById('wax-seal');
  const apologySection = document.getElementById('apology-section');

  function openEnvelope() {
    if (appState.isEnvelopeOpen) {
      // If already open, just smooth scroll to letter
      if (apologySection) {
        apologySection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    appState.isEnvelopeOpen = true;

    // Trigger cute chime audio
    audioPlayer.playCuteChime();

    // Start background music automatically if not already enabled
    if (!appState.isAudioPlaying) {
      toggleMusic(true);
    }

    // Add opened class to trigger 3D flap & letter rise
    envelopeWrap.classList.add('is-opened');

    // Trigger subtle confetti/sparkle
    triggerConfettiBurst();

    // Smoothly scroll to the apology section after letter emerges
    setTimeout(() => {
      if (apologySection) {
        apologySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 950);
  }

  if (openBtn) {
    openBtn.addEventListener('click', openEnvelope);
  }

  if (envelopeWrap) {
    envelopeWrap.addEventListener('click', openEnvelope);
    envelopeWrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }
}

// ============================================================================
// CUTE INTERACTIVE SECTION ("Ab batao, kitna gussa ho? 😭")
// ============================================================================
function initInteractiveQuestion() {
  const forgiveBtn = document.getElementById('choice-forgive-btn');
  const upsetBtn = document.getElementById('choice-upset-btn');
  const responseForgive = document.getElementById('response-forgive');
  const responseUpset = document.getElementById('response-upset');
  const revealSweetNoteBtn = document.getElementById('reveal-sweet-note-btn');
  const sweetApologyNote = document.getElementById('sweet-apology-note');

  // Option A: Forgiven
  if (forgiveBtn) {
    forgiveBtn.addEventListener('click', () => {
      forgiveBtn.classList.add('selected');
      forgiveBtn.setAttribute('aria-pressed', 'true');
      if (upsetBtn) {
        upsetBtn.classList.remove('selected');
        upsetBtn.setAttribute('aria-pressed', 'false');
      }

      if (responseUpset) responseUpset.classList.add('hidden');
      if (responseForgive) {
        responseForgive.classList.remove('hidden');
      }

      audioPlayer.playCuteChime();
      triggerConfettiBurst();

      // Smooth scroll gently to show the result
      setTimeout(() => {
        responseForgive.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    });
  }

  // Option B: Still upset
  if (upsetBtn) {
    upsetBtn.addEventListener('click', () => {
      upsetBtn.classList.add('selected');
      upsetBtn.setAttribute('aria-pressed', 'true');
      if (forgiveBtn) {
        forgiveBtn.classList.remove('selected');
        forgiveBtn.setAttribute('aria-pressed', 'false');
      }

      if (responseForgive) responseForgive.classList.add('hidden');
      if (responseUpset) {
        responseUpset.classList.remove('hidden');
      }

      // Gentle note sound
      audioPlayer.playTone(440, 1.0, 0.08);

      setTimeout(() => {
        responseUpset.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    });
  }

  // Button to reveal the sweet extra note
  if (revealSweetNoteBtn && sweetApologyNote) {
    revealSweetNoteBtn.addEventListener('click', () => {
      sweetApologyNote.classList.toggle('hidden');
      audioPlayer.playTone(659.25, 0.9, 0.08);

      if (!sweetApologyNote.classList.contains('hidden')) {
        revealSweetNoteBtn.textContent = 'Chupchap sun liya na? 🥺💗';
        setTimeout(() => {
          sweetApologyNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      }
    });
  }
}

// ============================================================================
// BACKGROUND MUSIC TOGGLE
// ============================================================================
function toggleMusic(forceState) {
  const musicStatus = document.getElementById('music-status');
  const shouldPlay = typeof forceState === 'boolean' ? forceState : !appState.isAudioPlaying;

  if (shouldPlay) {
    audioPlayer.startMelody();
    appState.isAudioPlaying = true;
    if (musicStatus) musicStatus.textContent = 'ON 🎶';
  } else {
    audioPlayer.stopMelody();
    appState.isAudioPlaying = false;
    if (musicStatus) musicStatus.textContent = 'OFF';
  }
}

function initMusicControls() {
  const musicBtn = document.getElementById('music-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => toggleMusic());
  }
}

// ============================================================================
// CUSTOMIZATION DIALOG (<dialog>)
// Modern Web Guidance implementation for Top Layer exit transitions
// ============================================================================
function initCustomizeDialog() {
  const dialog = document.getElementById('customize-dialog');
  const openBtn = document.getElementById('customize-btn');
  const closeBtn = document.getElementById('dialog-close-btn');
  const form = document.getElementById('customize-form');
  const copyShareBtn = document.getElementById('copy-share-btn');
  const copySuccessMsg = document.getElementById('copy-success-msg');

  if (!dialog) return;

  function openModal() {
    dialog.showModal();
    if (copySuccessMsg) copySuccessMsg.classList.add('hidden');
  }

  // Close with top-layer animation support
  async function closeModal() {
    if (window.CSS?.supports?.('overlay', 'auto')) {
      dialog.close();
    } else {
      // Fallback for browsers without discrete transitions
      dialog.setAttribute('data-closing', '');
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map(a => a.finished)),
          new Promise(r => setTimeout(r, 400))
        ]);
      }
      dialog.removeAttribute('data-closing');
      dialog.close();
    }
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking on backdrop
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeModal();
    }
  });

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const friendInput = document.getElementById('input-friend-name');
      const yourInput = document.getElementById('input-your-name');
      if (friendInput && friendInput.value.trim()) {
        appState.friendName = friendInput.value.trim();
        localStorage.setItem('apology_friend_name', appState.friendName);
      }
      if (yourInput && yourInput.value.trim()) {
        appState.yourName = yourInput.value.trim();
        localStorage.setItem('apology_your_name', appState.yourName);
      }

      updateDOMPersonalization();
      closeModal();
      triggerConfettiBurst();
    });
  }

  // Copy shareable URL with parameters
  if (copyShareBtn) {
    copyShareBtn.addEventListener('click', async () => {
      const friendVal = document.getElementById('input-friend-name').value.trim() || appState.friendName;
      const yourVal = document.getElementById('input-your-name').value.trim() || appState.yourName;

      const shareUrl = new URL(window.location.href);
      shareUrl.searchParams.set('friend', friendVal);
      shareUrl.searchParams.set('sender', yourVal);

      try {
        await navigator.clipboard.writeText(shareUrl.toString());
        if (copySuccessMsg) {
          copySuccessMsg.classList.remove('hidden');
          copySuccessMsg.textContent = '✅ Personalized link copied! Share it with your friend!';
        }
      } catch (err) {
        // Fallback for non-secure contexts
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl.toString();
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        tempInput.remove();

        if (copySuccessMsg) {
          copySuccessMsg.classList.remove('hidden');
          copySuccessMsg.textContent = '✅ Link copied to clipboard!';
        }
      }
    });
  }
}

// ============================================================================
// APPLICATION BOOTSTRAP
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initPersonalization();
  initAmbientCanvas();
  initClickParticles();
  initEnvelopeExperience();
  initInteractiveQuestion();
  initMusicControls();
  initCustomizeDialog();
});

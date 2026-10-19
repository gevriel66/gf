document.addEventListener("DOMContentLoaded", () => {
  const envelopeScreen = document.getElementById("envelopeScreen");
  const confessionScreen = document.getElementById("confessionScreen");
  const celebrateScreen = document.getElementById("celebrateScreen");

  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");

  const herNameDisplay = document.getElementById("herNameDisplay");
  const yourNameDisplay = document.getElementById("yourNameDisplay");
  const confessionMessageText = document.getElementById("confessionMessageText");
  const confessionHeadingText = document.getElementById("confessionHeadingText");
  const envelopeTitleText = document.getElementById("envelopeTitleText");
  const envelopeSubtitleText = document.getElementById("envelopeSubtitleText");
  const celebrateTitleText = document.getElementById("celebrateTitleText");
  const celebrateSubtitleText = document.getElementById("celebrateSubtitleText");
  const celebrateMessageText = document.getElementById("celebrateMessageText");

  const yesBtn = document.getElementById("yesBtn");
  const yesBtnText = document.getElementById("yesBtnText");
  const noBtn = document.getElementById("noBtn");
  const noBtnText = document.getElementById("noBtnText");
  const dodgeHint = document.getElementById("dodgeHint");
  const buttonsPlayground = document.getElementById("buttonsPlayground");
  const mascotBubble = document.getElementById("mascotBubble");

  const officialDateText = document.getElementById("officialDateText");
  const couponsGrid = document.getElementById("couponsGrid");
  const waSendBtn = document.getElementById("waSendBtn");
  const replayConfettiBtn = document.getElementById("replayConfettiBtn");

  const customWishInput = document.getElementById("customWishInput");
  const lockWishBtn = document.getElementById("lockWishBtn");
  const customWishStatus = document.getElementById("customWishStatus");

  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const musicText = document.getElementById("musicText");
  const musicIcon = document.getElementById("musicIcon");
  const ambientBg = document.getElementById("ambientBg");
  const bgAudio = document.getElementById("bgAudio");

  let dodgeCount = 0;
  let yesScale = 1.0;
  let isMusicPlaying = false;
  let audioCtx = null;
  let musicInterval = null;
  let currentCustomWish = "";
  let useAudioElement = false;

  const audioSrc = (typeof CONFIG !== "undefined" && CONFIG.musicUrl) ? CONFIG.musicUrl : "assets/music.mp3";
  if (bgAudio) {
    bgAudio.src = audioSrc;
    bgAudio.volume = 0.6;
    bgAudio.addEventListener("canplaythrough", () => {
      useAudioElement = true;
    });
    bgAudio.addEventListener("error", () => {
      useAudioElement = false;
    });
  }

  function updateWhatsAppLink() {
    if (!waSendBtn || typeof CONFIG === "undefined" || !CONFIG.waNumber) return;
    const cleanNumber = CONFIG.waNumber.replace(/[^0-9]/g, "");
    let fullMsg = CONFIG.waMessage || "Hey Gege, I said yes! ❤️";
    if (currentCustomWish.trim()) {
      fullMsg += `\n\n✨ PS: My special wish coupon: "${currentCustomWish.trim()}" 💌`;
    }
    waSendBtn.href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullMsg)}`;
  }

  if (typeof CONFIG !== "undefined") {
    if (herNameDisplay) herNameDisplay.textContent = CONFIG.herName || "Audy";
    if (yourNameDisplay) yourNameDisplay.textContent = CONFIG.yourName || "Gege";
    if (envelopeTitleText) envelopeTitleText.textContent = CONFIG.envelopeTitle || "A Little Note For You ✨";
    if (envelopeSubtitleText) envelopeSubtitleText.textContent = CONFIG.envelopeSubtitle || "There is something I have wanted to tell you... Click to open 💌";
    if (confessionHeadingText) confessionHeadingText.textContent = CONFIG.confessionHeading || "Would you be my girlfriend again? 🥺👉👈";
    if (confessionMessageText) confessionMessageText.textContent = CONFIG.confessionMessage || "";
    if (yesBtnText) yesBtnText.textContent = CONFIG.yesButtonText || "Yes, let's do this 💖";
    if (noBtnText) noBtnText.textContent = (CONFIG.noButtonTexts && CONFIG.noButtonTexts[0]) || "Not sure yet 😝";
    if (celebrateTitleText) celebrateTitleText.textContent = CONFIG.celebrateTitle || "To New Beginnings, Together ✨";
    if (celebrateSubtitleText) celebrateSubtitleText.textContent = CONFIG.celebrateSubtitle || "Thank you for choosing us again. 🥰";
    if (celebrateMessageText) celebrateMessageText.textContent = CONFIG.celebrateMessage || "";

    updateWhatsAppLink();

    if (couponsGrid && Array.isArray(CONFIG.coupons)) {
      couponsGrid.innerHTML = "";
      CONFIG.coupons.forEach((coupon) => {
        const item = document.createElement("div");
        item.className = "coupon-item";
        item.innerHTML = `
          <div class="coupon-icon">${coupon.icon || "🎁"}</div>
          <div class="coupon-title">${coupon.title}</div>
          <div class="coupon-desc">${coupon.desc}</div>
          <div class="coupon-stamp">CLAIMED ✨</div>
        `;
        item.addEventListener("click", () => {
          item.classList.toggle("claimed");
          playChime(660, "triangle", 0.15);
        });
        couponsGrid.appendChild(item);
      });
    }
  }

  if (customWishInput) {
    customWishInput.addEventListener("input", () => {
      currentCustomWish = customWishInput.value;
      updateWhatsAppLink();
    });
  }

  if (lockWishBtn && customWishInput) {
    lockWishBtn.addEventListener("click", () => {
      const wish = customWishInput.value.trim();
      if (!wish) {
        if (customWishStatus) {
          customWishStatus.textContent = "Please write a wish first! ✨";
          customWishStatus.style.color = "#e11d48";
        }
        return;
      }
      currentCustomWish = wish;
      updateWhatsAppLink();
      playChime(880, "triangle", 0.25);
      lockWishBtn.classList.add("locked");
      lockWishBtn.innerHTML = "<span>Wish Saved! ✨</span>";
      if (customWishStatus) {
        customWishStatus.textContent = "Wish locked! It will be sent via WhatsApp 🥰";
        customWishStatus.style.color = "#059669";
      }
      confettiMiniBurst();
    });
  }

  if (officialDateText) {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    officialDateText.textContent = today.toLocaleDateString("en-US", options);
  }

  function createAmbientParticles() {
    const symbols = ["💖", "💕", "✨", "🌸", "🤍", "🌷", "⭐"];
    const count = window.innerWidth < 600 ? 14 : 22;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = `${Math.random() * 95}%`;
      heart.style.fontSize = `${Math.random() * 1.1 + 0.8}rem`;
      heart.style.animationDuration = `${Math.random() * 6 + 6}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      ambientBg.appendChild(heart);
    }
  }
  createAmbientParticles();

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = "sine", duration = 0.4, gainLevel = 0.08) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log(e);
    }
  }

  function playChime(freq = 523.25, type = "triangle", duration = 0.3) {
    initAudio();
    playTone(freq, type, duration, 0.12);
  }

  const melodyNotes = [
    523.25, 659.25, 783.99, 987.77,
    440.00, 523.25, 659.25, 880.00,
    587.33, 698.46, 880.00, 1046.50,
    392.00, 493.88, 587.33, 783.99
  ];
  let noteIndex = 0;

  function startSynth() {
    initAudio();
    if (musicInterval) return;
    musicInterval = setInterval(() => {
      const note = melodyNotes[noteIndex % melodyNotes.length];
      playTone(note, "sine", 0.6, 0.045);
      noteIndex++;
    }, 450);
  }

  function startBgm() {
    if (isMusicPlaying) return;
    isMusicPlaying = true;
    musicToggleBtn.classList.add("playing");
    musicText.textContent = "Music On";
    musicIcon.textContent = "💖";

    if (bgAudio && (CONFIG.musicUrl || useAudioElement)) {
      bgAudio.play().catch(() => {
        startSynth();
      });
    } else {
      startSynth();
    }
  }

  function stopBgm() {
    isMusicPlaying = false;
    musicToggleBtn.classList.remove("playing");
    musicText.textContent = "Play Music";
    musicIcon.textContent = "🎵";
    if (bgAudio) {
      bgAudio.pause();
    }
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  }

  musicToggleBtn.addEventListener("click", () => {
    if (isMusicPlaying) {
      stopBgm();
    } else {
      startBgm();
    }
  });

  function attemptAutoplay() {
    try {
      startBgm();
    } catch (e) {}
  }

  attemptAutoplay();

  function onFirstUserGesture() {
    if (!isMusicPlaying) {
      startBgm();
    }
    ["click", "touchstart", "pointerdown", "keydown"].forEach((evt) => {
      window.removeEventListener(evt, onFirstUserGesture);
    });
  }

  ["click", "touchstart", "pointerdown", "keydown"].forEach((evt) => {
    window.addEventListener(evt, onFirstUserGesture, { once: true, passive: true });
  });

  function openEnvelope() {
    initAudio();
    startBgm();
    envelopeWrapper.classList.add("open");

    playChime(523.25, "triangle", 0.2);
    setTimeout(() => playChime(659.25, "triangle", 0.2), 120);
    setTimeout(() => playChime(783.99, "triangle", 0.25), 240);
    setTimeout(() => playChime(1046.50, "triangle", 0.4), 360);

    setTimeout(() => {
      envelopeScreen.classList.remove("active");
      confessionScreen.classList.add("active");
      confettiMiniBurst();
    }, 850);
  }

  envelopeWrapper.addEventListener("click", openEnvelope);
  openEnvelopeBtn.addEventListener("click", openEnvelope);

  const defaultDodgeTexts = [
    "Not sure yet 😝",
    "Are you really sure? 🥺",
    "Give this chapter a chance ✨",
    "Too fast! Try again 😜",
    "Think about the good times ahead ☕",
    "Can't let you click this one 😉",
    "The green button looks way better 👉",
    "Third time's the charm? 💫",
    "Come on, you know you want to 🤍"
  ];

  function dodgeNoButton(e) {
    if (e) e.preventDefault();
    initAudio();

    playTone(320 + Math.random() * 150, "sine", 0.15, 0.1);
    dodgeCount++;

    const texts = (CONFIG && CONFIG.noButtonTexts) || defaultDodgeTexts;
    noBtnText.textContent = texts[dodgeCount % texts.length];

    if (mascotBubble) {
      const bubbleRemarks = [
        "Hear me out, please~ 🥺",
        "Give it another thought! ✨",
        "Look at that lovely green button! 👉",
        "We'd make a great team again! 🤍",
        "No regrets this time, promise! 🌟"
      ];
      mascotBubble.textContent = bubbleRemarks[dodgeCount % bubbleRemarks.length];
    }

    yesScale += 0.12;
    if (yesScale > 1.8) yesScale = 1.8;
    yesBtn.style.transform = `scale(${yesScale})`;

    const container = confessionScreen.querySelector(".confession-card") || document.body;
    const rect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 20;
    const maxX = rect.width - btnRect.width - padding * 2;
    const maxY = 200;

    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;

    noBtn.style.position = "relative";
    noBtn.style.transition = "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    if (dodgeHint) {
      dodgeHint.textContent = `Dodged ${dodgeCount}x! The 'Yes' button is calling you 😉`;
    }
  }

  noBtn.addEventListener("mouseenter", dodgeNoButton);
  noBtn.addEventListener("touchstart", (e) => {
    dodgeNoButton(e);
  }, { passive: false });
  noBtn.addEventListener("click", (e) => {
    dodgeNoButton(e);
  });

  function confettiMiniBurst() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ff5e8e", "#f43f5e", "#fda4af", "#ffd1dc"]
      });
    }
  }

  function launchGrandCelebrationConfetti() {
    if (typeof confetti !== "function") return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#ff5e8e", "#f43f5e", "#fb7185"]
    });
    fire(0.2, {
      spread: 60,
      colors: ["#fbbf24", "#34d399", "#60a5fa"]
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ["#e11d48", "#ec4899", "#a855f7"]
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });

    const end = Date.now() + 3.5 * 1000;
    const interval = setInterval(function() {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ["#ff4081", "#ff80ab", "#f50057"]
      });
    }, 250);
  }

  yesBtn.addEventListener("click", () => {
    initAudio();
    startBgm();

    playTone(523.25, "triangle", 0.3, 0.2);
    setTimeout(() => playTone(659.25, "triangle", 0.3, 0.2), 120);
    setTimeout(() => playTone(783.99, "triangle", 0.35, 0.2), 240);
    setTimeout(() => playTone(1046.50, "triangle", 0.8, 0.25), 360);

    confessionScreen.classList.remove("active");
    celebrateScreen.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    launchGrandCelebrationConfetti();
  });

  if (replayConfettiBtn) {
    replayConfettiBtn.addEventListener("click", () => {
      launchGrandCelebrationConfetti();
    });
  }
});

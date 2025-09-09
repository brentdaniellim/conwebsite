// scroll-animation.js
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); 
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});

//translation.js
// --- Language Toggle ---
const btn = document.getElementById("translateBtn");
let currentLang = "bisaya"; // default

if (btn) {
  btn.addEventListener("click", () => {
    const elements = document.querySelectorAll("[data-bisaya]");
    
    elements.forEach(el => {
      if (currentLang === "bisaya") {
        el.innerHTML = el.getAttribute("data-english"); // use innerHTML
      } else {
        el.innerHTML = el.getAttribute("data-bisaya");
      }
    });

    btn.textContent = currentLang === "bisaya" 
      ? "Switch paragraphs to Bisaya-lish" 
      : "Switch paragraphs to English";

    currentLang = currentLang === "bisaya" ? "english" : "bisaya";
  });
}

// ======= PASSWORD & PAGE UNLOCK =======

// Your password (hex format, no spaces)
const PASSWORD = "496C696B65796F75";

// Function to start animations with delay
function startAnimations() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
}

// Check password input
function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const errorMsg = document.getElementById("errorMsg");

  if (input === PASSWORD) {
    // Save unlock for current session only
    sessionStorage.setItem('unlocked', 'true');

    // Hide password page & show main content
    document.getElementById("password-page").style.display = "none";
    document.getElementById("main-content").style.display = "block";

    // Start music after entering main content
    startMusic();

    // Optional: start main animations after a delay
    setTimeout(() => { startAnimations(); }, 500); // adjust delay if needed
  } else {
    // Wrong password
    errorMsg.style.display = "block";
  }
}

// ======= PAGE LOAD LOGIC =======
window.addEventListener('DOMContentLoaded', () => {
  const unlocked = sessionStorage.getItem('unlocked');

  if (unlocked === 'true') {
    // Already unlocked this session, show main content
    document.getElementById("password-page").style.display = "none";
    document.getElementById("main-content").style.display = "block";

    setTimeout(() => { startAnimations(); }, 1000);
  } else {
    // Show password page by default
    document.getElementById("password-page").style.display = "block";
    document.getElementById("main-content").style.display = "none";
  }

  // Allow pressing Enter to submit password
  const inputEl = document.getElementById("passwordInput");
  if (inputEl) {
    inputEl.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        checkPassword();
      }
    });
  }
});

const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

bgMusic.volume = 0.3;

let isPlaying = false;

// Function to start or pause music
function toggleMusic() {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🎵 Play Music';
  } else {
    bgMusic.play().catch(e => {
      console.log("Autoplay blocked. User interaction required.");
    });
    musicBtn.textContent = '⏸️ Pause Music';
  }
  isPlaying = !isPlaying;
}

// Play music automatically when password unlocks main content
function startMusic() {
  bgMusic.play().catch(e => {
    console.log("Autoplay blocked. Click button to start music.");
  });
  isPlaying = true;
  musicBtn.textContent = '⏸️ Pause Music';
}

// Event listener for button
musicBtn.addEventListener('click', toggleMusic);


// ======= EXTRA.HTML BACK BUTTON =======
function goBackToMain() {
  // Set sessionStorage to bypass password when returning from extra.html
  sessionStorage.setItem('unlocked', 'true');
  window.location.href = "index.html";
}



// --- MENU BURGER ---
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
burger.addEventListener("click", () => drawer.classList.toggle("open"));

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"], #gotoPlay, #scrollToPlay').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(targetId);
      if (section) section.scrollIntoView({ behavior: "smooth" });

      // Close drawer when a menu link is clicked
      drawer.classList.remove("open");
    }
  });
});

// --- PRELOADER ---
const pre = document.getElementById("preloader");
const frame = document.getElementById("game");
const hideLoader = () => pre && (pre.style.display = "none");
frame.addEventListener("load", hideLoader);
setTimeout(hideLoader, 10000);

// --- FULLSCREEN ---
document.getElementById("fsBtn").addEventListener("click", () => {
  const el = frame;
  if (el.requestFullscreen) el.requestFullscreen();
});

// --- ANNÉE ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- BACKGROUND MUSIC ---
const bgMusic = new Audio("assets/bg-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

// Wait for any first user interaction
function startMusic() {
  if (bgMusic.paused) {
    bgMusic.play().catch(err => console.warn("Autoplay blocked:", err));
  }
  // remove listener after first start
  startMusic();
}

// --- MUTE BUTTON ---
const muteBtn = document.getElementById("muteBtn");
let musicMuted = false;

// Smooth fade function
function fadeVolume(target) {
  const step = 0.05;
  const interval = setInterval(() => {
    bgMusic.volume += (target - bgMusic.volume) * 0.3;
    if (Math.abs(bgMusic.volume - target) < 0.02) {
      bgMusic.volume = target;
      clearInterval(interval);
    }
  }, 100);
}

muteBtn.addEventListener("click", () => {
  musicMuted = !musicMuted;
  fadeVolume(musicMuted ? 0 : 0.5);
  muteBtn.textContent = musicMuted ? "🔇" : "🔊";
});

// --- COMMENTAIRES ---
const stars = document.querySelectorAll(".star");
let selectedRating = 0;

// Sélection des étoiles
stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.dataset.value);
    stars.forEach(s => s.classList.remove("active"));
    for (let i = 0; i < selectedRating; i++) stars[i].classList.add("active");
  });
});

// Soumission du formulaire d’avis
const form = document.getElementById("commentForm");
const list = document.getElementById("commentList");

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message || selectedRating === 0) {
    alert("Merci de remplir tous les champs et de donner une note ⭐");
    return;
  }

  const comment = document.createElement("div");
  comment.className = "comment";
  comment.innerHTML = `
    <strong>${name}</strong> - 
    <small>${"⭐".repeat(selectedRating)}</small>
    <p>${message}</p>
  `;

  list.prepend(comment);
  form.reset();
  stars.forEach(s => s.classList.remove("active"));
  selectedRating = 0;
});
// Close drawer when clicking any link inside
document.querySelectorAll(".drawer a").forEach(link => {
  link.addEventListener("click", () => {
    drawer.classList.remove("open");
  });
});

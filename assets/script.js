setTimeout(() => {
  const boot = document.getElementById("boot-screen");
  if (!boot) return;

  boot.style.opacity = "0";
  boot.style.transform = "scale(1.3)";

  setTimeout(() => {
    boot.remove();
  }, 1000);
}, 2500);

function updateClock() {
  const now = new Date();

  const time = now.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const el = document.getElementById("clock");
  if (el) el.textContent = time;
}

setInterval(updateClock, 1000);
updateClock();

async function loadViews() {
  try {
    const res = await fetch("/views");
    const data = await res.json();

    const el = document.getElementById("views");
    if (el) el.textContent = data.views;
  } catch (e) {}
}

setInterval(loadViews, 5000);
loadViews();

/* ================= MENU ================= */

function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("active");
}

/* ================= TYPEWRITER ================= */

const roles = [
  "Anime Lover",
  "Backend Developer",
  "Pentester",
  "Linux User",
  "Open Source Enthusiast",
  "Security Researcher"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typeTarget = document.getElementById("typewriter");

function typeEffect() {
  if (!typeTarget) return;

  const current = roles[roleIndex];

  if (deleting) {
    typeTarget.innerText = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeTarget.innerText = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = deleting ? 50 : 100;

  if (!deleting && charIndex === current.length) {
    speed = 2000;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ================= DISCORD LANYARD ================= */

const USER_ID = "318924091518222338";

const avatarEl = document.getElementById("dc-avatar");
const nameEl = document.getElementById("dc-name");
const usernameEl = document.getElementById("dc-username");
const activityEl = document.getElementById("dc-activity");
const statusEl = document.getElementById("dc-status");
const decorationEl = document.getElementById("dc-decoration");

async function loadDiscord() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
    const json = await res.json();

    if (!json?.success || !json?.data) return;

    const data = json.data;
    const user = data.discord_user;

    nameEl.innerText = user.global_name || user.username;
    usernameEl.innerText = "@" + user.username;

    avatarEl.src =
      `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`;

    const statusColor = {
      online: "#43b581",
      idle: "#faa61a",
      dnd: "#f04747",
      offline: "#747f8d"
    };

    statusEl.style.background =
      statusColor[data.discord_status] || "#747f8d";

    /* ================= DECORATION ================= */

    const deco = user.avatar_decoration_data?.asset;

    if (deco && decorationEl) {
      decorationEl.style.display = "block";
      decorationEl.src =
        `https://cdn.discordapp.com/avatar-decoration-presets/${deco}.png`;
    } else if (decorationEl) {
      decorationEl.style.display = "none";
      decorationEl.removeAttribute("src");
    }

    /* ================= ACTIVITY ================= */

    let html = "";

    const spotify = data.spotify;

    if (spotify) {
      html += `
        <div style="display:flex;gap:10px;margin-top:15px;align-items:center;">
          <img src="${spotify.album_art_url}" style="width:60px;height:60px;border-radius:12px;">
          <div>
            <div>🎵 Đang nghe Spotify</div>
            <div style="font-weight:bold;">${spotify.song}</div>
            <div style="font-size:.8rem;color:gray;">${spotify.artist}</div>
          </div>
        </div>
      `;
    }

    const game = data.activities?.find(
      x => x.type === 0 && x.name !== "Spotify"
    );

    if (game) {
      let gameImage = "";

      if (game.assets?.large_image) {
        if (game.assets.large_image.includes("mp:")) {
          gameImage = game.assets.large_image.replace(
            "mp:",
            "https://media.discordapp.net/"
          );
        } else if (game.application_id) {
          gameImage =
            `https://cdn.discordapp.com/app-assets/${game.application_id}/${game.assets.large_image}.png`;
        }
      }

      html += `
        <div style="display:flex;gap:10px;margin-top:15px;align-items:center;">
          ${gameImage ? `<img src="${gameImage}" style="width:60px;height:60px;border-radius:12px;">` : ""}
          <div>
            <div>🎮 Đang chơi game</div>
            <div style="font-weight:bold;">${game.name}</div>
            <div style="font-size:.8rem;color:gray;">${game.details || ""}</div>
            <div style="font-size:.8rem;color:gray;">${game.state || ""}</div>
          </div>
        </div>
      `;
    }

    if (!html) {
      html = `<div style="color:gray;margin-top:10px;">Không hoạt động</div>`;
    }

    activityEl.innerHTML = html;

    loadBadges(data);

  } catch (err) {
    console.log("Discord Error:", err);
  }
}

/* ================= BADGES ================= */

function loadBadges(data) {
  const badges = [];

  if (data.discord_status === "dnd") {
    badges.push("dnd.png");
  }

  if (data.active_on_discord_mobile) {
    badges.push("quest.png");
  }

  badges.push("boost.png", "orbs.png", "hyper.png", "silver.png", "lacay.png");

  let html = "";

  badges.forEach(x => {
    html += `
      <img src="./badges/${x}"
        style="
          width:38px;
          height:38px;
          padding:6px;
          background:rgba(255,255,255,.05);
          border-radius:50%;
          transition:.3s;
        "
        onmouseover="this.style.transform='scale(1.15)'"
        onmouseleave="this.style.transform='scale(1)'"
      >
    `;
  });

  document.getElementById("discord-badges").innerHTML = html;
}

/* ================= COPY BUTTON ================= */

document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.onclick = () => {
    navigator.clipboard.writeText(btn.dataset.copy);

    btn.innerText = "Đã copy";

    setTimeout(() => {
      btn.innerText = "Copy";
    }, 1500);
  };
});

/* ================= INIT ================= */

loadDiscord();
setInterval(loadDiscord, 15000);
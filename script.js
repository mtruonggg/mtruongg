// =====================
// CONFIG LOAD
// =====================

document.getElementById(
  "username"
).innerText =
  CONFIG.name;

document.getElementById(
  "pronouns"
).innerText =
  CONFIG.pronouns;

document.getElementById(
  "bio"
).innerText =
  CONFIG.bio;

// =====================
// SOCIALS
// =====================

document.getElementById(
  "facebook-link"
).href =
  CONFIG.socials.facebook;

document.getElementById(
  "discord-link"
).href =
  CONFIG.socials.discord;

document.getElementById(
  "website-link"
).href =
  CONFIG.socials.website;


// =====================
// LOADING
// =====================

setTimeout(() => {

  document.getElementById(
    "loading-screen"
  ).style.display =
    "none";

}, 2200);


// =====================
// ENTER SCREEN
// =====================

document
.getElementById(
  "enter-btn"
)
.addEventListener(
  "click",
  () => {

    document
    .getElementById(
      "enter-screen"
    )
    .style.display =
      "none";

  }
);


// =====================
// LANYARD API
// =====================

async function loadDiscord() {

  try {

    const res =
      await fetch(
        `https://api.lanyard.rest/v1/users/${CONFIG.discordId}`
      );

    const json =
      await res.json();

    const data =
      json.data;

    // =====================
    // USER INFO
    // =====================

    if (
      data.discord_user
        ?.avatar
    ) {

      document
      .getElementById(
        "avatar"
      )
      .src =
        `https://cdn.discordapp.com/avatars/${CONFIG.discordId}/${data.discord_user.avatar}.png?size=1024`;
    }

    if (
      data.discord_user
        ?.display_name
    ) {

      document
      .getElementById(
        "username"
      ).innerText =
        data.discord_user.display_name;
    }

    // =====================
    // STATUS
    // =====================

    const status =
      data.discord_status;

    const dot =
      document.getElementById(
        "discord-status"
      );

    document
    .getElementById(
      "discord-text"
    )
    .innerText =
      status.toUpperCase();

    if (
      status ===
      "online"
    ) {

      dot.style.background =
        "#22c55e";

    }

    if (
      status ===
      "idle"
    ) {

      dot.style.background =
        "#eab308";

    }

    if (
      status ===
      "dnd"
    ) {

      dot.style.background =
        "#ef4444";

    }

    if (
      status ===
      "offline"
    ) {

      dot.style.background =
        "#64748b";

    }

    // =====================
    // ACTIVITY
    // =====================

    const activity =
      data.activities
      ?.find(
        x =>
        x.type === 0
      );

    if (activity) {

      document
      .getElementById(
        "activity-name"
      )
      .innerText =
        activity.name ||
        "Unknown";

      document
      .getElementById(
        "activity-details"
      )
      .innerText =
        activity.details ||
        "";

      document
      .getElementById(
        "activity-state"
      )
      .innerText =
        activity.state ||
        "";

    }

    // =====================
    // SPOTIFY
    // =====================

    if (
      data.spotify
    ) {

      document
      .getElementById(
        "spotify-card"
      )
      .classList
      .remove(
        "hidden"
      );

      document
      .getElementById(
        "spotify-cover"
      )
      .src =
        data.spotify
        .album_art_url;

      document
      .getElementById(
        "spotify-song"
      )
      .innerText =
        data.spotify
        .song;

      document
      .getElementById(
        "spotify-artist"
      )
      .innerText =
        data.spotify
        .artist;

      document
      .getElementById(
        "spotify-album"
      )
      .innerText =
        data.spotify
        .album;
    }

  } catch (err) {

    console.error(
      "LANYARD ERROR:",
      err
    );

  }

}

// =====================
// AUTO REFRESH
// =====================

loadDiscord();

setInterval(
  loadDiscord,
  15000
);
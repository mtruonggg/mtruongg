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
// ENTER
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
// LOAD PROFILE
// =====================

async function loadDiscord() {

  try {

    const res =
      await fetch(
        `https://api.lanyard.rest/v1/users/${CONFIG.discordId}`
      );

    const data =
      await res.json();

    console.log(data);

    // =====================
    // USER
    // =====================

    const user =
      data.user ||
      data.discord_user ||
      {};

    if (
      user.avatar
    ) {

      document
      .getElementById(
        "avatar"
      )
      .src =
        user.avatar;
    }

    if (
      user.display_name
    ) {

      document
      .getElementById(
        "username"
      )
      .innerText =
        user.display_name;
    }

    // =====================
    // STATUS
    // =====================

    const status =
      data.status ||
      data.discord_status ||
      "offline";

    const avatarStatus =
      document.getElementById(
        "avatar-status"
      );

    const discordDot =
      document.getElementById(
        "discord-status"
      );

    document
    .getElementById(
      "discord-text"
    )
    .innerText =
      status
      .toUpperCase();

    let color =
      "#64748b";

    if (
      status ===
      "online"
    ) {

      color =
        "#22c55e";
    }

    if (
      status ===
      "idle"
    ) {

      color =
        "#eab308";
    }

    if (
      status ===
      "dnd"
    ) {

      color =
        "#ef4444";
    }

    avatarStatus.style.background =
      color;

    discordDot.style.background =
      color;

    // =====================
    // ACTIVITY
    // =====================

    const activity =
      data.activities?.[0];

    if (
      activity
    ) {

      document
      .getElementById(
        "activity-name"
      )
      .innerText =
        activity.name ||
        "No activity";

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

    const spotify =
      data.spotify;

    if (
      spotify
    ) {

      const card =
        document.getElementById(
          "spotify-card"
        );

      card.classList.remove(
        "hidden"
      );

      document
      .getElementById(
        "spotify-cover"
      )
      .src =
        spotify.album_art_url ||
        spotify.albumArtUrl ||
        "";

      document
      .getElementById(
        "spotify-song"
      )
      .innerText =
        spotify.song ||
        "";

      document
      .getElementById(
        "spotify-artist"
      )
      .innerText =
        spotify.artist ||
        "";

      document
      .getElementById(
        "spotify-album"
      )
      .innerText =
        spotify.album ||
        "";
    }

    // =====================
    // DECORATION
    // =====================

    if (
      user.avatar_decoration_url
    ) {

      let decor =
        document.getElementById(
          "avatar-decor"
        );

      if (
        !decor
      ) {

        decor =
          document.createElement(
            "img"
          );

        decor.id =
          "avatar-decor";

        decor.style.position =
          "absolute";

        decor.style.inset =
          "-14px";

        decor.style.width =
          "145px";

        decor.style.height =
          "145px";

        decor.style.pointerEvents =
          "none";

        document
        .querySelector(
          ".avatar-wrap"
        )
        .appendChild(
          decor
        );
      }

      decor.src =
        user.avatar_decoration_url;
    }

  } catch (
    err
  ) {

    console.error(
      "PROFILE ERROR:",
      err
    );

  }

}

// =====================
// REFRESH
// =====================

loadDiscord();

setInterval(
  loadDiscord,
  15000
);
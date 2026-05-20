const USER_ID =
"318924091518222338";

/* ======================
ELEMENTS
====================== */

const overlay =
document.getElementById(
"overlay"
);

const app =
document.getElementById(
"app"
);

const card =
document.querySelector(
".card"
);

/* ======================
ENTER
====================== */

overlay.addEventListener(
"click",
()=>{

const audio =
new Audio(
"https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8e2b2f7.mp3"
);

audio.volume = .15;

audio.play()
.catch(()=>{});

overlay.animate(
[
{
opacity:1,
filter:"blur(0px)"
},
{
opacity:0,
filter:"blur(18px)"
}
],
{
duration:1200,
easing:
"cubic-bezier(.19,1,.22,1)"
}
);

overlay.classList.add(
"hide"
);

setTimeout(()=>{

app.classList.add(
"show"
);

},300);

}
);

/* ======================
DISCORD API
====================== */

async function loadDiscord(){

try{

const res =
await fetch(
`https://api.lanyard.rest/v1/users/${USER_ID}`
);

const json =
await res.json();

if(
!json.success
)return;

const data =
json.data;

/* ======================
USERNAME
====================== */

document.querySelector(
".username"
).textContent =
data.discord_user.username;

/* ======================
AVATAR
====================== */

const avatar =
document.querySelector(
".avatar"
);

avatar.src =
`https://cdn.discordapp.com/avatars/${
USER_ID
}/${
data.discord_user.avatar
}.png?size=1024`;

/* ======================
STATUS
====================== */

const status =
document.querySelector(
".status"
);

status.className =
"status";

status.classList.add(
data.discord_status
);

/* ======================
BANNER
====================== */

const banner =
document.querySelector(
".banner"
);

if(
data.discord_user.banner
){

banner.style.backgroundImage =
`url(
https://cdn.discordapp.com/banners/${
USER_ID
}/${
data.discord_user.banner
}?size=1024
)`;

}

/* ======================
AVATAR DECORATION
====================== */

const decor =
document.querySelector(
".avatar-decoration"
);

if(
data.discord_user
.avatar_decoration_data
){

decor.src =
`https://cdn.discordapp.com/avatar-decoration-presets/${
data.discord_user
.avatar_decoration_data
.asset
}.png`;

}else{

decor.style.display =
"none";

}

/* ======================
BADGES
====================== */

const badges =
document.querySelector(
".badges"
);

badges.innerHTML = "";

const flagMap = {

1:
"https://cdn.discordapp.com/emojis/1082679435456831488.webp",

2:
"https://cdn.discordapp.com/emojis/1082679482357553152.webp",

4:
"https://cdn.discordapp.com/emojis/1082679503022884864.webp",

8:
"https://cdn.discordapp.com/emojis/1082679467543259176.webp",

64:
"https://cdn.discordapp.com/emojis/1082679548023556137.webp",

512:
"https://cdn.discordapp.com/emojis/1082679596283236432.webp"

};

const flags =
data.discord_user
.public_flags || 0;

Object.entries(
flagMap
).forEach(
([bit,url])=>{

if(
flags &
Number(bit)
){

const img =
document.createElement(
"img"
);

img.src = url;

img.className =
"badge";

badges.appendChild(
img
);

}

}
);

/* ======================
SPOTIFY
====================== */

const bio =
document.querySelector(
".bio"
);

const title =
document.querySelector(
".music-title"
);

const artist =
document.querySelector(
".music-artist"
);

const cover =
document.querySelector(
".music-cover"
);

if(
data.listening_to_spotify
){

bio.textContent =
"Listening to Spotify";

title.textContent =
data.spotify.song;

artist.textContent =
data.spotify.artist;

cover.innerHTML =
`
<img
src="${data.spotify.album_art_url}"
style="
width:100%;
height:100%;
object-fit:cover;
border-radius:14px;
"
/>
`;

}else{

const game =
data.activities.find(
a => a.type === 0
);

bio.textContent =
game
?
`🎮 ${game.name}`
:
"aesthetic profile";

title.textContent =
"Not Playing";

artist.textContent =
"Spotify Idle";

cover.innerHTML =
"♪";

}

}catch(err){

console.log(
"Lanyard Error:",
err
);

}

}

loadDiscord();

setInterval(
loadDiscord,
15000
);

/* ======================
PARTICLES
====================== */

const canvas =
document.getElementById(
"particles"
);

const ctx =
canvas.getContext(
"2d"
);

function resize(){

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}

resize();

window.addEventListener(
"resize",
resize
);

const particles = [];

for(
let i = 0;
i < 100;
i++
){

particles.push({

x:
Math.random() *
canvas.width,

y:
Math.random() *
canvas.height,

size:
Math.random() * 2,

speedX:
(
Math.random()
-.5
) * .3,

speedY:
(
Math.random()
-.5
) * .3

});

}

function animateParticles(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

particles.forEach(
(p,i)=>{

p.x += p.speedX;
p.y += p.speedY;

if(
p.x < 0 ||
p.x > canvas.width
)
p.speedX *= -1;

if(
p.y < 0 ||
p.y > canvas.height
)
p.speedY *= -1;

ctx.beginPath();

ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI * 2
);

ctx.fillStyle =
"rgba(255,255,255,.15)";

ctx.fill();

for(
let j=i+1;
j<particles.length;
j++
){

const p2 =
particles[j];

const dx =
p.x - p2.x;

const dy =
p.y - p2.y;

const dist =
Math.sqrt(
dx*dx+dy*dy
);

if(
dist < 100
){

ctx.beginPath();

ctx.moveTo(
p.x,
p.y
);

ctx.lineTo(
p2.x,
p2.y
);

ctx.strokeStyle =
`rgba(
255,
255,
255,
${
0.05 *
(
1 -
dist / 100
)
}
)`;

ctx.stroke();

}

}

});

requestAnimationFrame(
animateParticles
);

}

animateParticles();

/* ======================
CARD 3D
====================== */

document.addEventListener(
"mousemove",
(e)=>{

if(
window.innerWidth
< 768
)return;

const rect =
card.getBoundingClientRect();

const x =
e.clientX -
rect.left;

const y =
e.clientY -
rect.top;

const centerX =
rect.width / 2;

const centerY =
rect.height / 2;

const rotateX =
(
y-centerY
)/18;

const rotateY =
(
centerX-x
)/18;

card.style.transform =
`
perspective(1200px)
rotateX(${-rotateX}deg)
rotateY(${rotateY}deg)
scale(1.02)
`;

}
);

/* ======================
CURSOR GLOW
====================== */

const cursor =
document.getElementById(
"cursor-glow"
);

document.addEventListener(
"mousemove",
(e)=>{

cursor.style.left =
e.clientX+"px";

cursor.style.top =
e.clientY+"px";

}
);

/* ======================
CURSOR TRAIL
====================== */

document.addEventListener(
"mousemove",
(e)=>{

if(
window.innerWidth
< 768
)return;

const trail =
document.createElement(
"div"
);

trail.className =
"trail";

trail.style.left =
e.clientX+"px";

trail.style.top =
e.clientY+"px";

document.body.appendChild(
trail
);

setTimeout(()=>{

trail.remove();

},700);

}
);

/* ======================
RIPPLE CLICK
====================== */

document.addEventListener(
"click",
(e)=>{

const ripple =
document.createElement(
"div"
);

ripple.className =
"ripple";

ripple.style.left =
e.clientX+"px";

ripple.style.top =
e.clientY+"px";

document.body.appendChild(
ripple
);

setTimeout(()=>{

ripple.remove();

},800);

}
);

/* ======================
MOUSE LIGHT
====================== */

const mouseLight =
document.getElementById(
"mouse-light"
);

document.addEventListener(
"mousemove",
(e)=>{

mouseLight.style.left =
e.clientX+"px";

mouseLight.style.top =
e.clientY+"px";

}
);

/* ======================
PARALLAX BG
====================== */

document.addEventListener(
"mousemove",
(e)=>{

const x =
(
e.clientX /
window.innerWidth
-.5
)*20;

const y =
(
e.clientY /
window.innerHeight
-.5
)*20;

document.querySelector(
".bg-lights"
).style.transform =
`
translate(
${x}px,
${y}px
)
`;

}
);
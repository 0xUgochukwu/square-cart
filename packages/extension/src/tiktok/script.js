const iframe = document.createElement("iframe");
iframe.id = "frame";
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");

iframe.src = `http://localhost:5173/social/tiktok/${username}`;
document.body.appendChild(iframe);

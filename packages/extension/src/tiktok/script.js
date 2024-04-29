const iframe = document.createElement("iframe");
iframe.id = "frame";
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const user = urlParams.get("user");

// iframe.src = `http://localhost:5173/social/tiktok/${username}?user=${user}`;
iframe.src = `https://squarecart-client.netlify.app/social/tiktok/${username}?user=${user}`;
document.body.appendChild(iframe);

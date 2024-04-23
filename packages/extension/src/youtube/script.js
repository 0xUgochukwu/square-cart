const iframe = document.createElement("iframe");
iframe.id = "frame";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const user = urlParams.get("user");

iframe.src = `http://localhost:5173/social/youtube/${id}?user=${user}`;
document.body.appendChild(iframe);

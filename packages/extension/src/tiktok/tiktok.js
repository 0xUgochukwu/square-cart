const getUsername = () => {
    const url = document.location.href;
    const first = url.indexOf("@") + 1;
    const last = url.indexOf("/live");

    const username = url.substring(first, last);
    return username;
};

const square_url = document.querySelector("#square_url").value;

const username = getUsername();
console.log(username);

const url = `${square_url}src/tiktok/index.html?username=${username}`;

const iframe = document.createElement("iframe");
iframe.id = "square-iframe";
iframe.style.display = "none";
iframe.src = url;

const openBtn = document.createElement("div");
openBtn.id = "square-btn-open";
openBtn.onclick = () => {
    if (iframe.style.display == "none") {
        iframe.style.display = "block";
    } else {
        iframe.style.display = "none";
    }
};

document.body.appendChild(openBtn);
document.body.appendChild(iframe);

const getUsername = () => {
    const url = document.location.href;
    const first = url.indexOf("@") + 1;
    const last = url.indexOf("/live");

    const username = url.substring(first, last);
    return username;
};

const getUserInfo = () => {
    const info = document.querySelector("#SIGI_STATE").innerText;
    try {
        const json = JSON.parse(info);
        return json.AppContext.appContext.user;
    } catch (error) {
        return null;
    }
}

const square_url = document.querySelector("#square_url").value;

const username = getUsername();
console.log(username);

let url = `${square_url}src/tiktok/index.html?username=${username}`;

const info = getUserInfo();

if(info){
    const user = {
        name: info.nickName,
        username: info.uniqueId,
        picture: decodeURIComponent(info.avatarUri[0] || ""),
    }

    url += `&user=${btoa(encodeURIComponent(JSON.stringify(user)))}`
    // url += `&user=${JSON.stringify(user)}`
    console.log({url})
    localStorage.setItem("user", JSON.stringify(user))
}

const iframe = document.createElement("iframe");
iframe.id = "square-iframe";
iframe.style.display = "none";
iframe.src = url;

const openBtn = document.createElement("div");
openBtn.id = "square-btn-open";
openBtn.onclick = () => {
    if (iframe.style.display == "none") {
        iframe.style.animation = "0.5s linear 0s 1 alternate fadeInRight"
        iframe.style.display = "block";
    } else {
        iframe.style.animation = "0.5s linear 0s 1 alternate fadeOutRight"
        setTimeout(() => {
            iframe.style.display = "none";
        }, 400);
    }
};

document.body.appendChild(openBtn);
document.body.appendChild(iframe);
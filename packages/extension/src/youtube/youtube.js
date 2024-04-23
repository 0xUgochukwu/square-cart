const API = "http://localhost:2020/v1/api/customer/item?youtube_id="

const parseId = ()=>{
    const link = document.location.href;
    switch (true) {
    case link.includes("youtube.com/watch?v="):
        return link.split("?v=")[1].split("&")[0];
    default:
        return null;
    }
}

const getUserInfo = ()=>{
    try {
        const info = document.querySelector("#SIGI_STATE").innerText;
        const json = JSON.parse(info);
        return json.AppContext.appContext.user;
    } catch (error) {
        return null;
    }
}

const square_url = document.querySelector("#square_url").value;

const id = parseId();
console.log(id);

let url = `${square_url}src/youtube/index.html?id=${id}`;

const info = getUserInfo();

if (info) {
    const user = {
        name: info.nickName,
        username: info.uniqueId,
        picture: decodeURIComponent(info.avatarUri[0] || ""),
    }

    url += `&user=${btoa(encodeURIComponent(JSON.stringify(user)))}`
    // url += `&user=${JSON.stringify(user)}`
    console.log({
        url
    })
    localStorage.setItem("user", JSON.stringify(user))
}

const iframe = document.createElement("iframe");
iframe.id = "square-iframe";
iframe.style.display = "none";
iframe.src = url;

const openBtn = document.createElement("div");
openBtn.id = "square-btn-open";
openBtn.style.display = "none";
openBtn.onclick = ()=>{
    if (iframe.style.display == "none") {
        iframe.style.animation = "0.5s linear 0s 1 alternate fadeInRight"
        iframe.style.display = "block";
    } else {
        iframe.style.animation = "0.5s linear 0s 1 alternate fadeOutRight"
        setTimeout(()=>{
            iframe.style.display = "none";
        }
        , 400);
    }
}

document.body.appendChild(openBtn);
document.body.appendChild(iframe);

const pauseCurrentVideo = ()=>{
    let video = document.querySelector('video');
    if (video != null) {
        video.pause();
    }
}

const resumeCurrentVideo = () => {
  let video = document.querySelector('video');
  if (video != null) {
    video.play();
  }
}

iframe.onmouseenter = () => {
    pauseCurrentVideo();
}

iframe.onmouseleave = () => {
    resumeCurrentVideo();
}

const pollVideo = (start,end,rate)=>{

    console.log({
        start,
        end,
        rate
    });

    let showing = false;

    return setInterval(function() {

        let currentTime = document.getElementsByTagName('video')[0].currentTime;

        if (currentTime > Number(start) && currentTime < Number(end)) {
            if (!showing) {
                window.dispatchEvent(new Event('showProduct'));
                showing = true
            }

        } else if (showing) {
            window.dispatchEvent(new Event('hideProduct'));
            showing = false;
        }

        console.log({
            currentTime
        })

    }, rate);
}

const watchForDuration = async()=>{
    const item = await fetch(`${API}${id}`, {
        mode: "cors"
    }).then(response=>response.json());

    if (item.data.info.youtube_duration) {
        try {
            const {start, end} = item.data.info.youtube_duration;

            pollVideo(start, end, 1000);
        } catch (error) {
            console.log(error);
        }
    }
}

window.addEventListener('showProduct', ()=>{
    iframe.style.animation = "0.5s linear 0s 1 alternate fadeInRight"
    iframe.style.display = "block";
    console.log('Showing product now');
}
)

window.addEventListener('hideProduct', ()=>{
    iframe.style.animation = "0.5s linear 0s 1 alternate fadeOutRight"
    setTimeout(()=>{
        iframe.style.display = "none";
    }
    , 400);
    openBtn.style.display = "block";
    console.log('Hiding product now');
}
)

watchForDuration()

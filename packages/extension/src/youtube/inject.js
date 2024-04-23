var s = document.createElement("script");
s.src = chrome.runtime.getURL("src/youtube/youtube.js");
s.onload = function () {
    // this.remove();
};
(document.head || document.documentElement).appendChild(s);

var t = document.createElement("link");
t.rel = "stylesheet";
t.href = chrome.runtime.getURL("src/youtube/youtube.css");
(document.head || document.documentElement).appendChild(t);

const meta = document.createElement("input");
meta.type = "hidden";
meta.id = "square_url";
meta.value = chrome.runtime.getURL("");
(document.head || document.documentElement).appendChild(meta);
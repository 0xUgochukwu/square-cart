// let hash;

// const paramsToObj = (params) => {
//     return JSON.parse(
//         '{"' +
//             decodeURI(params)
//                 .replace(/"/g, '\\"')
//                 .replace(/&/g, '","')
//                 .replace(/=/g, '":"') +
//             '"}'
//     );
// };

// const serialize = (obj) => {
//   var str = [];
//   for (var p in obj)
//     if (obj.hasOwnProperty(p)) {
//       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//     }
//   return str.join("&");
// }

// const $ = (selector) => {
//     return document.querySelector(selector);
// };

// document.addEventListener('DOMContentLoaded', function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         let tabId = tabs[0].id;
//         chrome.tabs.sendMessage(tabId, {
//             action: "active",
//         }, (response) => {
//             if (!chrome.runtime.lastError) {
//               console.log('fine');
//             } else {
//               // This will print the mentioned error in the console
//               console.log(chrome.runtime.lastError);
//             }

//             console.log(response);

//             if(response?.action === "hash"){
//                 chrome.action.setIcon({
//                     path: "/assets/e.png",
//                     tabId,
//                 });
    
//                 let obj = paramsToObj(atob(response.value));
        
//                 $("#noflutter").style.display = "none";
//                 $("#flutter").style.display = "block";
        
//                 let render = "";
//                 Object.keys(obj).forEach((key) => {
//                     render += `<div class="input-group mb-3 form">
//                     <span class="input-group-text" id="basic-addon1">${key}</span>
//                     <input type="text" value="${decodeURIComponent(
//                         obj[key]
//                     )}" class="form-control" placeholder="${key}" aria-label="${key}" aria-describedby="basic-addon1">
//                     </div>`;
//                 });
//                 $("#form").innerHTML = render;
//             }
//         });
//     });
// })

// window.onload = () => {
//     console.log("Loaded");

//     $("#update").onclick = async () => {
//         let obj = {};
//         let inputs = document.querySelectorAll("#form input");
//         inputs.forEach((input) => {
//             obj[input.placeholder] = input.value;
//             console.log(input.placeholder, input.value);
//         })

//         let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

//         chrome.tabs.sendMessage(tab.id, {
//             action: "update",
//             value: btoa(serialize(obj))
//         });
//     }

//     $("#by a").onclick = () => {
//         chrome.tabs.create({ url: 'https://github.com/DevBash1' });
//     }
// };
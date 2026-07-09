// "content_scripts": [
//     {
//         "matches": ["<all_urls>"],
//         "js": ["howdy.js"],
//         "all_frames": true,
//         "run_at": "document_idle"
//     }
// ]

console.log(window.location.href, document.body, document.querySelectorAll("video"))

if(window.location.href.includes("vhx")) {
    navigator.clipboard.writeText("vhx")
}

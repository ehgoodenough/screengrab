// We're using this experimental api for capturing the dom in the canvas.
// https://developer.chrome.com/blog/html-in-canvas-origin-trial
// You'll need to have chrome://flags/#canvas-draw-element enabled!!

function snapshot() {
    let video = undefined
    let subtitles = undefined

    if(window.location.host.includes("youtube.com")) {
        video = document.getElementsByTagName("video")[0]
        subtitles = document.getElementById("ytp-caption-window-container")?.cloneNode(true)
    } else if(window.location.host.includes("dropout.tv")) {
        // video = document.getElementsByTagName("video")
        // Object.values(document.querySelectorAll("iframe")).forEach((iframe) => {
        //     const subdocument = iframe.contentDocument || iframe.contentwindow?.document
        //     if(subdocument?.getElementsByTagName("video")[0])
        //     video = subdocument?.getElementsByTagName("video")[0] || video
        //     subtitles = subdocument?.getElementsByClassName("vp-captions")[0] || subtitles
        // })
    } else if(window.location.host.includes("beacon.tv")) {
        video = document.getElementsByTagName("video")[0]
        subtitles = document.getElementsByClassName("jw-captions")[0]?.cloneNode(true)
    } else {
        throw new Error("This website is not supported for screengrabs.")
    }



    if(video == undefined) throw new Error("Could not find video")
    const bounds = video?.getBoundingClientRect()

    // CANVAS //

    const canvas = document.createElement("canvas")
    canvas.setAttribute("layoutsubtree", true)

    canvas.width = bounds.width
    canvas.height = bounds.height
    canvas.style.width = bounds.width + "px"
    canvas.style.height = bounds.height + "px"
    canvas.style.transformOrigin = "top right"
    canvas.style.transform = "scale(10%)"
    canvas.style.position = "fixed"
    canvas.style.zIndex = 999999999
    canvas.style.right = 0
    canvas.style.top = 0

    if(subtitles != undefined) canvas.appendChild(subtitles)
    document.body.appendChild(canvas)

    canvas.requestPaint()
    canvas.addEventListener("paint", () => {
        const context = canvas.getContext("2d")
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        if(subtitles != undefined) context.drawElementImage(subtitles, 0, 0)

        // CLIPBOARD //
        canvas.toBlob(async function (blob) {
            await navigator.clipboard.write([
                new ClipboardItem({"image/png": blob})
            ])
            window.setTimeout(function() {
                document.body.removeChild(canvas)
            }, 1000)
        }, "image/png")
    })


}

snapshot()

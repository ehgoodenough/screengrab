// We're using this experimental api for capturing the dom in the canvas.
// https://developer.chrome.com/blog/html-in-canvas-origin-trial
// You'll need to have chrome://flags/#canvas-draw-element enabled!!

function snapshot() {
    const video = document.getElementsByTagName("video")[0]
    if(video == undefined) throw new Error("Could not find video")
    video.bounds = video?.getBoundingClientRect()

    const subtitles = document.getElementById("ytp-caption-window-container")?.cloneNode(true)

    // CANVAS //

    const canvas = document.createElement("canvas")
    canvas.setAttribute("layoutsubtree", true)

    canvas.width = video.bounds.width
    canvas.height = video.bounds.height
    canvas.style.width = video.bounds.width + "px"
    canvas.style.height = video.bounds.height + "px"
    canvas.style.transform = "scale(1%)"
    canvas.style.transformOrigin = "bottom left"

    canvas.style.position = "fixed"
    canvas.style.zIndex = 99999
    canvas.style.bottom = 0
    canvas.style.left = 0

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
            document.body.removeChild(canvas)
        }, "image/png")
    })


}

snapshot()

console.log("!!")

function snapshot() {
    const video = document.getElementsByTagName("video")[0]
    const subtitles = document.getElementById("ytp-caption-window-container")

    console.log(video, subtitles)
    if(video == undefined) throw new Error("Could not find video")
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext("2d")
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // if(subtitles != undefined) {
    //     // context.drawImage(subtitles, 0, 0, canvas.width, canvas.height) // DOES NOT WORK
    //     const centerX = canvas.width / 2
    //     const centerY = canvas.height / 2
    //
    //     // 2. Configure text styling and alignment properties
    //     context.font = `32px "YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif`
    //     context.fillStyle = "black"
    //     context.textAlign = "center"
    //     context.textBaseline = "bottom"
    //
    //     // 3. Draw the text at the center coordinates
    //     context.fillText(subtitles.textContent, canvas.width / 2, canvas.height - 16) // i wish it was better styled
    // }

    // const url = canvas.toDataURL("image/png")
    canvas.toBlob(async function (blob) {
        console.log("Copying to clipboard...")
        await navigator.clipboard.write([
            new ClipboardItem({"image/png": blob})
        ])
        .then((success) => console.log("Done"))
        .catch((error) => console.log(error))
    }, "image/png")
}

snapshot()

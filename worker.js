chrome.action.onClicked.addListener((tab) => {
    // chrome.action.setPopup({"popup": 'popup.html'});
    chrome.scripting.executeScript({
        "target": {"tabId": tab.id},
        "files": ["grabber.js"]
    })
})

// chrome.commands.onCommand.addListener((command) => {
//     console.log(`Command: ${command}`)
// })

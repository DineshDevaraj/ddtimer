
function addNewMessage(event) {
    const message = MessagePallet.clone();
    const rightPanel = document.querySelector('.right-panel');
    rightPanel.appendChild(message.dom);
}

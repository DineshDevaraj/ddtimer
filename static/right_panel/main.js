
function addNewMessage(event) {
    const message = MessagePallet.clone();
    const palletContainer = document.querySelector('.right-panel .pallet-container');
    palletContainer.appendChild(message.dom);
}

document.addEventListener('DOMContentLoaded', function() {
    const addNewMessageButton = document.getElementById('add-new-message');
    addNewMessageButton.addEventListener('click', addNewMessage);
});

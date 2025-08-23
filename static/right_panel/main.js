
function addNewMessage(event) {
    const message = MessagePallet.clone();
    message.dom.querySelector('textarea').value = '';
    message.dom.querySelector('[name=delete]').onclick = deleteMessage;
    const palletContainer = document.querySelector('.right-panel .pallet-container');
    palletContainer.appendChild(message.dom);
}

function deleteMessage(event) {
    event.target.closest('.message-pallet').remove();
}

document.addEventListener('DOMContentLoaded', function() {
    const addNewMessageButton = document.getElementById('add-new-message');
    addNewMessageButton.addEventListener('click', addNewMessage);
});

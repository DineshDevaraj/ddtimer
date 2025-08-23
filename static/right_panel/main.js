
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
    const messagePallet = MessagePallet.getByMessageId("message-1");
    messagePallet.dom.querySelector('[name=delete]').onclick = deleteMessage;
    const addNewMessageButton = document.getElementById('add-new-message');
    addNewMessageButton.onclick = addNewMessage;
});

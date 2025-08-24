
function addNewMessage(event) {
    const message = MessagePallet.clone();
    message.dom.querySelector('textarea').value = '';
    message.dom.querySelector('[name=hide]').classList.add('d-none');
    message.dom.querySelector('[name=show]').classList.remove('d-none');
    const palletContainer = document.querySelector('.right-panel .pallet-container');
    palletContainer.appendChild(message.dom);
    setEventHandlers(message);
}

function setEventHandlers(messagePallet) {
    messagePallet.dom.querySelector('[name=show]').onclick = showMessage;
    messagePallet.dom.querySelector('[name=hide]').onclick = hideMessage;
    messagePallet.dom.querySelector('[name=delete]').onclick = deleteMessage;
}

function deleteMessage(event) {
    event.target.closest('.message-pallet').remove();
}

function showMessage(event) {
    const messagePallet = event.target.closest('.message-pallet');
    const message = messagePallet.querySelector('textarea').value;
    messagePallet.querySelector('[name=hide]').classList.remove('d-none');
    messagePallet.querySelector('[name=show]').classList.add('d-none');
    TimerCard.showMessage(message);
}

function hideMessage(event) {
    const messagePallet = event.target.closest('.message-pallet');
    messagePallet.querySelector('[name=show]').classList.remove('d-none');
    messagePallet.querySelector('[name=hide]').classList.add('d-none');
    TimerCard.hideMessage();
}

document.addEventListener('DOMContentLoaded', function() {
    const messagePallet = MessagePallet.getByMessageId("message-1");
    const addNewMessageButton = document.getElementById('add-new-message');
    addNewMessageButton.onclick = addNewMessage;
    setEventHandlers(messagePallet);
});

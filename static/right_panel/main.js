
let flashStatus = false;
let previousPalletShown = null;

function addNewMessage(event) {
    const message = MessagePallet.clone();

    message.dom.querySelector('textarea').value = '';
    message.dom.querySelector('[name=hide]').classList.add('d-none');
    message.dom.querySelector('[name=show]').classList.remove('d-none');
    message.dom.querySelector('textarea').removeAttribute('disabled');

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
    const messagePallet = event.target.closest('.message-pallet');
    if (previousPalletShown === messagePallet) {
        previousPalletShown = null;
        TimerCard.hideMessage();
    }
    messagePallet.remove();
}

function showMessage(event) {
    if (previousPalletShown) {
        previousPalletShown.querySelector('[name=show]').classList.remove('d-none');
        previousPalletShown.querySelector('[name=hide]').classList.add('d-none');
    }
    const messagePallet = event.target.closest('.message-pallet');
    messagePallet.querySelector('[name=hide]').classList.remove('d-none');
    messagePallet.querySelector('[name=show]').classList.add('d-none');
    previousPalletShown = messagePallet

    messagePallet.querySelector('textarea').setAttribute('disabled', 'disabled');
    const message = messagePallet.querySelector('textarea').value;
    TimerCard.showMessage(message);
}

function hideMessage(event) {
    const messagePallet = event.target.closest('.message-pallet');
    messagePallet.querySelector('textarea').removeAttribute('disabled');
    messagePallet.querySelector('[name=show]').classList.remove('d-none');
    messagePallet.querySelector('[name=hide]').classList.add('d-none');
    previousPalletShown = null;
    TimerCard.hideMessage();
}

document.addEventListener('DOMContentLoaded', function() {
    const messagePallet = MessagePallet.getByMessageId("message-1");
    const addNewMessageButton = document.getElementById('add-new-message');
    addNewMessageButton.onclick = addNewMessage;

    const rightPanel = document.querySelector('.right-panel');
    rightPanel.querySelector('[name=flash]').onclick = TimerCard.toggleMessageFlash;

    setEventHandlers(messagePallet);
});

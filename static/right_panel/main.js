
let flashStatus = false;
let currentPalletShown = null;

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
    if (currentPalletShown === messagePallet) {
        currentPalletShown = null;
        TimerCard.hideMessage();
        TimerCard.hideMessageOverlay();
        resetMessageFocusButton();
        resetMessageFlashButton();
    }
    messagePallet.remove();
}

function showMessage(event) {
    if (currentPalletShown) {
        currentPalletShown.querySelector('[name=show]').classList.remove('d-none');
        currentPalletShown.querySelector('[name=hide]').classList.add('d-none');
        currentPalletShown.querySelector('textarea').removeAttribute('disabled');
    }
    const messagePallet = event.target.closest('.message-pallet');
    messagePallet.querySelector('[name=hide]').classList.remove('d-none');
    messagePallet.querySelector('[name=show]').classList.add('d-none');
    currentPalletShown = messagePallet

    messagePallet.querySelector('textarea').setAttribute('disabled', 'disabled');
    const message = messagePallet.querySelector('textarea').value;
    TimerCard.showMessage(message);
}

function hideMessage(event) {
    currentPalletShown = null;

    TimerCard.hideMessage();
    TimerCard.hideMessageOverlay();

    resetMessagePallet(event);
    resetMessageFocusButton();
    resetMessageFlashButton();
}

function resetMessagePallet(event) {
    const messagePallet = event.target.closest('.message-pallet');
    messagePallet.querySelector('textarea').removeAttribute('disabled');
    messagePallet.querySelector('[name=show]').classList.remove('d-none');
    messagePallet.querySelector('[name=hide]').classList.add('d-none');
}

function resetMessageFocusButton() {
    const button = document.querySelector('.right-panel [name=focus]');
    button.classList.remove("border-danger");

    const icon = button.querySelector('i');
    icon.classList.remove("text-danger");
}

function resetMessageFlashButton() {
    const button = document.querySelector('.right-panel [name=flash]');
    button.classList.remove("border-danger");

    const icon = button.querySelector('i');
    icon.classList.add("bi-lightning-charge");
    icon.classList.remove("bi-lightning-charge-fill");
    icon.classList.remove("text-danger");
    icon.classList.remove("flash");
}

document.addEventListener('DOMContentLoaded', function() {
    const messagePallet = MessagePallet.getByMessageId("message-1");
    const addNewMessageButton = document.getElementById('add-new-message');
    addNewMessageButton.onclick = addNewMessage;

    const rightPanel = document.querySelector('.right-panel');
    rightPanel.querySelector('[name=flash]').onclick = flashMessage;
    rightPanel.querySelector('[name=focus]').onclick = focusMessage;

    setEventHandlers(messagePallet);
});

function flashMessage(event) {
    const button = event.target.closest('button');
    button.classList.toggle("border-danger");
    button.querySelector('i').classList.toggle("bi-lightning-charge-fill");
    button.querySelector('i').classList.toggle("bi-lightning-charge");
    button.querySelector('i').classList.toggle("text-danger");
    button.querySelector('i').classList.toggle("flash");
    TimerCard.toggleMessageFlash();
}

function focusMessage(event) {
    const button = event.target.closest('button');
    button.classList.toggle("border-danger");
    button.querySelector('i').classList.toggle("text-danger");
    TimerCard.toggleMessageOverlay();
}

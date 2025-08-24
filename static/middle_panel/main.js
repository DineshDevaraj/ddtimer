
function addNewTimer(event) {

    const timer = TimerPallet.clone();

    setTimerElementsValue(timer);
    attachGeneralInfoPopover(timer.dom);
    attachTimerDescriptionEditor(timer.dom);
    attachTimerDurationEditor(timer.dom);
    attachStartTimeEditor(timer.dom);

    timer.dom.querySelector('[name=delete]').onclick = deleteTimer;
    const middlePanel = document.querySelector('.middle-panel .row');
    middlePanel.appendChild(timer.dom);
}

function deleteTimer(event) {
    event.target.closest('.timer-pallet').remove();
}

function setTimerElementsValue(timer) {
    timer.dom.querySelector('[name=sc-num]').textContent = timer.number;
    timer.dom.querySelector('[name=title]').textContent = `Title-${timer.number}`;
    timer.dom.querySelector('[name=speaker]').textContent = `Speaker-${timer.number}`;

    const prevTimer = TimerPallet.getByTimerId(`timer-${timer.number - 1}`);
    timer.dom.querySelector('[name=start-time]').textContent = prevTimer.endTime.toString();
}

document.addEventListener('DOMContentLoaded', function() {
    
    const timer =  TimerPallet.getByTimerId("timer-1");

    attachGeneralInfoPopover(timer.dom);
    attachTimerDescriptionEditor(timer.dom);
    attachTimerDurationEditor(timer.dom);
    attachStartTimeEditor(timer.dom);

    const middlePanel = document.querySelector('.middle-panel');
    middlePanel.querySelector('[name=flash]').onclick = TimerCard.toggleTimerFlash;

    timer.dom.querySelector('[name=delete]').onclick = deleteTimer;
    const addNewTimerButton = document.getElementById('add-new-timer');
    addNewTimerButton.onclick = addNewTimer;
});

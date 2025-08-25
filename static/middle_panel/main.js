
function addNewTimer(event) {

    const timer = TimerPallet.clone();

    setTimerElementsValue(timer);
    attachGeneralInfoPopover(timer.dom);
    attachTimerDescriptionEditor(timer.dom);
    attachTimerDurationEditor(timer.dom);
    attachStartTimeEditor(timer.dom);

    document.querySelector('.middle-panel .row').appendChild(timer.dom);

    timer.dom.querySelector('[name=Start]').classList.remove('d-none');
    timer.dom.querySelector('[name=Delete]').onclick = deleteTimer;

    timer.dom.querySelector('[name=Resume]').classList.add('d-none');
    timer.dom.querySelector('[name=Resume]').onclick = resumeTimer;

    timer.dom.querySelector('[name=Pause]').classList.add('d-none');
    timer.dom.querySelector('[name=Pause]').onclick = pauseTimer;
}

function pauseTimer(event) {
    const timerDom = event.target.closest('.timer-pallet');
    timerDom.querySelector('[name=Resume]').classList.remove('d-none');
    timerDom.querySelector('[name=Pause]').classList.add('d-none');
    TimerCard.pause();
}

function resumeTimer(event) {
    const timerDom = event.target.closest('.timer-pallet');
    timerDom.querySelector('[name=Pause]').classList.remove('d-none');
    timerDom.querySelector('[name=Resume]').classList.add('d-none');
    TimerCard.resume();
}

function deleteTimer(event) {
    event.target.closest('.timer-pallet').remove();
    if (TimerCard.timer && TimerCard.timer.dom === event.target.closest('.timer-pallet'))
        TimerCard.reset();
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
    middlePanel.querySelector('[name=flash]').onclick = flashTimer;
    middlePanel.querySelector('[name=blackout]').onclick = timerCardBlackout;

    document.getElementById('add-new-timer').onclick = addNewTimer;
    timer.dom.querySelector('[name=Delete]').onclick = deleteTimer;
    timer.dom.querySelector('[name=Resume]').onclick = resumeTimer;
    timer.dom.querySelector('[name=Pause]').onclick = pauseTimer;
});

function flashTimer(event) {
    const button = event.target.closest('button');
    button.classList.toggle("border-danger");
    button.querySelector('i').classList.toggle("bi-lightning-charge-fill");
    button.querySelector('i').classList.toggle("bi-lightning-charge");
    button.querySelector('i').classList.toggle("text-danger");
    button.querySelector('i').classList.toggle("flash");
    TimerCard.toggleTimerFlash();
}

function timerCardBlackout(event) {
    const button = event.target.closest('button');
    button.querySelector('i').classList.toggle("text-danger");
    button.classList.toggle("border-danger");
    TimerCard.toggleBlackoutOverlay();
}

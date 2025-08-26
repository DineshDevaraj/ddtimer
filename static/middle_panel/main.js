
function addNewTimer(event) {

    const timer = TimerPallet.clone();

    setTimerElementsValue(timer);
    attachGeneralInfoPopover(timer.dom);
    attachTimerDescriptionEditor(timer.dom);
    attachTimerDurationEditor(timer.dom);
    attachStartTimeEditor(timer.dom);

    document.querySelector('.middle-panel .row').appendChild(timer.dom);

    timer.dom.querySelector('[name=Start]').classList.remove('d-none');
    timer.dom.querySelector('[name=Delete]').onclick = timer.delete;

    timer.dom.querySelector('[name=Resume]').classList.add('d-none');
    timer.dom.querySelector('[name=Resume]').onclick = timer.resume;

    timer.dom.querySelector('[name=Pause]').classList.add('d-none');
    timer.dom.querySelector('[name=Pause]').onclick = timer.pause;
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
    timer.dom.querySelector('[name=Delete]').onclick = timer.delete;
    timer.dom.querySelector('[name=Resume]').onclick = timer.resume;
    timer.dom.querySelector('[name=Pause]').onclick = timer.pause;
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

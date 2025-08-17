
document.addEventListener('DOMContentLoaded', function() {
    
    const timer = new TimerPallet();
    const timerDiv = document.getElementById("timer-1");
    timerDiv.querySelector("[name=Start]").onclick = timer.runThisTimer.bind(timer);

    attachGeneralInfoPopover(timerDiv);
    attachTimerDescriptionEditor(timerDiv);
    attachTimerDurationEditor(timerDiv);
    attachStartTimeEditor(timerDiv);
    
    const addNewTimerButton = document.getElementById('add-new-timer');
    addNewTimerButton.addEventListener('click', addNewTimer);
});

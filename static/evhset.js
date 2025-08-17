
document.addEventListener('DOMContentLoaded', function() {
    const timerDiv = document.getElementById("timer-1");
    attachGeneralInfoPopover(timerDiv);
    attachTimerDescriptionEditor(timerDiv);
    attachTimerDurationEditor(timerDiv);
    attachStartTimeEditor(timerDiv);
    
    const addNewTimerButton = document.getElementById('add-new-timer');
    addNewTimerButton.addEventListener('click', addNewTimer);
});

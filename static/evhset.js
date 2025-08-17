
document.addEventListener('DOMContentLoaded', function() {
    
    const timer =  TimerPallet.getByTimerId("timer-1");

    attachGeneralInfoPopover(timer.dom);
    attachTimerDescriptionEditor(timer.dom);
    attachTimerDurationEditor(timer.dom);
    attachStartTimeEditor(timer.dom);

    const addNewTimerButton = document.getElementById('add-new-timer');
    addNewTimerButton.addEventListener('click', addNewTimer);
});

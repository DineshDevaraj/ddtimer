/**
 * Event Handler Definitions
 */

function addNewTimer(event) {

    const timer = new TimerPallet();

    const firstTimer = document.getElementById('timer-1');
    const newTimerDiv = firstTimer.cloneNode(true);

    newTimerDiv.querySelector('.sc-num').textContent = timer.number;
    newTimerDiv.onclick = timer.runThisTimer.bind(timer);
    newTimerDiv.id = 'timer-' + timer.number;

    attachGeneralInfoPopover(newTimerDiv);
    attachTimerDescriptionEditor(newTimerDiv);
    attachTimerDurationEditor(newTimerDiv);
    attachStartTimeEditor(newTimerDiv);

    const middlePanel = document.querySelector('.middle-panel .row');
    middlePanel.appendChild(newTimerDiv);
}

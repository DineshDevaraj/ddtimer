/**
 * Event Handler Definitions
 */

number_of_timers = 1;

function addNewTimer(event) {
    number_of_timers += 1;

    const firstTimer = document.getElementById('timer-1');
    const newTimerDiv = firstTimer.cloneNode(true);

    newTimerDiv.querySelector('.sc-num').textContent = number_of_timers;
    newTimerDiv.id = 'timer-' + number_of_timers;
    attachTimerDescriptionEditor(newTimerDiv);
    attachTimerDurationEditor(newTimerDiv);
    attachStartTimeEditor(newTimerDiv);

    const middlePanel = document.querySelector('.middle-panel .row');
    middlePanel.appendChild(newTimerDiv);
}

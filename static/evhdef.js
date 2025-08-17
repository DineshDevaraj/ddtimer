/**
 * Event Handler Definitions
 */

function addNewTimer(event) {

    const timer = TimerPallet.clone();

    timer.dom.querySelector('.sc-num').textContent = timer.number;

    attachGeneralInfoPopover(timer.dom);
    attachTimerDescriptionEditor(timer.dom);
    attachTimerDurationEditor(timer.dom);
    attachStartTimeEditor(timer.dom);

    const middlePanel = document.querySelector('.middle-panel .row');
    middlePanel.appendChild(timer.dom);
}

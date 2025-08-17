/**
 * Event Handler Definitions
 */

function addNewTimer(event) {

    const timer = TimerPallet.clone();

    timer.dom.querySelector('.sc-num').textContent = timer.number;
    timer.dom.querySelector("[name=Start]").onclick = timer.runThisTimer.bind(timer);

    attachGeneralInfoPopover(timer.dom);
    attachTimerDescriptionEditor(timer.dom);
    attachTimerDurationEditor(timer.dom);
    attachStartTimeEditor(timer.dom);

    const middlePanel = document.querySelector('.middle-panel .row');
    middlePanel.appendChild(timer.dom);
}

/**
 * Event Handler Definitions
 */

function addNewTimer(event) {

    const timer = TimerPallet.clone();

    timer.dom.querySelector('[name=sc-num]').textContent = timer.number;
    timer.dom.querySelector('[name=title]').textContent = `Title-${timer.number}`;
    timer.dom.querySelector('[name=speaker]').textContent = `Speaker-${timer.number}`;

    attachGeneralInfoPopover(timer.dom);
    attachTimerDescriptionEditor(timer.dom);
    attachTimerDurationEditor(timer.dom);
    attachStartTimeEditor(timer.dom);

    const middlePanel = document.querySelector('.middle-panel .row');
    middlePanel.appendChild(timer.dom);
}

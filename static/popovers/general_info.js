
function attachGeneralInfoPopover(parent) {
    const timerPallet = parent.closest('.timer-pallet');
    const timerStartButton = parent.querySelector('[name=Start]');
    timerStartButton.addEventListener('shown.bs.popover', popoverShownHook);
    attachPopover(timerPallet.id, timerStartButton);
    document.addEventListener('click', function (e) {
        const popoverElement = document.querySelector('.popover');
        if (!timerStartButton.contains(e.target) && (!popoverElement || !popoverElement.contains(e.target))) {
            const popoverInstance = bootstrap.Popover.getInstance(timerStartButton);
            if (popoverInstance) {
                popoverInstance.hide();
            }
        }
    });
}

function attachPopover(timerId, domObj) {
    new bootstrap.Popover(domObj, {
        html: true,
        title: "Info",
        content: document.getElementById('general-info').innerHTML,
        customClass: timerId,
        placement: 'bottom',
        sanitize: false
    });
}

function popoverShownHook() {
    let content = "";
    const popoverDom = document.querySelector('.popover');
    const timerPallet = TimerPallet.getByTimerId(popoverDom.classList[1]);
    const timeLeft = timerPallet.startTime.timeLeft();
    if (timerPallet.startTime.aheadOfCurrentTime()) {
        content += `Still time left is ${timeLeft.hour}h ${timeLeft.minute}m ${timeLeft.second}s.\n`;
    } else {
        content += `Already past by ${timeLeft.hour}h ${timeLeft.minute}m ${timeLeft.second}s.\n`;
    }
    content += `Are you sure you want to start this timer?`;
    popoverDom.querySelector('p').textContent = content;
}

function generalInfoOk(event) {
    closePopover(event);
    const popoverDom = event.target.closest('.popover');
    const timer = TimerPallet.getByTimerId(popoverDom.classList[1]);
    TimerCard.injectTimer(timer);
    TimerCard.start();
}

function generalInfoCancel(event) {
    closePopover(event);
}

function closePopover(event) {
    const popoverDom = event.target.closest('.popover');
    const timerPalletDom = document.getElementById(popoverDom.classList[1]);
    const startButton = timerPalletDom.querySelector('[name=Start]');
    bootstrap.Popover.getInstance(startButton).hide();
}

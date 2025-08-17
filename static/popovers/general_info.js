
function attachGeneralInfoPopover(parent) {
    const timerPallet = parent.closest('.timer-pallet');
    const timerStartButton = parent.querySelector('[name=Start]');

    const popover = new bootstrap.Popover(timerStartButton, {
        html: true,
        content: document.getElementById('general-info').innerHTML,
        customClass: timerPallet.id,
        title: "Info",
        placement: 'bottom',
        sanitize: false
    });

    timerStartButton.addEventListener('shown.bs.popover', () => {
        const popoverElement = document.querySelector('.popover');
        popoverElement.querySelector('p').textContent = "Are you sure you want to start this timer?";
    });

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

function generalInfoOk(event) {
    closePopover(event);
    const popoverDom = event.target.closest('.popover');
    const timer = TimerPallet.getByTimerId(popoverDom.classList[1]);
    TimerCard.inject(timer);
    TimerCard.start();
}

function generalInfoCancel(event) {
    closePopover(event);
}

function closePopover(event) {
    const popoverDom = event.target.closest('.popover');
    const timerPallet = document.getElementById(popoverDom.classList[1]);
    const startButton = timerPallet.querySelector('[name=Start]');
    bootstrap.Popover.getInstance(startButton).hide();
}

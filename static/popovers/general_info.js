
function attachGeneralInfoPopover(parent) {
    const timerPallet = parent.closest('.timer-pallet');
    const timerStartButton = parent.querySelector('[title=Start]');

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

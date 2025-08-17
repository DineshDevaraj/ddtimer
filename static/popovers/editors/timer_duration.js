
function attachTimerDurationEditor(parent) {
    const timerPallet = parent.closest('.timer-pallet');
    const timerDurationDiv = parent.querySelector('[name=timer-duration]');

    const popover = new bootstrap.Popover(timerDurationDiv, {
        html: true,
        content: document.getElementById('timer-duration-editor').innerHTML,
        customClass: timerPallet.id,
        title: "Set Timer Duration",
        placement: 'bottom',
        sanitize: false
    });

    timerDurationDiv.addEventListener('shown.bs.popover', () => {
        const popoverElement = document.querySelector('.popover');
        popoverElement.querySelector('input[name=hour]').value = timerDurationDiv.textContent.split(':')[0];
        popoverElement.querySelector('input[name=minute]').value = timerDurationDiv.textContent.split(':')[1].split(' ')[0];
    });

    document.addEventListener('click', function (e) {
        const popoverElement = document.querySelector('.popover');
        if (!timerDurationDiv.contains(e.target) && (!popoverElement || !popoverElement.contains(e.target))) {
            const popoverInstance = bootstrap.Popover.getInstance(timerDurationDiv);
            if (popoverInstance) {
                popoverInstance.hide();
            }
        }
    });
}

function setTimerDuration(event) {
    const popoverDom = event.target.closest('.popover');
    const hour = popoverDom.querySelector('input[name=hour]').value;
    const minute = popoverDom.querySelector('input[name=minute]').value;
    const timerPallet = document.getElementById(popoverDom.classList[1]);
    const timerDurationDiv = timerPallet.querySelector('[name=timer-duration]');
    bootstrap.Popover.getInstance(timerDurationDiv).hide();
    const formattedDuration = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    timerDurationDiv.textContent = formattedDuration;
}

function cancelTimerDurationEditor(event) {
    const popoverDom = event.target.closest('.popover');
    const timerPallet = document.getElementById(popoverDom.classList[1]);
    const timerDurationDiv = timerPallet.querySelector('[name=timer-duration]');
    bootstrap.Popover.getInstance(timerDurationDiv).hide();
}

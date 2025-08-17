
function setStartTime(event) {
    const popoverDom = event.target.closest('.popover');
    const hour = popoverDom.querySelector('input[name=Hour]').value;
    const minute = popoverDom.querySelector('input[name=Minute]').value;
    const second = popoverDom.querySelector('input[name=Second]').value;
    const ampm = popoverDom.querySelector('select[name=AM-PM]').value;
    const timerPallet = document.getElementById(popoverDom.classList[1]);
    const startTimeDiv = timerPallet.querySelector('[name=start-time]');
    bootstrap.Popover.getInstance(startTimeDiv).hide();
    const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')} ${ampm}`;
    startTimeDiv.textContent = formattedTime;
}

function attachStartTimeEditor(parent) {
    const timerPallet = parent.closest('.timer-pallet');
    const startTimeDiv = parent.querySelector('[name=start-time]');

    const popover = new bootstrap.Popover(startTimeDiv, {
        html: true,
        content: document.getElementById('start-time-editor').innerHTML,
        customClass: timerPallet.id,
        title: "Start Time",
        placement: 'bottom',
        sanitize: false
    });

    startTimeDiv.addEventListener('shown.bs.popover', () => {
        const popoverElement = document.querySelector('.popover');
        popoverElement.querySelector('input[name=Hour]').value = startTimeDiv.textContent.split(':')[0];
        popoverElement.querySelector('input[name=Minute]').value = startTimeDiv.textContent.split(':')[1].split(' ')[0];
        popoverElement.querySelector('input[name=Second]').value = startTimeDiv.textContent.split(':')[2].split(' ')[0];
        popoverElement.querySelector('select[name=AM-PM]').value = startTimeDiv.textContent.split(' ')[1];
    });

    document.addEventListener('click', function (e) {
        const popoverElement = document.querySelector('.popover');
        if (!startTimeDiv.contains(e.target) && (!popoverElement || !popoverElement.contains(e.target))) {
            const popoverInstance = bootstrap.Popover.getInstance(startTimeDiv);
            if (popoverInstance) {
                popoverInstance.hide();
            }
        }
    });
}

function cancelStartTimeEditor(event) {
    const popoverDom = event.target.closest('.popover');
    const timerPallet = document.getElementById(popoverDom.classList[1]);
    const startTimeDiv = timerPallet.querySelector('[name=start-time]');
    bootstrap.Popover.getInstance(startTimeDiv).hide();
}

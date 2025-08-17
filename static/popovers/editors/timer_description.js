
function attachTimerDescriptionEditor(parent) {
    const timerPallet = parent.closest('.timer-pallet');
    const timerDescriptionDiv = parent.querySelector('[name=timer-description]');

    const popover = new bootstrap.Popover(timerDescriptionDiv, {
        html: true,
        content: document.getElementById('timer-description-editor').innerHTML,
        customClass: timerPallet.id + " wide-popover",
        title: "Timer Description",
        placement: 'bottom',
        sanitize: false
    });

    timerDescriptionDiv.addEventListener('shown.bs.popover', () => {
        const popoverElement = document.querySelector('.popover');
        popoverElement.querySelector('#title').value = timerDescriptionDiv.querySelector('p[name=title]').textContent;
        popoverElement.querySelector('#speaker').value = timerDescriptionDiv.querySelector('p[name=speaker]').textContent;
        popoverElement.querySelector('#note').value = timerDescriptionDiv.querySelector('p[name=note]').textContent;
    });

    document.addEventListener('click', function (e) {
        const popoverElement = document.querySelector('.popover');
        if (!timerDescriptionDiv.contains(e.target) && (!popoverElement || !popoverElement.contains(e.target))) {
            const popoverInstance = bootstrap.Popover.getInstance(timerDescriptionDiv);
            if (popoverInstance) {
                popoverInstance.hide();
            }
        }
    });
}

function setTimerDescription(event) {
    const popoverDom = event.target.closest('.popover');
    const title = popoverDom.querySelector('#title').value;
    const speaker = popoverDom.querySelector('#speaker').value;
    const note = popoverDom.querySelector('#note').value;
    const timerPallet = document.getElementById(popoverDom.classList[1]);
    const timerDescriptionDiv = timerPallet.querySelector('[name=timer-description]');
    timerDescriptionDiv.querySelector('p[name=title]').textContent = title;
    timerDescriptionDiv.querySelector('p[name=speaker]').textContent = speaker;
    timerDescriptionDiv.querySelector('p[name=note]').textContent = note;
    bootstrap.Popover.getInstance(timerDescriptionDiv).hide();
}

function cancelTimerDescriptionEditor(event) {
    const popoverDom = event.target.closest('.popover');
    const timerPallet = document.getElementById(popoverDom.classList[1]);
    const timerDescriptionDiv = timerPallet.querySelector('[name=timer-description]');
    bootstrap.Popover.getInstance(timerDescriptionDiv).hide();
}

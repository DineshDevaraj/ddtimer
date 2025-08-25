
/**
 * This class implements chain of responsibilities pattern to run next timer
 */
class TimerOrchestrator {

    static postStopHandler(timer) {
        if (!timer.dom.nextElementSibling) {
            console.log(`There are no more timers.`);
            return;
        }
        timer.dom.querySelector('[name=Start]').classList.remove('d-none');
        timer.dom.querySelector('[name=Resume]').classList.add('d-none');
        timer.dom.querySelector('[name=Pause]').classList.add('d-none');
        TimerOrchestrator.runNextTimer(timer);
    }

    static runNextTimer(timer) {
        const nextTimer = TimerPallet.getByDom(timer.dom.nextElementSibling);
        nextTimer.dom.querySelector('[name=Pause]').classList.remove('d-none');
        nextTimer.dom.querySelector('[name=Resume]').classList.add('d-none');
        nextTimer.dom.querySelector('[name=Start]').classList.add('d-none');
        nextTimer.runThisTimer();
    }
}

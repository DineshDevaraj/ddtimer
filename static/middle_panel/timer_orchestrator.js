
/**
 * This class implements chain of responsibilities pattern to run next timer
 */
class TimerOrchestrator {

    static #runNextTimer = true;

    static runGivenTimer(timer) {
        if(TimerCard.timer) {
            TimerOrchestrator.#runNextTimer = false;
            TimerCard.stop();
            TimerOrchestrator.#runNextTimer = true;
            TimerCard.timer.dom.querySelector('[name=Start]').classList.remove('d-none');
            TimerCard.timer.dom.querySelector('[name=Resume]').classList.add('d-none');
            TimerCard.timer.dom.querySelector('[name=Pause]').classList.add('d-none');
        }
        TimerCard.inject(timer);
        TimerCard.start();
    }

    static postStopHandler(timer) {

        timer.dom.querySelector('[name=Pause]').classList.add('d-none');
        timer.dom.querySelector('[name=Resume]').classList.add('d-none');
        timer.dom.querySelector('[name=Start]').classList.remove('d-none');
                
        if (!timer.dom.nextElementSibling) {
            console.log(`There are no more timers.`);
            return;
        }

        if (false === TimerOrchestrator.#runNextTimer) {
            return; /* do nothing */
        }

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

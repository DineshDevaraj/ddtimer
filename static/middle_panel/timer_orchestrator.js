
/**
 * This class implements chain of responsibilities pattern to run next timer
 */
class TimerOrchestrator {
    static runNextTimer(timer) {
        if (timer.dom.nextElementSibling) {
            return TimerPallet.getByDom(timer.dom.nextElementSibling).runThisTimer();
        } else {
            console.log(`There are no more timers.`);
        }
    }
}

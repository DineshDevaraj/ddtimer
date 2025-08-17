
class TimerCard {

    static _timer = null;
    static _instance = null;
    static _runningStatus = false;
    static _remainingSeconds = 0;

    static _dom = document.querySelector('.timer-card');

    constructor() {
        if (TimerCard._instance)
            return TimerCard._instance;
        TimerCard._instance = this;
    }

    static inject(timer) {
        TimerCard._timer = timer;
    }

    static _forEachSecond() {
        const seconds = TimerCard._remainingSeconds % 60;
        const minutes = Math.floor(TimerCard._remainingSeconds / 60);
        const countdownDisplay = TimerCard._dom.querySelector('.countdown-display');
        countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (TimerCard._remainingSeconds-- <= 0) TimerCard.stop();
    }

    static start() {
        if (TimerCard._runningStatus)
            TimerCard.stop();
        TimerCard._runningStatus = true;
        console.log(`Timer ${TimerCard._timer.title} started.`);
        TimerCard._remainingSeconds = TimerCard._timer.durationInSeconds;
        TimerCard._intervalObject = setInterval(TimerCard._forEachSecond, 1000);
        TimerCard._forEachSecond();
    }

    static pause() {
        clearInterval(TimerCard._intervalObject);
        console.log(`Timer ${TimerCard._timer.title} paused.`);
        TimerCard._runningStatus = false;
    }

    static stop() {
        clearInterval(TimerCard._intervalObject);
        console.log(`Timer ${TimerCard._timer.title} stopped.`);
        TimerCard._runningStatus = false;
        TimerCard._remainingSeconds = 0;
    }
}

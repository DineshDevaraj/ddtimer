
class TimerCard {

    static #timer = null;
    static #instance = null;
    static #runningStatus = false;
    static #remainingSeconds = 0;

    static #dom = document.querySelector('.timer-card');

    constructor() {
        if (TimerCard.#instance)
            return TimerCard.#instance;
        TimerCard.#instance = this;
    }

    static inject(timer) {
        if (TimerCard.#runningStatus)
            TimerCard.stop();
        TimerCard.#dom.querySelector(".title").textContent = timer.title;
        TimerCard.#timer = timer;
    }

    static get timer() {
        return TimerCard.#timer;
    }

    static showMessage(message) {
        TimerCard.#dom.querySelector(".countdown-display").classList.remove("fs-1");
        TimerCard.#dom.querySelector(".timer-card > .message").textContent = message;
        TimerCard.#dom.querySelector(".message-overlay > .message").textContent = message;
    }

    static hideMessage() {
        TimerCard.#dom.querySelector(".countdown-display").classList.add("fs-1");
        TimerCard.#dom.querySelector(".message-overlay > .message").textContent = '';
        TimerCard.#dom.querySelector(".timer-card > .message").classList.remove("flash");
        TimerCard.#dom.querySelector(".timer-card > .message").textContent = '';
    }

    static toggleMessageFlash() {
        TimerCard.#dom.querySelector(".timer-card > .message").classList.toggle("flash");
    }

    static toggleTimerFlash() {
        TimerCard.#dom.querySelector(".countdown-display").classList.toggle("flash");
    }

    static toggleMessageOverlay() {
        TimerCard.#dom.querySelector('.message-overlay').classList.toggle('d-none');
    }

    static hideMessageOverlay() {
        TimerCard.#dom.querySelector('.message-overlay').classList.add('d-none');
    }

    static toggleBlackoutOverlay() {
        TimerCard.#dom.querySelector('.blackout-overlay').classList.toggle('d-none');
    }

    static _forEachSecond() {
        const hours = Math.floor(TimerCard.#remainingSeconds / 3600);
        const minutes = Math.floor((TimerCard.#remainingSeconds % 3600) / 60);
        const seconds = TimerCard.#remainingSeconds % 60;
        const countdownDisplay = TimerCard.#dom.querySelector('.countdown-display');
        countdownDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (TimerCard.#remainingSeconds-- <= 0) TimerCard.stop();
    }

    static start() {
        TimerCard.#runningStatus = true;
        console.log(`Timer ${TimerCard.#timer.title} started.`);
        TimerCard.#remainingSeconds = TimerCard.#timer.durationInSeconds;
        TimerCard._intervalObject = setInterval(TimerCard._forEachSecond, 1000);
        TimerCard._forEachSecond();
    }

    static pause() {
        clearInterval(TimerCard._intervalObject);
        console.log(`Timer ${TimerCard.#timer.title} paused.`);
        TimerCard.#runningStatus = false;
    }

    static resume() {
        TimerCard.#runningStatus = true;
        console.log(`Timer ${TimerCard.#timer.title} resumed.`);
        TimerCard._intervalObject = setInterval(TimerCard._forEachSecond, 1000);
        TimerCard._forEachSecond();
    }

    static stop() {
        TimerCard.#remainingSeconds = 0;
        TimerCard.#runningStatus = false;
        clearInterval(TimerCard._intervalObject);
        console.log(`Timer ${TimerCard.#timer.title} stopped.`);
        TimerOrchestrator.postStopHandler(TimerCard.#timer);
    }

    static reset() {
        TimerCard.stop();
        console.log(`Timer card is reset.`);
        TimerCard.#dom.querySelector('.countdown-display').textContent = '00:00:00';
        TimerCard.#dom.querySelector(".title").textContent = 'Title';
    }

}

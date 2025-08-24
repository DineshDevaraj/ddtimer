
class TimerCard {

    static #timer = null;
    static #instance = null;
    static #runningStatus = false;
    static #messageFlashStatus = false;
    static #timerFlashStatus = false;
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
        TimerCard.#dom.querySelector("[name=title]").textContent = timer.title;
        TimerCard.#timer = timer;
    }

    static showMessage(message) {
        TimerCard.#dom.querySelector(".countdown-display").classList.remove("fs-1");
        TimerCard.#dom.querySelector("[name=message]").textContent = message;
    }

    static hideMessage() {
        TimerCard.#dom.querySelector("[name=message]").textContent = '';
        TimerCard.#dom.querySelector(".countdown-display").classList.add("fs-1");
        TimerCard.stopMessageFlash();
    }

    static startMessageFlash() {
        TimerCard.#messageFlashStatus = true;
        const message = TimerCard.#dom.querySelector("[name=message]");
        message.classList.add("flash");
    }

    static stopMessageFlash() {
        TimerCard.#messageFlashStatus = false;
        const message = TimerCard.#dom.querySelector("[name=message]");
        message.classList.remove("flash");
    }

    static toggleMessageFlash() {
        if (TimerCard.#messageFlashStatus) {
            TimerCard.stopMessageFlash();
        } else {
            TimerCard.startMessageFlash();
        }
    }

    static toggleTimerFlash() {
        const timerDisplay = TimerCard.#dom.querySelector(".countdown-display");
        if (TimerCard.#timerFlashStatus) {
            TimerCard.#timerFlashStatus = false;
            timerDisplay.classList.remove("flash");
        } else {
            TimerCard.#timerFlashStatus = true;
            timerDisplay.classList.add("flash");
        }
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

    static stop() {
        clearInterval(TimerCard._intervalObject);
        console.log(`Timer ${TimerCard.#timer.title} stopped.`);
        TimerCard.#runningStatus = false;
        TimerCard.#remainingSeconds = 0;
    }
}

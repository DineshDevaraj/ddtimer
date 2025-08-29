
class Duration {
    #hours;
    #minutes;
    #seconds;

    constructor(hours, minutes, seconds) {
        this.#hours = hours;
        this.#minutes = minutes;
        this.#seconds = seconds;
    }

    get hours() {
        return this.#hours;
    }

    get minutes() {
        return this.#minutes;
    }

    get seconds() {
        return this.#seconds;
    }

    toDate() {
        const date = new Date();
        date.setHours(this.#hours);
        date.setMinutes(this.#minutes);
        date.setSeconds(this.#seconds);
        return date;
    }
}

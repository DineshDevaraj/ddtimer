
class Time {

    #hour;
    #minute;
    #second;
    #meridian;

    constructor(hour, minute, second, meridian) {
        if (typeof hour === 'string')
            hour = parseInt(hour, 10);
        this.#hour = hour;

        if (typeof minute === 'string')
            minute = parseInt(minute, 10);
        this.#minute = minute;

        if (typeof second === 'string')
            second = parseInt(second, 10);
        this.#second = second;

        this.#meridian = meridian;
    }

    get hour() {
        return this.#hour;
    }

    get minute() {
        return this.#minute;
    }

    get second() {
        return this.#second;
    }

    get meridian() {
        return this.#meridian;
    }

    toDate() {
        const now = new Date();
        const startTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            this.#meridian === 'PM' ? (parseInt(this.#hour, 10) % 12) + 12 : parseInt(this.#hour, 10) % 12,
            parseInt(this.#minute, 10),
            parseInt(this.#second, 10)
        );
        return startTime;
    }

    toString() {
        return `${String(this.#hour).padStart(2, '0')}:${String(this.#minute).padStart(2, '0')}:` +
            `${String(this.#second).padStart(2, '0')} ${this.#meridian}`;
    }

    aheadOfCurrentTime() {
        return this.toDate() > new Date()
    }

    lagsBehindCurrentTime() {
        return this.toDate() < new Date()
    }

    timeLeft() {
        const diff = Math.abs(this.toDate() - new Date());
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        const meridian = hours >= 12 ? 'PM' : 'AM';
        return new Time(hours % 12, minutes, seconds, meridian);
    }
}

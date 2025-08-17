
class Time {
    constructor(hour, minute, meridian) {
        if (typeof hour === 'string')
            hour = parseInt(hour, 10);
        this.hour = hour;

        if (typeof minute === 'string')
            minute = parseInt(minute, 10);
        this.minute = minute;

        this.meridian = meridian;
    }

    toDate() {
        const now = new Date();
        const startTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            this.meridian === 'PM' ? (parseInt(this.hour, 10) % 12) + 12 : parseInt(this.hour, 10) % 12,
            parseInt(this.minute, 10),
            0,
            0
        );
        return startTime;
    }

    toString() {
        return `${this.hour}:${this.minute} ${this.meridian}`;
    }

    aheadOfCurrentTime() {
        return this.toDate() > new Date()
    }

    lagsBehindCurrentTime() {
        return this.toDate() < new Date()
    }

    timeLeft() {
        const diff = Math.abs(this.toDate() - new Date());
        const hour = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const meridian = hour >= 12 ? 'PM' : 'AM';
        return new Time(hour % 12, minutes, meridian);
    }
}

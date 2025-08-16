
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

    toString() {
        return `${this.hour}:${this.minute} ${this.meridian}`;
    }

    pastCurrentTime() {
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
        if(startTime < now) {
            return false;
        }
        return true;
    }
}

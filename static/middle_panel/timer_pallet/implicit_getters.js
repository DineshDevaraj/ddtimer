
class ImplicitGetters extends ExplicitGetters {

    constructor() {
        super();
    }

    get dom() {
        return this._dom;
    }

    get number() {
        return this._number;
    }

    get startTime() {
        const dom = this._dom.querySelector('[name=start-time]');
        const [time, meridian] = dom.textContent.split(' ');
        const [hour, minute, second] = time.split(':');
        return new Time(hour, minute, second, meridian);
    }

    get duration() {
        const dom = this._dom.querySelector('[name=timer-duration]');
        const [hours, minutes, seconds] = dom.textContent.split(':');
        return new Duration(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
    }

    get durationInSeconds() {
        const dom = this._dom.querySelector('[name=timer-duration]');
        const [hours, minutes, seconds] = dom.textContent.split(':');
        return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    }

    get endTime() {
        const e = new Date(this.startTime.toDate());
        e.setHours(e.getHours() + this.duration.hours);
        e.setMinutes(e.getMinutes() + this.duration.minutes);
        e.setSeconds(e.getSeconds() + this.duration.seconds);
        return new Time(e.getHours()%12, e.getMinutes(), e.getSeconds(), e.getHours() >= 12 ? 'PM' : 'AM');
    }

    get title() {
        const dom = this._dom.querySelector('[name=timer-description]');
        return dom.querySelector('[name=title]').textContent.trim();
    }

    get description() {
        const dom = this._dom.querySelector('[name=timer-description]');
        const title = dom.querySelector('[name=title]').textContent.trim();
        const speaker = dom.querySelector('[name=speaker]').textContent.trim();
        const note = dom.querySelector('[name=note]').textContent.trim();
        return new Description(title, speaker, note);
    }
}
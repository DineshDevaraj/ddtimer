
class TimerPallet {

    #dom = null;
    #number = 0;
    static _count = 1;

    constructor() {
        TimerPallet._count++;
        this.#number = TimerPallet._count;
    }

    get number() {
        return this.#number;
    }

    get startTime() {
        const dom = this.#dom.querySelector('[name=start-time]');
        const [time, meridian] = dom.textContent.split(' ');
        const [hour, minute] = time.split(':');
        return new Time(hour, minute, meridian);
    }

    get durationInSeconds() {
        const dom = this.#dom.querySelector('[name=timer-duration]');
        const [minutes, seconds] = dom.textContent.split(':');
        return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    }

    get title() {
        const dom = this.#dom.querySelector('[name=timer-description]');
        return dom.querySelector('[name=title]').textContent.trim();
    }

    get description() {
        const dom = this.#dom.querySelector('[name=timer-description]');
        const title = dom.querySelector('[name=title]').textContent.trim();
        const speaker = dom.querySelector('[name=speaker]').textContent.trim();
        const note = dom.querySelector('[name=note]').textContent.trim();
        return new Description(title, speaker, note);
    }

    runThisTimer(event) {
        this.#dom = event.target.closest('.timer-pallet');
        if (!this.startTime.pastCurrentTime()) {
            console.log("Time has not yet arrived.");
            return;
        }
        TimerCard.inject(this);
        TimerCard.start();
    }
}

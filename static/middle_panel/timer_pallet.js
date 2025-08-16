
class TimerPallet {

    #dom = null;

    static singleton(timer_id) {
        const obj = TimerPallet.singleton_pool.get(timer_id);
        if (!obj) {
            obj = new TimerPallet();
            TimerPallet.singleton_pool.set(timer_id, obj);
        }
        return obj;
    }

    get startTime() {
        const dom = this.#dom.querySelector('[name=start-time]')
        const [time, meridian] = dom.textContent.split(' ');
        const [hour, minute] = time.split(':');
        return new Time(hour, minute, meridian);
    }

    get durationInSeconds() {
        const dom = this.#dom.querySelector('[name=duration]')
        const [minutes, seconds] = dom.textContent.split(':');
        return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    }

    get title() {
        const dom = this.#dom.querySelector('[name=description]')
        return dom.querySelector('[name=title]').textContent.trim();
    }

    get description() {
        const dom = this.#dom.querySelector('[name=description]')
        const title = dom.querySelector('[name=title]').textContent.trim();
        const speaker = dom.querySelector('[name=speaker]').textContent.trim();
        const note = dom.querySelector('[name=note]').textContent.trim();
        return new Description(title, speaker, note);
    }

    runThisTimer(event) {
        this.#dom = event.target.querySelector('.timer-pallet');
        if (!this.startTime.pastCurrentTime()) {
            console.log("Time has not yet arrived.");
            return;
        }
        const timerCard = new TimerCard();
        timerCard.inject(this);
        timerCard.start();
    }
}

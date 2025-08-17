
class TimerPallet {

    #dom = null;
    #number = 0;

    static #count = 1;
    static #objectPool = new Map();
    static #disableConstructor = true;

    static #first = TimerPallet.#getFirstTimerPallet()

    constructor() {
        if (TimerPallet.#disableConstructor) {
            throw new Error("Use TimerPallet.clone() to create a new instance.");
        }
    }

    static clone() {
        TimerPallet.#count++;

        const newInstance = TimerPallet.#getInstance();
        newInstance.#dom = TimerPallet.#first.dom.cloneNode(true);
        newInstance.#dom.id = `timer-${TimerPallet.#count}`;
        TimerPallet.#objectPool.set(newInstance.#dom.id, newInstance);
        newInstance.#number = TimerPallet.#count;

        return newInstance;
    }

    static #getInstance() {
        TimerPallet.#disableConstructor = false;
        const newInstance = new TimerPallet();
        TimerPallet.#disableConstructor = true;
        return newInstance; 
    }

    static #getFirstTimerPallet() {
        const newInstance = TimerPallet.#getInstance();
        const dom = document.getElementById("timer-1");
        if (!dom) {
            throw new Error("DOM element with id 'timer-1' not found.");
        }
        TimerPallet.#objectPool.set(dom.id, newInstance);
        newInstance.#number = 1;
        newInstance.#dom = dom;
        return newInstance;
    }

    static getByDom(dom) {
        dom = dom.closest('.timer-pallet');
        if (!dom) {
            throw new Error("Given DOM should be of <div class='timer-pallet'> or its child elements.");
        }

        if (!dom.id) {
            throw new Error("Given DOM should have a valid non-null Id.");
        }

        if (TimerPallet.#objectPool.has(dom.id)) {
            return TimerPallet.#objectPool.get(dom.id);
        }

        throw new Error("Given DOM is not associated with any TimerPallet instance.");
    }

    static getByTimerId(timerId) {
        if (TimerPallet.#objectPool.has(timerId)) {
            return TimerPallet.#objectPool.get(timerId);
        }
        throw new Error(`No TimerPallet found with Id: ${timerId}`);
    }

    get dom() {
        return this.#dom;
    }

    get number() {
        return this.#number;
    }

    get startTime() {
        const dom = this.#dom.querySelector('[name=start-time]');
        const [time, meridian] = dom.textContent.split(' ');
        const [hour, minute, second] = time.split(':');
        return new Time(hour, minute, second, meridian);
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

    runThisTimer() {
        TimerCard.inject(this);
        TimerCard.start();
    }
}

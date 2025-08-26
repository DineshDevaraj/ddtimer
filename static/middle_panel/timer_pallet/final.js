
class TimerPallet extends UserInterface {

    static _first = TimerPallet._getFirstInstance();

    constructor() {
        super();
    }

    static clone() {
        TimerPalletBase._count++;

        const newInstance = TimerPallet._getInstance();
        newInstance._dom = TimerPallet._first.dom.cloneNode(true);
        newInstance._dom.id = `timer-${TimerPalletBase._count}`;
        TimerPalletBase._objectPool.set(newInstance._dom.id, newInstance);
        newInstance._number = TimerPalletBase._count;

        return newInstance;
    }

    static _getInstance() {
        TimerPalletBase._disableConstructor = false;
        const newInstance = new TimerPallet();
        TimerPalletBase._disableConstructor = true;
        return newInstance; 
    }

    static _getFirstInstance() {
        const newInstance = TimerPallet._getInstance();
        const dom = document.getElementById("timer-1");
        if (!dom) {
            throw new Error("DOM element with id 'timer-1' not found.");
        }
        TimerPalletBase._objectPool.set(dom.id, newInstance);
        newInstance._number = 1;
        newInstance._dom = dom;
        return newInstance;
    }

    runThisTimer() {
        TimerCard.inject(this);
        TimerCard.start();
    }
}

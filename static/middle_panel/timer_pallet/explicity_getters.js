
class ExplicitGetters extends TimerPalletBase {
    
    constructor() {
        super();
    }

    static getByDom(dom) {
        dom = dom.closest('.timer-pallet');
        if (!dom) {
            throw new Error("Given DOM should be of <div class='timer-pallet'> or its child elements.");
        }

        if (!dom.id) {
            throw new Error("Given DOM should have a valid non-null Id.");
        }

        if (TimerPalletBase._objectPool.has(dom.id)) {
            return TimerPalletBase._objectPool.get(dom.id);
        }

        throw new Error("Given DOM is not associated with any TimerPallet instance.");
    }

    static getByTimerId(timerId) {
        if (TimerPalletBase._objectPool.has(timerId)) {
            return TimerPalletBase._objectPool.get(timerId);
        }
        throw new Error(`No TimerPalletBase found with Id: ${timerId}`);
    }
}

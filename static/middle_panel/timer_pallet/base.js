
class TimerPalletBase {

    _dom = null;
    _number = 0;

    static _count = 1;
    static _objectPool = new Map();
    static _disableConstructor = true;

    constructor() {
        if (TimerPalletBase._disableConstructor) {
            throw new Error("Use TimerPallet.clone() to create a new instance.");
        }
    }
}

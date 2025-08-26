
class TimerPalletBase {

    static _count = 1;
    static _objectPool = new Map();
    static _disableConstructor = true;

    constructor() {
        if (TimerPalletBase._disableConstructor) {
            throw new Error("Use TimerPallet.clone() to create a new instance.");
        }
    }
}

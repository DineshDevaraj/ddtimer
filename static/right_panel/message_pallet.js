
class MessagePallet {

    #dom = null;
    #number = 0;

    static #count = 1;
    static #objectPool = new Map();
    static #disableConstructor = true;

    static #first = MessagePallet.#getFirstInstance()

    constructor() {
        if (MessagePallet.#disableConstructor) {
            throw new Error("Use TimerPallet.clone() to create a new instance.");
        }
    }

    static clone() {
        MessagePallet.#count++;

        const newInstance = MessagePallet.#getInstance();
        newInstance.#dom = MessagePallet.#first.dom.cloneNode(true);
        newInstance.#dom.id = `timer-${MessagePallet.#count}`;
        MessagePallet.#objectPool.set(newInstance.#dom.id, newInstance);
        newInstance.#number = MessagePallet.#count;

        return newInstance;
    }

    static #getInstance() {
        MessagePallet.#disableConstructor = false;
        const newInstance = new MessagePallet();
        MessagePallet.#disableConstructor = true;
        return newInstance; 
    }

    static #getFirstInstance() {
        const newInstance = MessagePallet.#getInstance();
        const dom = document.getElementById("message-1");
        if (!dom) {
            throw new Error("DOM element with id 'message-1' not found.");
        }
        MessagePallet.#objectPool.set(dom.id, newInstance);
        newInstance.#number = 1;
        newInstance.#dom = dom;
        return newInstance;
    }

    static getByDom(dom) {
        dom = dom.closest('.message-pallet');
        if (!dom) {
            throw new Error("Given DOM should be of <div class='message-pallet'> or its child elements.");
        }

        if (!dom.id) {
            throw new Error("Given DOM should have a valid non-null Id.");
        }

        if (MessagePallet.#objectPool.has(dom.id)) {
            return MessagePallet.#objectPool.get(dom.id);
        }

        throw new Error("Given DOM is not associated with any MessagePallet instance.");
    }

    static getByMessageId(messageId) {
        if (MessagePallet.#objectPool.has(messageId)) {
            return MessagePallet.#objectPool.get(messageId);
        }
        throw new Error(`No MessagePallet found with Id: ${messageId}`);
    }

    get dom() {
        return this.#dom;
    }

    get number() {
        return this.#number;
    }
}

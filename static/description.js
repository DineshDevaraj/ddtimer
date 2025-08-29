
class Description {

    #title = '';
    #speaker = '';
    #note = '';

    constructor(title, speaker, note) {
        this.#title = title;
        this.#speaker = speaker;
        this.#note = note;
    }

    toString() {
        return `${this.#title} - ${this.#speaker}: ${this.#note}`;
    }
}

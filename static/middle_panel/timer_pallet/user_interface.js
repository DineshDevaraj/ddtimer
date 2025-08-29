
class UserInterface extends ImplicitGetters {
    constructor() {
        super();
    }

    pause(event) {
        const timerDom = event.target.closest('.timer-pallet');
        timerDom.querySelector('[name=Resume]').classList.remove('d-none');
        timerDom.querySelector('[name=Pause]').classList.add('d-none');
        TimerCard.pause();
    }

    resume(event) {
        const timerDom = event.target.closest('.timer-pallet');
        timerDom.querySelector('[name=Pause]').classList.remove('d-none');
        timerDom.querySelector('[name=Resume]').classList.add('d-none');
        TimerCard.resume();
    }

    delete(event) {
        event.target.closest('.timer-pallet').remove();
        if (TimerCard.timer && TimerCard.timer.dom === event.target.closest('.timer-pallet'))
            TimerCard.reset();
    }
}

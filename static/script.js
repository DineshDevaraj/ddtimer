
let remainingTime = 15;
let intervalObject = null;
let timerRunningStatus = false;

function updateCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('current-time').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
}
setInterval(updateCurrentTime, 1000);
updateCurrentTime();

function forEachSecond() {
    remainingTime--;
    const seconds = remainingTime % 60;
    const minutes = Math.floor(remainingTime / 60);
    const countdownDisplay = document.querySelector('.countdown-display');
    countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (remainingTime <= 0) {
        clearInterval(intervalObject);
        timerRunningStatus = false;
        remainingTime = 15;
    }
}

function runCountdown(event) {
    if (timerRunningStatus) {
        console.log("Timer is already running.");
        return;
    }
    intervalObject = setInterval(forEachSecond, 1000);
    timerRunningStatus = true;
    forEachSecond();
}

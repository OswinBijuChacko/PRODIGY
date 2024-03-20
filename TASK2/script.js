let timer;
let isRunning = false;
let startTime;
let lapNumber = 1;

function startStop() {
    const startStopButton = document.querySelector('.controls button:nth-child(1)');
    const lapButton = document.querySelector('.controls button:nth-child(3)');

    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        lapButton.disabled = true;
    } else {
        startTime = Date.now() - (lapNumber > 1 ? lapNumber - 1 : 0);
        timer = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
        lapButton.disabled = false;
    }

    isRunning = !isRunning;
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function reset() {
    clearInterval(timer);
    document.getElementById('display').textContent = '00:00:00';
    lapNumber = 1;
    const startStopButton = document.querySelector('.controls button:nth-child(1)');
    const lapButton = document.querySelector('.controls button:nth-child(3)');
    startStopButton.textContent = 'Start';
    lapButton.disabled = true;
    clearLapList();
    isRunning = false;
}

function lap() {
    const lapList = document.getElementById('lapList');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber}: ${document.getElementById('display').textContent}`;
    lapItem.classList.add('lap-item');
    lapList.appendChild(lapItem);
    lapNumber++;
}

function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        ':' +
        String(milliseconds).padStart(2, '0')
    );
}

function clearLapList() {
    const lapList = document.getElementById('lapList');
    while (lapList.firstChild) {
        lapList.removeChild(lapList.firstChild);
    }
}

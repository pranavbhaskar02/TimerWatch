document.addEventListener('DOMContentLoaded', () => {
const stopwatchDisplay = document.getElementById('stopwatch-display');
const countdownDisplay = document.getElementById('countdown-display');

const playPauseBtn = document.getElementById('play-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const editBtn = document.getElementById('edit-btn');

let interval = null;
let lastUpdateTime = 0;

let stopwatchTime = 0;
let countdownStartTime = 5*60*1000;
let countdownTime = countdownStartTime;

function formatTime(ms){
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000)/60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000)/10);


    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function updateDisplays(){
    stopwatchDisplay.textContent = formatTime(stopwatchTime);
    countdownDisplay.textContent = formatTime(countdownTime);
}

function tick(){
    const now = Date.now();
    const delta = now - lastUpdateTime;
    lastUpdateTime = now;

    stopwatchTime += delta;
    if(countdownTime > 0){
        countdownTime -= delta;
        if (countdownTime < 0){
            countdownTime = 0;
        }
    }
    updateDisplays();
}

playPauseBtn.addEventListener('click', () => {
    if(!interval){
        lastUpdateTime = Date.now();
        interval = setInterval(tick, 10);

    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playPauseBtn.setAttribute('data-tooltip', 'Pause');
    playPauseBtn.classList.add('paused');
    } else {
        clearInterval(interval);
        interval = null;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playPauseBtn.setAttribute('data-tooltip', 'Play');
        playPauseBtn.classList.remove('paused');
    }
}
);

resetBtn.addEventListener('click', () => {
    if(interval){
        clearInterval(interval);
        interval = null;
    }
    stopwatchTime = 0;
    countdownTime = countdownStartTime;
    updateDisplays();

    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playPauseBtn.setAttribute('data-tooltip', 'Play');
    playPauseBtn.classList.remove('paused');
}
);

editBtn.addEventListener('click', () => {
    const input = prompt("HH:MM:SS", "00:00:00");
    if (input){
        const parts = input.split(':');
        if (parts.length===3){
            const h = parseInt(parts[0]) || 0;
            const m = parseInt(parts[1]) || 0;
            const s = parseInt(parts[2]) || 0;
            countdownStartTime = (h * 3600000) + (m * 60000) + (s * 10000);

            if(!interval) {
                countdownTime = countdownStartTime;
                updateDisplays();
            }
        } else {
            alert("invalid format! Please use HH:MM:SS");
        }
    }
});

updateDisplays();
});
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var message = 'Game Over'

function countdown() {
    var timePenalty = 120;

    var timeInterval = setInterval(function () {
        if (timePenalty > 1) {
            timerEl.textContent = timePenalty + ' seconds remaining';
            timePenalty--;
        }
        else if (timePenalty === 1) {
            timerEl.textContent = timePenalty + ' second remaining';
            timePenalty--;
        }
        else {
            timerEl.textContent = ''
            clearInterval(timeInterval);
            displayMessage();
        }
    }, 1000);
}

countdown()
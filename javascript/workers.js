let counterId = -1;
function timerCount() {
    if (counterId > 10) {
        clearTimeout(counterId);
        return;
    }
    postMessage(counterId);
    counterId = setTimeout(timerCount, 1000);
}

timerCount();
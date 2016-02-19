//// Write your Javascript code.
//function startTimer(duration, display) {
//    var timer = duration, minutes, seconds;

//    callTimerTick = function () {
//        minutes = parseInt(timer / 60, 10);
//        seconds = parseInt(timer % 60, 10);

//        minutes = minutes < 10 ? "0" + minutes : minutes;
//        seconds = seconds < 10 ? "0" + seconds : seconds;

//        display.text(minutes + ":" + seconds);

//        if (--timer < 0) {
//            timer = duration;
//        }
//        setTimeout(callTimerTick, 1000)
//    };
//    callTimerTick();
//}
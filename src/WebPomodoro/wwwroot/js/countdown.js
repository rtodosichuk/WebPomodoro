var CountDown = (function () {
    function CountDown(canvasElm, fromMin, callback) {
        this.canvas = canvasElm;
        this.fromMinutes = fromMin;
        this.callback = callback;
    }
    CountDown.prototype.GetEndTime = function (fromMin) {
        var endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + fromMin);
        return endTime;
    };
    CountDown.prototype.GetRemaining = function (endTime) {
        var curTime = new Date();
        var runTime = Number(endTime) - Number(curTime);
        return runTime;
    };
    CountDown.prototype.ConvertSecondsToTime = function (seconds) {
        // Convert milliseconds remaining to minute and seconds remaining. 
        var ticks = seconds / 1000;
        var hh = Math.floor(ticks / 3600);
        var mm = Math.floor((ticks % 3600) / 60);
        var ss = Math.floor(ticks % 60);
        //return( pad(hh, 2) + ":" + pad(mm, 2) + ":" + pad(ss, 2) );
        return (this.Pad(mm, 2) + ":" + this.Pad(ss, 2));
    };
    CountDown.prototype.Pad = function (diget, width) {
        var strDiget = diget + '';
        return strDiget.length >= width ? strDiget : new Array(width - strDiget.length + 1).join('0') + strDiget;
    };
    CountDown.prototype.DrawCountDown = function () {
        var secondsLeft = this.GetRemaining(this.endTime);
        if (secondsLeft < 0)
            secondsLeft = 0;
        var r = secondsLeft * 2 / (this.fromMinutes * 60 * 1000);
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //Draw shadow for time remaining circle.
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#fafafa";
        ctx.beginPath();
        ctx.arc(100, 100, 80, 0, 2 * Math.PI);
        ctx.stroke();
        //Draw outer time remaining circle.
        ctx.lineWidth = 10;
        //ctx.strokeStyle = "#880000";
        ctx.strokeStyle = "#286090";
        ctx.beginPath();
        ctx.arc(100, 100, 80, .5 * Math.PI, (r + .5) * Math.PI);
        ctx.stroke();
        ////Draw outer border circle.
        //ctx.lineWidth = 1;
        //ctx.strokeStyle = "#286090";
        //ctx.beginPath();
        //ctx.arc(100, 100, 88, 0, 2 * Math.PI);
        //ctx.stroke();
        ////Draw inner circle.
        //ctx.fillStyle = "#286090";
        //ctx.beginPath();
        //ctx.arc(100, 100, 73, 0, 2 * Math.PI);
        //ctx.closePath();
        //ctx.fill();
        //Draw time ramaining text.
        ctx.lineWidth = 1;
        ctx.fillStyle = "#286090";
        ctx.font = "bold 38px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(this.ConvertSecondsToTime(secondsLeft), 100, 115);
        return secondsLeft;
    };
    CountDown.prototype.StartTimer = function (_this) {
        var tLeft = _this.DrawCountDown();
        if (Number(tLeft) <= 0) {
            clearInterval(_this.timerH);
            if (typeof (_this.callback) === "function")
                _this.callback();
        }
    };
    CountDown.prototype.Start = function () {
        var _this = this;
        // get End Time
        this.endTime = this.GetEndTime(this.fromMinutes);
        // If timer is running then stop it.
        if (this.timerH) {
            clearInterval(this.timerH);
        }
        // Start timer.
        this.timerH = setInterval(function () { return _this.StartTimer(_this); }, 250);
    };
    CountDown.prototype.Stop = function () {
        clearInterval(this.timerH);
    };
    return CountDown;
})();

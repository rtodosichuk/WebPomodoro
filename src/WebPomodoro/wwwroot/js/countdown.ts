class CountDown {
    private endTime: Date; 
    private timerH: number;
        
    fromMinutes: number;
    canvas: any;
    callback: Function;
    constructor(canvasElm: any, fromMin: number, callback: Function) {
        this.canvas = canvasElm;
        this.fromMinutes = fromMin;
        this.callback = callback;
    }
    GetEndTime(fromMin: number): Date {
        var endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + fromMin);
        return endTime;
    }
    GetRemaining(endTime: Date): number {
        var curTime = new Date();
        var runTime = Number(endTime) - Number(curTime);
        return runTime;
    }
    ConvertSecondsToTime(seconds) :string {
        // Convert milliseconds remaining to minute and seconds remaining. 
        var ticks = seconds / 1000;
        var hh = Math.floor(ticks / 3600);
        var mm = Math.floor((ticks % 3600) / 60);
        var ss = Math.floor(ticks % 60);

        //return( pad(hh, 2) + ":" + pad(mm, 2) + ":" + pad(ss, 2) );
        return (this.Pad(mm, 2) + ":" + this.Pad(ss, 2));
    }
    Pad(diget: number, width: number) {
        var strDiget: string = diget + '';
        return strDiget.length >= width ? strDiget : new Array(width - strDiget.length + 1).join('0') + strDiget;
    }
    DrawCountDown(): number {
        var secondsLeft = this.GetRemaining(this.endTime);
        if (secondsLeft < 0)
            secondsLeft = 0;

        var r = secondsLeft * 2 / (this.fromMinutes * 60 * 1000);

        var ctx = this.canvas.getContext("2d");

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Draw outer time remaining circle.
        ctx.lineWidth = 10;
        //ctx.strokeStyle = "#880000";
        ctx.strokeStyle = "#286090";
        ctx.beginPath();
        ctx.arc(100, 100, 80, .5 * Math.PI, (r + .5) * Math.PI);
        ctx.stroke();
    
        //Draw outer border circle.
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#286090";
        ctx.beginPath();
        ctx.arc(100, 100, 88, 0, 2 * Math.PI);
        ctx.stroke();

        //Draw inner circle.
        ctx.fillStyle = "#286090";
        ctx.beginPath();
        ctx.arc(100, 100, 73, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        //Draw time ramaining text.
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FFFFFF";
        ctx.font = "30px Helvetica";
        ctx.textAlign = 'center';
        ctx.strokeText(this.ConvertSecondsToTime(secondsLeft), 100, 110);

        return secondsLeft;
    }
    StartTimer(_this: CountDown) {
        var tLeft = _this.DrawCountDown();

        if (Number(tLeft) <= 0) {
            clearInterval(_this.timerH);
            if (typeof (_this.callback) === "function")
                _this.callback();
        }
    }
    Start() {
        // get End Time
        this.endTime = this.GetEndTime(this.fromMinutes);
    
        // If timer is running then stop it.
        if (this.timerH) {
            clearInterval(this.timerH);
        }
    
        // Start timer.
        this.timerH = setInterval(() => this.StartTimer(this), 250);
    }
    Stop() {
        clearInterval(this.timerH);
    }
}
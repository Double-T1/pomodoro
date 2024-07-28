import Alpine from "alpinejs";

Alpine.data("timer", () => ({
  mode: "Focus",
  editting: false,
  running: false,
  totalSeconds: 25*60,
  curTime: "25:00", //needs to be a special class of its own
  intervalId: 0,
  startTimer() {
    let mins = Number(this.curTime.slice(0,2));
    let secs = Number(this.curTime.slice(3,5));
    this.running = true;
    this.intervalId = setInterval(() => {
      secs -= 1;
      if (secs < 0) {
        mins -= 1;
        secs = 59;
      }    
      if (mins < 0) {
        clearInterval(countDown);
      } else {
        this.curTime = this.convert(mins) + ":" + this.convert(secs);
      } 
    },1000);
  },
  pauseTimer() {
    this.running = false;
    clearInterval(this.intervalId)
  },
  startEdit() {
    this.editting = true;
  },
  saveEdit() {
    if (!this.formatCheck(this.curTime)) {
      this.curTime = "25:00";
      alert("please follow the format of xx:xx, x being a digit");
    } else {
      this.editting = false;
    }
  },
  convert(num) {
    return String(num).padStart(2,"0");
  },
  formatCheck(time) {
    return (/^\d{2}:[0-5]\d$/).test(time);
  }
}))

Alpine.start();
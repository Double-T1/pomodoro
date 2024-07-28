import Alpine from "alpinejs";

Alpine.data("pomodoro", () => ({
  setTime: "25:00",
  shownTime: "00:00",
  totalSeconds: 0,
  isRunning: false,
  isEditing: false,
  intervalId: null,

  init() {
    this.totalSeconds = this.toSecs(this.setTime);
    this.shownTime = this.setTime;
  },

  toSecs(shownTime) {
    const mins = Number(shownTime.slice(0,2));
    const secs = Number(shownTime.slice(3));
    return mins*60 + secs;
  },

  toFormat(seconds) {
    const mins = Math.floor(seconds/60).toString().padStart(2,'0');
    const secs = (seconds%60).toString().padStart(2,"0");
    return mins + ":" + secs;
  },

  toggleRun() {
    if (!this.isEditing) {
      this.isRunning = !this.isRunning;
      if (this.isRunning) {
        this.runTimer();
      } else {
        this.pauseTimer();
      }
    } else {
      alert("Can't run the timer while editing. Please finish editing first")
    }
  },

  toggleEdit() {
    if (!this.isRunning) {
      if (!this.isEditing) {
        this.isEditing = true;
        this.$nextTick(() => { this.$refs.input.focus(); })
      } else if (this.updateTimer()) {
        this.isEditing = false;
      }
    } else {
      alert("Can't edit the timer while running. Please pause the timer first")
    }
  },

  runTimer() {
    this.totalSeconds = this.toSecs(this.shownTime);
    this.intervalId = setInterval(()=> {
      if (this.totalSeconds === 0) {
        clearInterval(this.intervalId);
        this.toggleRun();
      } else {
        this.totalSeconds -= 1;
        this.shownTime = this.toFormat(this.totalSeconds);
      }
    },1000)
  },

  pauseTimer() {
    clearInterval(this.intervalId);
  }, 

  updateTimer() {
    const newTime = this.shownTime.trim();
    const pattern = /^[0-5]\d:[0-5]\d$/;
    if (pattern.test(newTime)) {
      this.setTime = newTime;
      this.shownTime = this.setTime;
      return true;
    }

    this.shownTime = this.setTime;
    alert("Please insert the desired time in the format of \'MM:SS\'. At most 59:59.");
    return false;
  },

  resetTimer() {
    this.shownTime = this.setTime;
  }
}));


Alpine.start();
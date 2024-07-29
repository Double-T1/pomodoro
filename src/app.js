import Alpine from "alpinejs";

Alpine.data("pomodoro", () => ({
  setTime: "00:10",
  totalSeconds: 10,
  shownTime: "00:00",
  curSeconds: 0,
  isRunning: false,
  isEditing: false,
  intervalId: null,

  init() {
    this.curSeconds = this.totalSeconds;
    this.shownTime = this.setTime;
  },

  toSecs(timeFormat) {
    const mins = Number(timeFormat.slice(0,2));
    const secs = Number(timeFormat.slice(3));
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
        this.$nextTick(() => { this.$refs.input.focus();  })
      } else if (this.updateTimer()) {
        this.isEditing = false;
      }
    } else {
      alert("Can't edit the timer while running. Please pause the timer first")
    }
  },

  async runTimer() {
    this.curSeconds = this.toSecs(this.shownTime);
    this.loadBar(this.curSeconds);
    //this.$refs.loadingBar.style.setProperty("animation", `load ${this.curSeconds}s linear`);
    this.intervalId = setInterval(()=> {
      if (this.curSeconds === 0) {
        clearInterval(this.intervalId);
        alert("Times up!! nice job focusing on your goal!")
        // how do i make the api call first ?
        // currently this doesn't work
        this.resetTimer();
        this.toggleRun();
        this.loadBar(this.totalSeconds);
      } else {
        this.curSeconds -= 1;
        this.shownTime = this.toFormat(this.curSeconds);
        this.loadBar(this.curSeconds);
      }
    },1000)
  },

  pauseTimer() {
    clearInterval(this.intervalId);
    this.$refs.loadingBar.style.removeProperty("animation");
    this.loadBar(this.curSeconds);
  }, 

  updateTimer() {
    const newTime = this.shownTime.trim();
    const pattern = /^[0-5]\d:[0-5]\d$/;
    if (pattern.test(newTime)) {
      this.setTime = newTime;
      this.shownTime = this.setTime;
      this.totalSeconds = this.toSecs(this.setTime);
      this.curSeconds = this.totalSeconds;
      this.loadBar(this.curSeconds);
      return true;
    }

    this.shownTime = this.setTime;
    alert("Please insert the desired time in the format of \'MM:SS\'. At most 59:59.");
    return false;
  },

  resetTimer() {
    this.shownTime = this.setTime;
  },

  loadBar(curSecs) {
    const secPercent = (1-(curSecs/this.totalSeconds))*100;
    this.$refs.loadingBar.style.setProperty("--bar-width", `${secPercent}%`);
  },
}));


Alpine.start();
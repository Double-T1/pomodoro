import Alpine from "alpinejs";

Alpine.data("pomodoro", () => ({
  setTime: "00:10",
  totalSeconds: 10,
  shownTime: "00:00",
  curSeconds: 0,
  isRunning: false,
  isEditing: false,
  intervalId: null,
  barWidth: 0,

  init() {
    this.curSeconds = this.totalSeconds;
    this.shownTime = this.setTime;
    this.reloadBar();
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
        this.clickReset();
        this.isEditing = true;
        this.$nextTick(() => { this.$refs.input.focus();  })
      } else if (this.updateSetTime()) {
        this.isEditing = false;
      }
    } else {
      alert("Can't edit the timer while running. Please pause the timer first")
    }
  },

  clickReset() {
    if (!this.isRunning && !this.isEditing) {
      this.endTimer();
      this.shownTime = this.setTime;
    } else {
      alert("Can't reset the timer now. Stop the current process and try again.")
    }
  },

  runTimer() {
    this.curSeconds = this.toSecs(this.shownTime);
    this.loadBar();
    this.$refs.loadingBar.style.setProperty("animation", `load ${this.curSeconds}s forwards linear`);
    this.intervalId = setInterval(()=> {
      if (this.curSeconds === 0) {
        alert("Times up!! nice job focusing on your goal!");
        this.isRunning = false;
        this.clickReset();
      } else {
        this.curSeconds -= 1;
        this.shownTime = this.toFormat(this.curSeconds);
      }
    },1000)
  },


  pauseTimer() {
    // sequence matters;
    this.loadBar();
    clearInterval(this.intervalId);
    this.$refs.loadingBar.style.removeProperty("animation");
  }, 

  endTimer() {
    this.reloadBar();
    clearInterval(this.intervalId);
    this.$refs.loadingBar.style.removeProperty("animation");
  },

  updateSetTime() {
    const newTime = this.shownTime.trim();
    const pattern = /^[0-5]\d:[0-5]\d$/;
    if (pattern.test(newTime)) {
      this.setTime = newTime;
      this.shownTime = this.setTime;
      this.totalSeconds = this.toSecs(this.setTime);
      this.curSeconds = this.totalSeconds;
      
      return true;
    }

    this.shownTime = this.setTime;
    alert("Please insert the desired time in the format of \'MM:SS\'. At most 59:59.");
    return false;
  },

  loadBar() {
    this.barWidth = this.$refs.loadingBar.offsetWidth;
    this.$refs.loadingBar.style.setProperty("--bar-width", `${this.barWidth}px`);
  },

  reloadBar() {
    this.barWidth = 0;
    this.$refs.loadingBar.style.setProperty("--bar-width", `${this.barWidth}px`);
  }
}));


Alpine.start();
import Alpine from "alpinejs";

Alpine.data("pomodoro", () => ({
  formatTime: "25:00",
  totalSeconds: 0,
  isRunning: false,
  isEditing: false,

  init() {
    this.totalSeconds = this.toSecs(this.formatTime);
  },

  toSecs(formatTime) {
    const mins = Number(formatTime.slice(0,2));
    const secs = Number(formatTime.slice(3));
    return mins*60 + secs;
  },

  toggleRun() {
    if (!this.isEditing) {
      this.isRunning = !this.isRunning;
    } else {
      alert("Can't run the timer while editing. Please finish editing first")
    }
  },

  toggleEdit() {
    if (!this.isRunning) {
      this.isEditing = !this.isEditing;
    } else {
      alert("Can't edit the timer while running. Please pause the timer first")
    }
  }
}));


Alpine.start();
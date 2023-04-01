var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var timer_exports = {};
__export(timer_exports, {
  Timer: () => Timer
});
module.exports = __toCommonJS(timer_exports);
class Timer {
  constructor() {
    this.isRunning = false;
    this.startTime = 0;
    this.overallTime = 0;
  }
  getTimeElapsedSinceLastStart() {
    if (!this.startTime)
      return 0;
    return Date.now() - this.startTime;
  }
  start() {
    if (this.isRunning)
      return console.error("Timer is already running");
    this.isRunning = true;
    this.startTime = Date.now();
  }
  stop() {
    if (!this.isRunning)
      return console.error("Timer is already stopped");
    this.isRunning = false;
    this.overallTime = this.overallTime + this.getTimeElapsedSinceLastStart();
  }
  reset() {
    this.overallTime = 0;
    if (this.isRunning)
      return this.startTime = Date.now();
    this.startTime = 0;
  }
  getTime() {
    if (!this.startTime)
      return 0;
    if (this.isRunning)
      return this.overallTime + this.getTimeElapsedSinceLastStart();
    return this.overallTime;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Timer
});
//# sourceMappingURL=timer.js.map

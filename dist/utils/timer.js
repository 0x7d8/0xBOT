"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
var Timer = (function () {
function Timer() {
this.isRunning = false;
this.startTime = 0;
this.overallTime = 0;
}
Timer.prototype.getTimeElapsedSinceLastStart = function () {
if (!this.startTime) {
return 0;
}
return Date.now() - this.startTime;
};
Timer.prototype.start = function () {
if (this.isRunning) {
return console.error('Timer is already running');
}
this.isRunning = true;
this.startTime = Date.now();
};
Timer.prototype.stop = function () {
if (!this.isRunning) {
return console.error('Timer is already stopped');
}
this.isRunning = false;
this.overallTime = this.overallTime + this.getTimeElapsedSinceLastStart();
};
Timer.prototype.reset = function () {
this.overallTime = 0;
if (this.isRunning) {
this.startTime = Date.now();
return;
}
this.startTime = 0;
};
Timer.prototype.getTime = function () {
if (!this.startTime) {
return 0;
}
if (this.isRunning) {
return this.overallTime + this.getTimeElapsedSinceLastStart();
}
return this.overallTime;
};
return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map
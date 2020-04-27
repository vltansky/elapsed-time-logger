"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_hrtime_1 = require("browser-hrtime");
var ElapsedLogger = /** @class */ (function () {
    function ElapsedLogger() {
        this._timer = browser_hrtime_1.default();
    }
    ElapsedLogger.prototype.end = function (label) {
        if (label === void 0) { label = ''; }
        var elapsedTime = this.get();
        console.log("" + (label ? label + ' ' : '') + elapsedTime);
    };
    ElapsedLogger.prototype._diff = function () {
        return browser_hrtime_1.default(this._timer);
    };
    ElapsedLogger.prototype.get = function () {
        var diff = this._diff();
        return this.parse(diff);
    };
    ElapsedLogger.prototype.parse = function (hrtime) {
        var result = '';
        var sourceMS = (hrtime[0] * 1e9 + hrtime[1]) / 1e6;
        var ms = Math.round(sourceMS % 1000);
        var sec = Math.round((((sourceMS / 1000) % 60) + Number.EPSILON) * 100) / 100;
        var mins = Math.floor((sourceMS / (1000 * 60)) % 60);
        var hrs = Math.floor((sourceMS / (1000 * 60 * 60)) % 24);
        if (hrs > 0) {
            result += hrs + ' hours ';
        }
        if (mins > 0) {
            result += mins + ' minutes ';
        }
        if (sec >= 1) {
            result += sec + ' seconds ';
        }
        if (mins === 0 && hrs === 0 && sec < 1 && ms > 0) {
            result += ms + 'ms';
        }
        return result;
    };
    return ElapsedLogger;
}());
var SimpleTimeLogger = /** @class */ (function () {
    function SimpleTimeLogger() {
        this._timers = new Map();
    }
    SimpleTimeLogger.prototype.start = function (label) {
        if (label === void 0) { label = null; }
        var elapsed = new ElapsedLogger();
        if (!label) {
            return elapsed;
        }
        this._timers.set(label, elapsed);
        return elapsed;
    };
    SimpleTimeLogger.prototype.end = function (label, overrideLabel) {
        if (overrideLabel === void 0) { overrideLabel = null; }
        var elapsedTime = this.get(label);
        if (elapsedTime === false) {
            return;
        }
        console.log((overrideLabel || label) + " " + elapsedTime);
        this._timers.delete(label);
    };
    SimpleTimeLogger.prototype.get = function (label) {
        var timer = this._timers.get(label);
        if (!timer) {
            console.warn("No such label '" + label + "' for ElapsedLogger"); //process.emitWarning
            return false;
        }
        return timer.get();
    };
    return SimpleTimeLogger;
}());
exports.elapsed = new SimpleTimeLogger();
exports.default = exports.elapsed;

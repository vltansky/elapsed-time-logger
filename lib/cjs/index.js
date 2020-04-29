"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var browser_hrtime_1 = __importDefault(require("browser-hrtime"));
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
var _timers = new Map();
exports.start = function (label) {
    if (label === void 0) { label = null; }
    var elapsed = new ElapsedLogger();
    if (!label) {
        return elapsed;
    }
    _timers.set(label, elapsed);
    return elapsed;
};
exports.end = function (label, overrideLabel) {
    if (overrideLabel === void 0) { overrideLabel = null; }
    var elapsedTime = exports.get(label);
    if (elapsedTime === false) {
        return;
    }
    console.log((overrideLabel || label) + " " + elapsedTime);
    _timers.delete(label);
};
exports.get = function (label) {
    var timer = _timers.get(label);
    if (!timer) {
        console.warn("No such label '" + label + "' for ElapsedLogger"); //process.emitWarning
        return false;
    }
    return timer.get();
};
exports.default = {
    get: exports.get,
    end: exports.end,
    start: exports.start
};

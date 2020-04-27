import hrtime from 'browser-hrtime';
var ElapsedLogger = /** @class */ (function () {
    function ElapsedLogger() {
        this._timer = hrtime();
    }
    ElapsedLogger.prototype.end = function (label) {
        if (label === void 0) { label = ''; }
        var elapsedTime = this.get();
        console.log("" + (label ? label + ' ' : '') + elapsedTime);
    };
    ElapsedLogger.prototype._diff = function () {
        return hrtime(this._timer);
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
export var start = function (label) {
    if (label === void 0) { label = null; }
    var elapsed = new ElapsedLogger();
    if (!label) {
        return elapsed;
    }
    _timers.set(label, elapsed);
    return elapsed;
};
export var end = function (label, overrideLabel) {
    if (overrideLabel === void 0) { overrideLabel = null; }
    var elapsedTime = get(label);
    if (elapsedTime === false) {
        return;
    }
    console.log((overrideLabel || label) + " " + elapsedTime);
    _timers.delete(label);
};
export var get = function (label) {
    var timer = _timers.get(label);
    if (!timer) {
        console.warn("No such label '" + label + "' for ElapsedLogger"); //process.emitWarning
        return false;
    }
    return timer.get();
};
export default {
    get: get,
    end: end,
    start: start
};

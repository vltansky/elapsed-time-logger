var hrtime = function (previousTimestamp) {
    var baseNow = Math.floor((Date.now() - performance.now()) * 1e-3);
    var clocktime = performance.now() * 1e-3;
    var seconds = Math.floor(clocktime) + baseNow;
    var nanoseconds = Math.floor((clocktime % 1) * 1e9);
    if (previousTimestamp) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];
        if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
        }
    }
    return [seconds, nanoseconds];
};
var NS_PER_SEC = 1e9;
hrtime.bigint = function (time) {
    var diff = hrtime(time);
    return (diff[0] * NS_PER_SEC + diff[1]);
};
if (typeof process === 'undefined') {
    window.process = {};
}
if (typeof process.hrtime === 'undefined') {
    window.process.hrtime = hrtime;
}
var index = process.hrtime;

var ElapsedLogger = /** @class */ (function () {
    function ElapsedLogger() {
        this._timer = index();
    }
    ElapsedLogger.prototype.end = function (label) {
        if (label === void 0) { label = ''; }
        var elapsedTime = this.get();
        console.log("" + (label ? label + ' ' : '') + elapsedTime);
    };
    ElapsedLogger.prototype._diff = function () {
        return index(this._timer);
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
var start = function (label) {
    if (label === void 0) { label = null; }
    var elapsed = new ElapsedLogger();
    if (!label) {
        return elapsed;
    }
    _timers.set(label, elapsed);
    return elapsed;
};
var end = function (label, overrideLabel) {
    if (overrideLabel === void 0) { overrideLabel = null; }
    var elapsedTime = get(label);
    if (elapsedTime === false) {
        return;
    }
    console.log((overrideLabel || label) + " " + elapsedTime);
    _timers.delete(label);
};
var get = function (label) {
    var timer = _timers.get(label);
    if (!timer) {
        console.warn("No such label '" + label + "' for ElapsedLogger"); //process.emitWarning
        return false;
    }
    return timer.get();
};
var index$1 = {
    get: get,
    end: end,
    start: start
};

export default index$1;

const hrtime = require('browser-hrtime');
class ElapsedLogger {
    constructor() {
        this._timer = hrtime();
    }
    end(label = '') {
        const elapsedTime = this.get();
        console.log(`${label ? label + ' ' : ''}${elapsedTime}`);
    }
    _diff() {
        return hrtime(this._timer);
    }
    get() {
        const diff = this._diff();
        return this.parse(diff);
    }
    parse(hrtime) {
        let result = '';
        const sourceMS = (hrtime[0] * 1e9 + hrtime[1]) / 1e6;
        const ms = Math.round(sourceMS % 1000);
        const sec = Math.round((((sourceMS / 1000) % 60) + Number.EPSILON) * 100) / 100;
        const mins = Math.floor((sourceMS / (1000 * 60)) % 60);
        const hrs = Math.floor((sourceMS / (1000 * 60 * 60)) % 24);
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
    }
}
class SimpleTimeLogger {
    constructor() {
        this._timers = new Map();
    }
    start(label = null) {
        const elapsed = new ElapsedLogger();
        if (!label) {
            return elapsed;
        }
        this._timers.set(label, elapsed);
        return elapsed;
    }
    end(label, overrideLabel = null) {
        const elapsedTime = this.get(label);
        if (elapsedTime === false) {
            return;
        }
        console.log(`${overrideLabel || label} ${elapsedTime}`);
        this._timers.delete(label);
    }
    get(label) {
        const timer = this._timers.get(label);
        if (!timer) {
            console.warn(`No such label '${label}' for ElapsedLogger`); //process.emitWarning
            return false;
        }
        return timer.get();
    }
}
export const elapsed = new SimpleTimeLogger();
export default elapsed;

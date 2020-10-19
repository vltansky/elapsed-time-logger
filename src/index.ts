import hrtime from 'browser-hrtime';
interface IElapsedLogger {
  end(label?: string): void;
  get(): string;
  _diff(): HrTime;
  parse(hrtime: HrTime): string;
}
type HrTime = [number, number];
class ElapsedLogger implements IElapsedLogger {
  private _timer: HrTime;
  constructor() {
    this._timer = hrtime();
  }

  end(label: string = '') {
    const elapsedTime = this.get();
    console.log(`${label ? label + ' ' : ''}${elapsedTime}`);
  }

  _diff(): HrTime {
    return hrtime(this._timer);
  }

  get(): string {
    const diff = this._diff();
    return this.parse(diff);
  }

  parse(hrtime: HrTime): string {
    let result = '';
    const sourceMS: number = (hrtime[0] * 1e9 + hrtime[1]) / 1e6;
    const ms: number = Math.round(sourceMS % 1000);
    const sec: number = Math.round((((sourceMS / 1000) % 60) + Number.EPSILON) * 100) / 100;
    const mins: number = Math.floor((sourceMS / (1000 * 60)) % 60);
    const hrs: number = Math.floor((sourceMS / (1000 * 60 * 60)) % 24);

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

const _timers = new Map<string, IElapsedLogger>();

const start = (label: string | null = null): IElapsedLogger => {
  const elapsed = new ElapsedLogger();
  if (!label) {
    return elapsed;
  }
  _timers.set(label, elapsed);
  return elapsed;
};

const end = (label: string, overrideLabel: string | null = null): void => {
  const elapsedTime = get(label);
  if (elapsedTime === false) {
    return;
  }
  console.log(`${overrideLabel || label} ${elapsedTime}`);
  _timers.delete(label);
};

const get = (label: string): string | boolean => {
  const timer = _timers.get(label);
  if (!timer) {
    console.warn(`No such label '${label}' for ElapsedLogger`); // process.emitWarning
    return false;
  }
  return timer.get();
};
export default {
  get,
  end,
  start,
};

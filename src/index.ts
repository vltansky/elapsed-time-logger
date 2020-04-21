const convertHrTime = (hrtime: any) => {
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
};

class ElapsedLogger {
  timer: any;
  label: string | null = null;
  constructor(label: string | null = null) {
    this.timer = process.hrtime();
    if (label) {
      this.label = label;
    }
  }

  end(label: string | null = null) {
    const diff = process.hrtime(this.timer);
    const elapsedTime = convertHrTime(diff);
    if (!label) {
      label = this.label;
    }
    console.log(`${label ? label + ' ' : ''}${elapsedTime}`);
  }
}
class SimpleTimeLogger {
  timers = new Map();

  start(label: string | null = null): number | Object {
    if (!label) {
      return new ElapsedLogger();
    }
    const hrtime = process.hrtime();
    this.timers.set(label, hrtime);
    return hrtime;
  }

  end(label: string, overrideLabel: string | null = null) {
    const elapsedTime = this.get(label);
    const output = overrideLabel ? overrideLabel : label;
    console.log(`${output ? output + ' ' : ''}${elapsedTime}`);
    this.timers.delete(label);
  }

  get(label: any): string | boolean {
    const timer = this.timers.get(label);
    if (!timer) {
      process.emitWarning(`No such label '${label}' for ElapsedLogger`);
      return false;
    }
    const diff = process.hrtime(timer);
    const elapsedTime = convertHrTime(diff);
    return elapsedTime;
  }
}

export = new SimpleTimeLogger();

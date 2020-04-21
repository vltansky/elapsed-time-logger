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
interface IElapsedLogger{
  end(label:string):void;
  get():string
}
class ElapsedLogger implements IElapsedLogger{
  timer: any;
  constructor() {
    this.timer = process.hrtime();
  }

  end(label: string = '') {
    const elapsedTime = this.get();
    console.log(`${label ? label + ' ' : ''}${elapsedTime}`);
  }

  get(): string {
    const diff = process.hrtime(this.timer);
    return convertHrTime(diff);
  }
}
class SimpleTimeLogger {
  timers = new Map();

  start(label: string | null = null): IElapsedLogger {
    const elapsed = new ElapsedLogger();
    if (!label) {
      return elapsed;
    }
    this.timers.set(label, elapsed);
    return elapsed;
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
    return timer.get();
  }
}

export = new SimpleTimeLogger();

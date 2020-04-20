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
class SimpleTimeLogger {
  timers = new Map();

  start(label: string) {
    this.timers.set(label, process.hrtime());
  }

  end(label: string) {
    const elapsedTime = this.get(label);
    console.log(`${label ? label + ' ' : ''}${elapsedTime}`);
    this.timers.delete(label);
  }

  get(label: any){
    const timer = this.timers.get(label);
    if (!timer) {
      process.emitWarning(`No such label '${label}' for ElapsedLogger`);
      return;
    }
    const diff = process.hrtime(timer);
    const elapsedTime = convertHrTime(diff);
    return elapsedTime;
  }
}

export class ElapsedLogger {
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
export const consoleElapsed = new SimpleTimeLogger();

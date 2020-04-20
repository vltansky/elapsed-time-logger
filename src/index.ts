const convertHrTime = (hrtime: any) => {
    let result = '';
    const sourceMS: number = ((hrtime[0] * 1e9) + hrtime[1]) / 1e6;
    const ms: number = Math.round(sourceMS % 1000),
        sec: number = Math.round(((sourceMS / 1000) % 60 + Number.EPSILON) * 100) / 100,
        mins: number = Math.floor((sourceMS / (1000 * 60)) % 60),
        hrs: number = Math.floor((sourceMS / (1000 * 60 * 60)) % 24);

    if (hrs > 0){
        result += hrs + ' hours ';
    }
    if (mins > 0){
        result += mins + ' minutes ';
    }
    if (sec >= 1){
        result += sec
        result += ' seconds ';
    }
    if(sec < 1 && ms > 0){
        result += ms + 'ms';
    }

    return result;
}
class TimeLogger{
    timers = new Map();//TODO maybe set or even array
    constructor(){
        console.log('init TimeLogger');
    }

    start(label:string){
        this.timers.set(label, process.hrtime());
        console.log(`${label} starts`);
    }

    end(label:string | null = null){
        let timer;
        if(!label){
            label = Array.from(this.timers.keys()).pop();
        }
        
        if(!this.timers.has(label)){
            return;//todo throw
        }

        timer = this.timers.get(label);
        const diff = process.hrtime(timer);
        const elapsedTime = convertHrTime(diff);
        console.log(`${label ? label+' ': ''}${elapsedTime}`);
        //TODO delete timer
    }
}
export const simpleTimeLogger = new TimeLogger();
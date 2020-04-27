interface IElapsedLogger {
    end(label?: string): void;
    get(): string;
    _diff(): HrTime;
    parse(hrtime: HrTime): string;
}
declare type HrTime = [number, number];
declare class SimpleTimeLogger {
    private _timers;
    start(label?: string | null): IElapsedLogger;
    end(label: string, overrideLabel?: string | null): void;
    get(label: string): string | boolean;
}
export declare const elapsed: SimpleTimeLogger;
export default elapsed;

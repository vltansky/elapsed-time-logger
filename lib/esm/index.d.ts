interface IElapsedLogger {
    end(label?: string): void;
    get(): string;
    _diff(): HrTime;
    parse(hrtime: HrTime): string;
}
declare type HrTime = [number, number];
declare class SimpleTimeLogger {
    private _timers;
    start: (label?: string | null) => IElapsedLogger;
    end: (label: string, overrideLabel?: string | null) => void;
    get: (label: string) => string | boolean;
}
declare const elapsed: SimpleTimeLogger;
export declare const get: (label: string) => string | boolean;
export declare const end: (label: string, overrideLabel?: string | null) => void;
export declare const start: (label?: string | null) => IElapsedLogger;
export default elapsed;

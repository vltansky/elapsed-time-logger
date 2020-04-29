interface IElapsedLogger {
    end(label?: string): void;
    get(): string;
    _diff(): HrTime;
    parse(hrtime: HrTime): string;
}
declare type HrTime = [number, number];
export declare const start: (label?: string | null) => IElapsedLogger;
export declare const end: (label: string, overrideLabel?: string | null) => void;
export declare const get: (label: string) => string | boolean;
declare const _default: {
    get: (label: string) => string | boolean;
    end: (label: string, overrideLabel?: string | null) => void;
    start: (label?: string | null) => IElapsedLogger;
};
export default _default;

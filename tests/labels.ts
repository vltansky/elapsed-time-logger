import elapsed from "../lib/index";
console.warn = jest.fn();
console.log = jest.fn();

describe("Label", () => {
    it('should warn: no such label', () => {
        elapsed.start('test');
        elapsed.end('vlad');
        expect(console.warn).toHaveBeenCalledWith("No such label 'vlad' for ElapsedLogger");
    });

    it('should override label', () => {
        elapsed.start('test');
        elapsed.end('test', 'override');
        expect(console.log).toHaveBeenCalledWith("override ");
    });

    it('should be able to call end() without parameters [class]', () => {
        const elapsedTimer = elapsed.start();
        elapsedTimer.end();
        expect(console.log).toHaveBeenCalledWith('');
    });
});
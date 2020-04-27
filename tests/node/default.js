const elapsed = require("../../lib/cjs");

console.log = jest.fn();
describe("Log function", () => {
    it('should output 1.2 seconds', () => {
        const elapsedTimer = elapsed.start('test');
        const mockHrtime = jest.spyOn(elapsedTimer, 'get').mockReturnValue('1.2 seconds ');
        elapsed.end('test');
        mockHrtime.mockRestore();
        expect(console.log).toHaveBeenCalledWith('test 1.2 seconds ');
    });

    it('should output 1.2 desconds [class]', () => {
        const elapsedTimer = elapsed.start();
        const mockHrtime = jest.spyOn(elapsedTimer, 'get').mockReturnValue('1.2 seconds ');
        elapsedTimer.end('finished:');
        mockHrtime.mockRestore();
        expect(console.log).toHaveBeenCalledWith('finished: 1.2 seconds ');
    });

    it('should return around 100ms [class]', done => {
        const elapsedTimer = elapsed.start();
        setTimeout(()=>{
            const time = parseInt(elapsedTimer.get().replace('ms', ''));
            expect(time).toBeGreaterThanOrEqual(95);
            expect(time).toBeLessThan(120);
            done();
        }, 100);
    });
});
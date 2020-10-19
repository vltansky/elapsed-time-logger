const elapsed = require("../../dist/elapsed-time-logger");

const timer = elapsed.start('test');
jest.spyOn(timer, "_diff").mockReturnValue([100, 1200]);

describe("Get function", () => {
    it('should return 1 minutes 40 seconds', () => {
        const time = elapsed.get('test');
        expect(time).toBe('1 minutes 40 seconds ');
    });

    it('should return 1.3 desconds from class', () => {
        const time = timer.get();
        expect(time).toBe('1 minutes 40 seconds ');
    });
})
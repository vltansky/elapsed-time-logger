process.hrtime = undefined;
import elapsed from "../../lib/elapsed-time-logger";

describe("Parse function", () => {
    it('should return  20 hours 3 minutes 36 seconds', () => {
        const instance = elapsed.start();
        const res = instance.parse([1800216, 25]);
        expect(res).toBe('20 hours 3 minutes 36 seconds ');
    });

    it('should return 1.4 minutes', () => {
        const instance = elapsed.start();
        const res = instance.parse([100, 100]);
        expect(res).toBe('1 minutes 40 seconds ');
    });
})
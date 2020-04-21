import * as ElapsedLogger from "../lib/index";
it('console log', () => {
    console.log = jest.fn();
    ElapsedLogger.start('test');
    setTimeout(()=>{
        ElapsedLogger.end('test');
        expect(console.log).toHaveBeenCalledWith('test 1.2 seconds');
    }, 1200);
    // jest.advanceTimersByTime(1200);
    // jest.runAllTimers();
});

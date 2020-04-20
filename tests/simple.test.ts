import { consoleElapsed } from "../lib/index";
it('console log', () => {
    console.log = jest.fn();
    consoleElapsed.start('test');
    setTimeout(()=>{
        consoleElapsed.get('test');
        expect(console.log).toHaveBeenCalledWith('test 1.2 seconds');
    }, 1200);
    // jest.advanceTimersByTime(1200);
    // jest.runAllTimers();
});

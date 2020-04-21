import * as ElapsedLogger from "../lib/index";

it('1.2 seconds', done => {
    console.log = jest.fn();
    ElapsedLogger.start('test');
    setTimeout(()=>{
        ElapsedLogger.end('test');
        expect(console.log).toHaveBeenCalledWith('test 1.2 seconds ');
        done();
    }, 1200);
    // jest.advanceTimersByTime(1200);
    // jest.runAllTimers();
});

it('1.3 desconds from instance', done => {
    console.log = jest.fn();
    const elapsed = ElapsedLogger.start();
    setTimeout(()=>{
        elapsed.end('finished:');
        expect(console.log).toHaveBeenCalledWith('finished: 1.3 seconds ');
        done();
    }, 1300);
});

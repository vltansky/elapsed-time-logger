import elapsed from "../lib/index";

it('1.2 seconds', done => {
    console.log = jest.fn();
    elapsed.start('test');
    setTimeout(()=>{
        elapsed.end('test');
        expect(console.log).toHaveBeenCalledWith('test 1.2 seconds ');
        done();
    }, 1200);
});

it('get() 1.2 seconds', done => {
    console.log = jest.fn();
    elapsed.start('test');
    setTimeout(()=>{
        const time = elapsed.get('test');
        expect(time).toBe('1.2 seconds ');
        done();
    }, 1200);
});

it('1.3 desconds from instance', done => {
    console.log = jest.fn();
    const elapsedTimer = elapsed.start();
    setTimeout(()=>{
        elapsedTimer.end('finished:');
        expect(console.log).toHaveBeenCalledWith('finished: 1.3 seconds ');
        done();
    }, 1300);
});

it('get() 1.3 desconds from instance', done => {
    console.log = jest.fn();
    const elapsedTimer = elapsed.start();
    setTimeout(()=>{
        const time = elapsedTimer.get();
        expect(time).toBe('1.3 seconds ');
        done();
    }, 1300);
});

it('ms check from instance', done => {
    console.log = jest.fn();
    const elapsedTimer = elapsed.start();
    setTimeout(()=>{
        const time = parseInt(elapsedTimer.get().replace('ms', ''));
        expect(time).toBeGreaterThanOrEqual(100);
        expect(time).toBeLessThan(120);
        done();
    }, 100);
});
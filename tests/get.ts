import elapsed from "../lib/index";

it('get() 1.2 seconds', done => {
    console.log = jest.fn();
    elapsed.start('test');
    setTimeout(()=>{
        const time = elapsed.get('test');
        expect(time).toBe('1.2 seconds ');
        done();
    }, 1200);
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

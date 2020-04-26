
import elapsed from "../lib/index";

it('no such label', () => {
    console.warn = jest.fn();
    elapsed.start('test');
    elapsed.end('vlad');
    expect(console.warn).toHaveBeenCalledWith("No such label 'vlad' for ElapsedLogger");
});

it('override label', () => {
    console.log = jest.fn();
    elapsed.start('test');
    elapsed.end('test', 'override');
    expect(console.log).toHaveBeenCalledWith("override ");
});

// it('call end() with empty label', () => {
//     console.log = jest.fn();
//     elapsed.start();
//     elapsed.end();
//     expect(console.log).toHaveBeenCalledWith('');
// });

it('call end() with empty label instance', () => {
    console.log = jest.fn();
    const elapsedTimer = elapsed.start();
    elapsedTimer.end();
    expect(console.log).toHaveBeenCalledWith('');
});
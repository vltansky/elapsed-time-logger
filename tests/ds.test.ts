import * as ElapsedLogger from "../lib/index";

it('console log', () => {
    console.log = jest.fn();
    const elapsed = ElapsedLogger.start();
    setTimeout(()=>{
        elapsed.end('finished:');
        expect(console.log).toHaveBeenCalledWith('finished: 1.5 seconds');
    }, 1300);
});

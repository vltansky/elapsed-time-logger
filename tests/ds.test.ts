import { ElapsedLogger } from "../lib/index";

it('console log', () => {
    console.log = jest.fn();
    const elapsed = new ElapsedLogger();
    setTimeout(()=>{
        elapsed.end('finished:');
        expect(console.log).toHaveBeenCalledWith('finished: 1.5 seconds');
    }, 1300);
});

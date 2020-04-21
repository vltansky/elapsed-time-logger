import elapsed from "../lib/index";

it('parse 20 hours 3 minutes 36 seconds', () => {
    const instance = elapsed.start();
    const res = instance.parse([1800216, 25]);
    expect(res).toBe('20 hours 3 minutes 36 seconds ');
});

it('parse 1.4 minutes', () => {
    const instance = elapsed.start();
    const res = instance.parse([100, 100]);
    expect(res).toBe('1 minutes 40 seconds ');
});
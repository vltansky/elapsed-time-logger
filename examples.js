const elapsed = require("./lib/index");
// const chalk = require('chalk');

elapsed.start('test2');
setTimeout(()=>{
    elapsed.end('test2');
}, 1300);


elapsed.start('test');
setTimeout(()=>{
    elapsed.end('test');
}, 1300);

elapsed.start('testoverride');
setTimeout(()=>{
    elapsed.end('testoverride', 'override label');
}, 100);


elapsed.start('vlad');
setTimeout(()=>{
    const test = elapsed.get('vlad');
    console.log(test);
}, 1200);

ElapsedLogger is similliar to console.time() & console.timeEnd() 
elapsed.start('label');
elapsed.start('timer label');
setTimeout(()=>{
    elapsed.end('label');
    elapsed.end('timer label');
}, 800);


// or use ElapsedLogger as an instance (recommended)
const elapsedTimer = elapsed.start();
// const elapsedTimer2 = elapsed.start();
console.log('smth');
setTimeout(()=>{
    const t = elapsedTimer.get();
    console.log(t);
    // elapsedTimer2.end(chalk.green('you can use colors here, try chalk or colors packages:'));
    elapsedTimer.end('finished:');
}, 800);


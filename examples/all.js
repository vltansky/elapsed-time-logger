const { consoleElapsed, ElapsedLogger } = require("../lib/index");
// const chalk = require('chalk');

consoleElapsed.start('test');
setTimeout(()=>{
    consoleElapsed.end('test');
}, 1300);


consoleElapsed.start('vlad');
setTimeout(()=>{
    const test = consoleElapsed.get('vlad');
    console.log(test);
}, 1200);

// consoleElapsed is similliar to console.time() & console.timeEnd() 
consoleElapsed.start('label');
consoleElapsed.start('timer label');
setTimeout(()=>{
    consoleElapsed.end('label');
    consoleElapsed.end('timer label');
}, 800);


// or use ElapsedLogger as an instance (recommended)
const elapsed = new ElapsedLogger();
// const elapsed2 = new ElapsedLogger();
console.log('smth');
setTimeout(()=>{
    // elapsed2.end(chalk.green('you can use colors here, try chalk or colors packages:'));
    elapsed.end('finished:');
}, 800);
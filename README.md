# Elapsed time logger
Similiar to console.time() & console.timeEnd() but returns formatted elapsed time `custom label: 4 hours 10 minutes 23.5 seconds` or if less then a second: `540ms`

package doesnt have any dependencies 
# Install
`$ npm i elapsed-time-logger`
# Usage

```const { consoleElapsed, ElapsedLogger } = require("elapsed-time-logger");
// chalk is't required, added as example to show that you can use colors in output
const chalk = require('chalk');

// consoleElapsed is similliar to console.time() & console.timeEnd() 
consoleElapsed.start('label');
consoleElapsed.start('timer label');
setTimeout(()=>{
    consoleElapsed.end('label');
    consoleElapsed.end('timer label');
}, 800);

// or use TimeLogger as an instance (recommended)
const elapsed = new ElapsedLogger();
const elapsed2 = new ElapsedLogger();
console.log('smth');
setTimeout(()=>{
    elapsed2.end(chalk.green('you can use colors here, try chalk or colors packages:'));
    elapsed.end('finished:');
}, 800);
```

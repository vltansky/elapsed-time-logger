# Elapsed time logger
Similiar to console.time() & console.timeEnd() but returns formatted elapsed time `custom label: 4 hours 10 minutes 23.5 seconds` or if less then a second: `540ms`

package doesnt have any dependencies 
# Install
`$ npm i elapsed-time-logger`
# Usage

```const { simpleTimeLogger, TimeLogger } = require("elapsed-time-logger");
const chalk = require('chalk');

// simpleTimeLogger is similliar to console.time() & console.timeEnd() 
simpleTimeLogger.start('label');
simpleTimeLogger.start('timer label');
setTimeout(()=>{
    simpleTimeLogger.end('label');
    simpleTimeLogger.end('timer label');
}, 800);

simpleTimeLogger.start('test');
console.log('smth');
setTimeout(()=>{
    simpleTimeLogger.end();//if no parameter provided - the last label will be used
}, 600)


// or use TimeLogger as an instance (recommended)
const elapsed = new TimeLogger();
const elapsed2 = new TimeLogger();
console.log('smth');
setTimeout(()=>{
    elapsed2.end(chalk.green('you can use colors here, try chalk or colors packages:'));
    elapsed.end('finished:');
}, 800);
```

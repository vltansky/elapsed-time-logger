# Elapsed time logger
Similiar to console.time() & console.timeEnd() but returns formatted elapsed time `custom label: 4 hours 10 minutes 23.5 seconds` or if less then a second: `540ms`

![CircleCI](https://img.shields.io/circleci/build/github/vltansky/elapsed-time-logger)
![NPM](https://img.shields.io/npm/l/elapsed-time-logger)
![npm](https://img.shields.io/npm/v/elapsed-time-logger)
![David](https://img.shields.io/david/vltansky/elapsed-time-logger)
![npm bundle size](https://img.shields.io/bundlephobia/min/elapsed-time-logger)

package doesnt only one dependency
# Install
`$ npm i elapsed-time-logger`
# Usage

```
const elapsed = require("elapsed-time-logger");
// chalk is't required, added as example to show that you can use colors in output
const chalk = require('chalk');
 
// elapsed is similliar to console.time() & console.timeEnd() 
elapsed.start('label');
elapsed.start('label_id');
setTimeout(()=>{
    elapsed.end('label');//output: label 801ms
    elapsed.end('label_id', 'Text that goes here will override label on output');
    // output: Text that goes here will override label on output 801ms
}, 800);
// if paramter label is not provided, start() will return an instance 
const elapsedTimer = elapsed.start();
const elapsedTimer2 = elapsed.start();
setTimeout(()=>{
    elapsedTimer2.end(chalk.green('you can use colors here, try chalk or colors packages:'));
    // output: you can use colors here, try chalk or colors packages: 806ms
    const time = elapsedTimer.get();//return 806ms
    console.log(time);
    elapsedTimer.end('finished:');// output: finished: 806ms
}, 800);
```

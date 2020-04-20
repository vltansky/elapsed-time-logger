# Elapsed time logger
Similiar to console.time() & console.timeEnd() but returns formatted elapsed time `custom label: 4 hours 10 minutes 23.5 seconds` or if less then a second: `540ms`

package doesnt have any dependencies 
# Install
`$ npm i elapsed-time-logger`
# Usage
## SimpleTimeLogger

```
const { simpleTimeLogger, TimeLogger } = require("../lib/index");

// you can use at as console.time() works
simpleTimeLogger.start('test');
console.log('smth');
setTimeout(()=>{
    simpleTimeLogger.end();//if no parameter provided - the last label will be used
}, 60000)


simpleTimeLogger.start('label');
simpleTimeLogger.start('label2');
setTimeout(()=>{
    simpleTimeLogger.end('label2');
    simpleTimeLogger.end('label');
}, 60000)


// or as an instance
const elapsed = new TimeLogger();
const elapsed2 = new TimeLogger();
console.log('smth');
setTimeout(()=>{
    elapsed2.end('you can use colors here, try chalk or colors packages:');
    elapsed.end('finished:');
}, 60000)
```

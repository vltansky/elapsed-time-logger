# Elapsed time logger
Similiar to console.time() & console.timeEnd() but returns formatted elapsed time `custom label: 4 hours 10 minutes 23.5 seconds` or if less then a second: `540ms`

package doesnt have any dependencies 
# Install
`$ npm i elapsed-time-logger`
# Usage
## SimpleTimeLogger

```
const { consoleTimeLogger, TimeLogger } = require("../lib/index");

// you can use at as console.time() works
consoleTimeLogger.start('test');
console.log('smth');
setTimeout(()=>{
    consoleTimeLogger.end();
}, 60000)

// or as an instance
const elapsed = new TimeLogger();
console.log('smth');
setTimeout(()=>{
    elapsed.end('finished:');
}, 60000)
```

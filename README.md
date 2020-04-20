# Console time logger
Same as console.time() & console.timeEnd() but returns formatted elapsed time `custom label: 4 hours 10 minutes 23.5 seconds` or if less then a second: `540ms`

# Usage
## SimpleTimeLogger

```
const { consoleTimeLogger } = require("../lib/index");

consoleTimeLogger.start('test');
console.log('smth');
setTimeout(()=>{
    consoleTimeLogger.end();
}, 60000)
```
## TimeLogger (class)
```
const { TimeLogger } = require("../lib/index");

const elapsed = new TimeLogger();
console.log('smth');
setTimeout(()=>{
    elapsed.end('finished:');
}, 60000)
```

const { consoleElapsed } = require("../lib/index");

consoleElapsed.start('test');
console.log('smth');
setTimeout(()=>{
    consoleElapsed.end();
}, 1200)

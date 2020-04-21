const consoleElapsed = require("../lib/index");

consoleElapsed.start('test');
setTimeout(()=>{
    consoleElapsed.end('test');
}, 1300);
const { simpleTimeLogger } = require("../lib/index");

simpleTimeLogger.start('test');
console.log('smth');
setTimeout(()=>{
    simpleTimeLogger.end();
}, 60000)

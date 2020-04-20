const { consoleTimeLogger } = require("../lib/index");

(() => {
    consoleTimeLogger.start('test');
    console.log('smth');
    setTimeout(()=>{
        consoleTimeLogger.end();
    }, 60000)
})();

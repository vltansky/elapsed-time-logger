const { consoleTimeLogger } = require("../lib/index");

(() => {
    consoleTimeLogger.start('test');
    console.log('vlad');
    setTimeout(()=>{
        consoleTimeLogger.end();
    }, 500)
})();

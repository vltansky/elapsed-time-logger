const TimeLogger = require("../lib/index").simpleTimeLogger;

(() => {
    TimeLogger.start('test');
    console.log('vlad');
    setTimeout(()=>{
        TimeLogger.end();
    }, 500)
})();

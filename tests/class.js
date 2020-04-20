const { TimeLogger } = require("../lib/index");

(() => {
    const elapsed = new TimeLogger();
    console.log('smth');
    setTimeout(()=>{
        elapsed.end('finished:');
    }, 60000)
})();

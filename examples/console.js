const elapsed = require("../lib/index");

elapsed.start('test');
setTimeout(()=>{
    elapsed.end('test');
}, 1300);
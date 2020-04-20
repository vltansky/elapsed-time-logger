const { ElapsedLogger } = require("../lib/index");

const elapsed = new ElapsedLogger();
console.log('smth');
setTimeout(()=>{
    elapsed.end('finished:');
}, 400)

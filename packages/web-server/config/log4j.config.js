const config = require("./index");
const log4js = require("log4js");
log4js.configure({
    appenders: {
        global: { 
            type: "file", 
            filename: config.logDir + "error.log" 
        }
    },
    categories: {
        default: { 
            appenders: ["global"],
            level: "error" 
        }
    }
});

module.exports = log4js;
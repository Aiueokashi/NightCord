const moment = require("moment");
require("moment-timezone");
const chalk = require("chalk");
class extendConsole {
    constructor(client) {
        this.client = client;
    }
    _run() {
        let oldConsole = console.log;
        console.log = function () {
            let timestamp = "[" + moment().tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss") + "] ";
            Array.prototype.unshift.call(arguments, chalk.bold(timestamp));
            oldConsole.apply(this, arguments);
        };
    }
    run() { }
    ;
}
module.exports = extendConsole;

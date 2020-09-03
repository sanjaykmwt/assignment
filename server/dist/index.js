"use strict";
/*
 |-----------------------------------------------------------------
 |  index.ts    - Start point of application.
 |-----------------------------------------------------------------
 |
 */
Object.defineProperty(exports, "__esModule", { value: true });
//Including the typing
/// <reference path="typing.d.ts" />
//Including the dependencies for server
const server_1 = require("./server");
const Config_1 = require("./core/Util/Config");
var server;
const config = Config_1.default.instance();
process.env.TZ = config.get('env.TIMEZONE', "Asia/Kolkata");
try {
    //Setting up the server
    server = new server_1.Server(config.get('env.ENV'), config.get('env.PORT'));
    server.run();
}
catch (e) {
    process.exit(0);
}
//# sourceMappingURL=index.js.map
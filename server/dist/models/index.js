"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../core/Util/Config");
// import {createConnection,Connection as MongoConnection} from "mongoose";
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
mongoose.set('debug', true);
class Connection {
    constructor() {
        this.connection = null;
        const env = process.env.NODE_ENV || 'development';
        const config = Config_1.default.instance();
        const mongo_config = config.get('mongo.' + env, null);
        this.connection = mongoose_1.connect(this.getConnectionString(mongo_config), { useNewUrlParser: true });
    }
    static instance() {
        if (Connection.$_instance == null) {
            Connection.$_instance = new Connection;
        }
        return Connection.$_instance;
    }
    get() {
        return this.connection;
    }
    getConnectionString(config) {
        var database = config.db_name;
        var host = config.host;
        var username = config.username;
        var password = config.password;
        var port = config.port;
        if (username == undefined || username == null || username.trim().length == 0) {
            return "mongodb://" + host + ":" + port + "/" + database;
        }
        else {
            return "mongodb://" + username + ":" + password + "@" + host + ":" + port + "/" + database;
        }
    }
}
exports.default = Connection;
Connection.$_instance = null;
//# sourceMappingURL=index.js.map
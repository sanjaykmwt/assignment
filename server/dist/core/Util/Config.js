"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 |  Class Config is used to get the config data
 |
 |
 */
const path = require("path");
const fs = require("fs");
class Config {
    constructor() {
    }
    //Method to get the Config Instance
    static instance() {
        if (Config.$_instance == null) {
            Config.$_instance = new Config;
        }
        return Config.$_instance;
    }
    //Method will fetch the config from required config file
    get(key, default_value = null) {
        if (key == null) {
            return default_value;
        }
        var key_splits = key.split(".");
        if (key_splits.length < 2) {
            return default_value;
        }
        var config_file_path = path.join(__dirname, "../../../config/" + key_splits[0] + ".json");
        if (!fs.existsSync(config_file_path)) {
            return default_value;
        }
        var config = require(config_file_path);
        var interm_value = config;
        var config_chain_failed = false;
        for (var i = 1; i < key_splits.length; i++) {
            var key = key_splits[i];
            if (interm_value[key] != undefined) {
                interm_value = interm_value[key];
            }
            else {
                config_chain_failed = true;
                break;
            }
        }
        if (config_chain_failed) {
            return default_value;
        }
        return interm_value;
    }
}
exports.default = Config;
Config.$_instance = null;
//# sourceMappingURL=Config.js.map
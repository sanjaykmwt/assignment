"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ip = void 0;
const Validator_1 = require("../Validator");
class Ip {
    constructor(ip) {
        this.ip = null;
        this.validator = Validator_1.default.instance();
        this.ip = ip;
    }
    isValid() {
        return this.validator.isIp(this.ip);
    }
    get() {
        return this.ip.trim().toLowerCase();
    }
}
exports.Ip = Ip;
//# sourceMappingURL=Ip.js.map
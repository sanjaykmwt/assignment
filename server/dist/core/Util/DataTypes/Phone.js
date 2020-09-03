"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
const Validator_1 = require("../Validator");
class Phone {
    constructor(phone) {
        this.phone = null;
        this.validator = Validator_1.default.instance();
        this.phone = phone;
    }
    isValid() {
        return true;
    }
    get() {
        return this.phone.trim();
    }
}
exports.Phone = Phone;
//# sourceMappingURL=Phone.js.map
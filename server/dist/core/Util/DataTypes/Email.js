"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const Validator_1 = require("../Validator");
class Email {
    constructor(value) {
        this.value = null;
        this.validator = Validator_1.default.instance();
        this.value = value;
    }
    isValid() {
        return this.validator.isEmail(this.value);
    }
    get() {
        return this.value.trim().toLowerCase();
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map
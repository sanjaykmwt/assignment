"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const Validator_1 = require("../Validator");
class Name {
    constructor(name) {
        this.name = null;
        this.validator = Validator_1.default.instance();
        this.name = name;
    }
    isValid() {
        return this.validator.isAlphaNumeric(name);
    }
    get() {
        return this.name.trim();
    }
}
exports.Name = Name;
//# sourceMappingURL=Name.js.map
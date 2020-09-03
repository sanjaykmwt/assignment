"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
const Validator_1 = require("../Validator");
class Enum {
    constructor(name) {
        this.name = null;
        this.validator = Validator_1.default.instance();
        this.name = name;
    }
    isValid() {
        return this.validator.isEnum(this.name);
    }
    get() {
        return this.name.trim();
    }
}
exports.Enum = Enum;
//# sourceMappingURL=Enum.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    //Private Constructor
    constructor() {
    }
    static instance() {
        if (Validator.$_instance == null) {
            Validator.$_instance = new Validator();
        }
        return Validator.$_instance;
    }
    isAlphaNumeric(str) {
        if (str == null) {
            return false;
        }
        const regRex = /^[a-z].[a-z0-9 ]*$/i;
        return regRex.test(str);
    }
    isEmail(str) {
        if (str == null) {
            return false;
        }
        const regRex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
        return regRex.test(str);
    }
    isIp(str) {
        if (str == null) {
            return false;
        }
        const regRex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i;
        return regRex.test(str);
    }
    isEnum(str) {
        if (str == null) {
            return false;
        }
        var enums = ["Country", "State", "City", "Locality"];
        return enums.includes(str);
    }
}
exports.default = Validator;
Validator.$_instance = null;
//# sourceMappingURL=Validator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = exports.PasswordPolicy = void 0;
//External Import
const bcrypt = require("bcrypt");
//Internal Import
const saltRounds = 10;
var PasswordPolicy;
(function (PasswordPolicy) {
    PasswordPolicy[PasswordPolicy["POLICY_MIN_8"] = 0] = "POLICY_MIN_8";
    PasswordPolicy[PasswordPolicy["POLICY_MIN_8_ONE_CHAR_ONE_NUMBER"] = 1] = "POLICY_MIN_8_ONE_CHAR_ONE_NUMBER";
    PasswordPolicy[PasswordPolicy["POLICY_MIN_8_ONE_CHAR_ONE_NUMBER_ONE_SPEC"] = 2] = "POLICY_MIN_8_ONE_CHAR_ONE_NUMBER_ONE_SPEC";
    PasswordPolicy[PasswordPolicy["POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER"] = 3] = "POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER";
    PasswordPolicy[PasswordPolicy["POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER_ONE_SPEC"] = 4] = "POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER_ONE_SPEC";
})(PasswordPolicy = exports.PasswordPolicy || (exports.PasswordPolicy = {}));
const DEFAULT_POLICY = PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER;
class Password {
    constructor(password, policy = PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER) {
        this.password = null;
        this.password = password;
    }
    isValid() {
        return this.isValidPassword(DEFAULT_POLICY);
    }
    policyType() {
        return this.getPolicyToString(DEFAULT_POLICY);
    }
    get() {
        return this.password;
    }
    isValidPassword(policy) {
        var reg_ex = /^[a-zA-Z0-9]{8,}$/;
        if (policy == PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER) {
            reg_ex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        }
        else if (policy == PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER_ONE_SPEC) {
            reg_ex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        }
        else if (policy == PasswordPolicy.POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER) {
            reg_ex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        }
        else if (policy == PasswordPolicy.POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER_ONE_SPEC) {
            reg_ex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        }
        return reg_ex.test((this.password));
    }
    hash() {
        return bcrypt.hashSync(this.password, saltRounds);
    }
    checkWithHash(hashString) {
        return bcrypt.compareSync(this.password, hashString);
    }
    getPolicyToString(policy) {
        switch (policy) {
            case PasswordPolicy.POLICY_MIN_8:
                return "minimum of 8 characters";
                break;
            case PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER:
                return "minimum of 8 characters with atleast 1 character & 1 number";
                break;
            case PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER_ONE_SPEC:
                return "minimum of 8 characters with atleast 1 character,1 number & one special chracter";
                break;
            case PasswordPolicy.POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER:
                return "minimum of 8 characters with atleast 1 lowercase character,1 uppper character & 1 number";
                break;
            case PasswordPolicy.POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER_ONE_SPEC:
                return "minimum of 8 characters with atleast 1 lowercase character,1 uppper character ,1 number & one special chracter";
                break;
            default:
                return null;
        }
    }
}
exports.Password = Password;
//# sourceMappingURL=Password.js.map
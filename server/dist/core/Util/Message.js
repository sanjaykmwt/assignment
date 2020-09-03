"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCode = void 0;
var MessageCode;
(function (MessageCode) {
    MessageCode[MessageCode["SUCCESS"] = 200] = "SUCCESS";
    MessageCode[MessageCode["SUCCESS_CREATED"] = 201] = "SUCCESS_CREATED";
    MessageCode[MessageCode["INVALID_PARAM"] = 400] = "INVALID_PARAM";
    MessageCode[MessageCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    MessageCode[MessageCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    MessageCode[MessageCode["ALREADY_EXISTS"] = 409] = "ALREADY_EXISTS";
    MessageCode[MessageCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(MessageCode = exports.MessageCode || (exports.MessageCode = {}));
class Message {
    constructor(code, message, data = null) {
        this.code = null;
        this.message = null;
        this.data = null;
        this.code = code;
        this.message = message;
        this.data = data;
    }
    getStatusCode() {
        return this.code;
    }
    getJson() {
        return {
            code: this.code,
            message: this.message,
            data: this.data
        };
    }
    getData() {
        return this.data;
    }
    getMessage() {
        return this.message;
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map
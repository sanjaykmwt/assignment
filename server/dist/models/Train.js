"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainModel = exports.TrainSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Validator_1 = require("../core/Util/Validator");
const validator = Validator_1.default.instance();
exports.TrainSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    fare: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
exports.TrainSchema.methods.serialize = function (attributes) {
    var result = {};
    attributes.forEach(element => {
        result[element] = this[element];
    });
    return result;
};
exports.TrainSchema.plugin(mongoosePaginate);
exports.TrainModel = mongoose_1.model("Train", exports.TrainSchema);
//# sourceMappingURL=Train.js.map
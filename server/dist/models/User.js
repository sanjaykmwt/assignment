"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainModel = exports.BookingSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Validator_1 = require("../core/Util/Validator");
const validator = Validator_1.default.instance();
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    age: {
        type: String,
        default: null
    },
    discount: {
        type: String,
        default: null
    },
    price: {
        type: String,
        default: null
    }
});
exports.BookingSchema = new mongoose_1.Schema({
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    train_id: {
        type: String,
        required: true,
    },
    user: UserSchema,
    total_fare: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
exports.BookingSchema.methods.serialize = function (attributes) {
    var result = {};
    attributes.forEach(element => {
        result[element] = this[element];
    });
    return result;
};
exports.BookingSchema.plugin(mongoosePaginate);
exports.TrainModel = mongoose_1.model("Booking", exports.BookingSchema);
//# sourceMappingURL=User.js.map
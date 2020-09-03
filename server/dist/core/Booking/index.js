"use strict";
/*
 |  Class BookingManager - SingleTon
 |  Class is used to manage the user from database
 |
 */
Object.defineProperty(exports, "__esModule", { value: true });
//External import
const q = require("q");
const Validator_1 = require("../Util/Validator");
const Errors_1 = require("../Util/Errors");
const mongoose_1 = require("mongoose");
const Booking_1 = require("../../models/Booking");
class BookingManager {
    //private constructor
    constructor() {
        this.validator = null;
        this.validator = Validator_1.default.instance();
    }
    //Static method to get the singleton instance of manager
    static instance() {
        if (BookingManager.$_instance == null) {
            BookingManager.$_instance = new BookingManager();
        }
        return BookingManager.$_instance;
    }
    //Method to add
    add(source, destination, total_fare, user, dot, train_id) {
        var defer = q.defer();
        if (total_fare == null) {
            defer.reject(new Errors_1.NullValueError("Total fare should not be null."));
            return defer.promise;
        }
        if (destination == null) {
            defer.reject(new Errors_1.NullValueError("Code should not be null."));
            return defer.promise;
        }
        Booking_1.BookingModel.create({
            'source': source,
            'destination': destination,
            'train_id': new mongoose_1.Types.ObjectId(train_id),
            'user': user,
            'total_fare': total_fare,
            'dot': dot
        }).then((user) => {
            console.log("inside res");
            defer.resolve(user);
        }).catch((err) => {
            console.log("22222");
            defer.reject(err);
        });
        return defer.promise;
    }
    fetch() {
        let defer = q.defer();
        Booking_1.BookingModel.find().populate("train_id").select(['_id', 'source', 'destination', 'user', 'total_fare', 'dot']).then((result) => {
            defer.resolve(result);
        }).catch(err => {
            defer.reject(err);
        });
        return defer.promise;
    }
}
exports.default = BookingManager;
BookingManager.$_instance = null;
//# sourceMappingURL=index.js.map
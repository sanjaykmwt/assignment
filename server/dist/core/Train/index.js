"use strict";
/*
 |  Class TrainManager - SingleTon
 |  Class is used to manage the user from database
 |
 */
Object.defineProperty(exports, "__esModule", { value: true });
//External import
const q = require("q");
const Validator_1 = require("../Util/Validator");
const Errors_1 = require("../Util/Errors");
const Train_1 = require("../../models/Train");
class TrainManager {
    //private constructor
    constructor() {
        this.validator = null;
        this.validator = Validator_1.default.instance();
    }
    //Static method to get the singleton instance of manager
    static instance() {
        if (TrainManager.$_instance == null) {
            TrainManager.$_instance = new TrainManager();
        }
        return TrainManager.$_instance;
    }
    //Method to add
    add(name, code, destination, source, fare) {
        var defer = q.defer();
        if (name == null) {
            defer.reject(new Errors_1.NullValueError("Name should not be null."));
            return defer.promise;
        }
        if (code == null) {
            defer.reject(new Errors_1.NullValueError("Code should not be null."));
            return defer.promise;
        }
        Train_1.TrainModel.create({
            'name': name,
            'code': code,
            'destination': destination,
            'source': source,
            'fare': fare
        }).then((user) => {
            console.log("inside res");
            defer.resolve(user);
        }).catch((err) => {
            console.log("22222");
            defer.reject(err);
        });
        return defer.promise;
    }
    getUserById(id) {
        var defer = q.defer();
        Train_1.TrainModel.findOne({ _id: id }).then((user) => {
            if (user == null) {
                defer.reject(new Errors_1.NotFoundError("Train not able to found."));
            }
            else {
                defer.resolve(user);
            }
        }).catch((err) => {
            defer.reject(err);
        });
        return defer.promise;
    }
    get(data) {
        var defer = q.defer();
        var where_query = {};
        if (data['destination'] != undefined && data['destination'] != null && (data['destination'] + '').length != 0) {
            var query_string = (data['destination'] + '').toLowerCase().trim();
            where_query['destination'] = {
                '$regex': '.*' + query_string + '.*',
                '$options': 'i'
            };
        }
        if (data['source'] != undefined && data['source'] != null && (data['source'] + '').length != 0) {
            var query_string = (data['source'] + '').toLowerCase().trim();
            where_query['source'] = {
                '$regex': '.*' + query_string + '.*',
                '$options': 'i'
            };
        }
        var data_count = null;
        Train_1.TrainModel.countDocuments(where_query).then(count => {
            data_count = count;
            return Train_1.TrainModel.find(where_query);
        }).then(users => {
            console.log("users");
            console.log(users);
            var result = {};
            result['data'] = users;
            result['count'] = data_count;
            defer.resolve(result);
        }).catch(err => {
            defer.reject(err);
        });
        return defer.promise;
    }
}
exports.default = TrainManager;
TrainManager.$_instance = null;
//# sourceMappingURL=index.js.map
"use strict";
//Including the typing
/// <reference path="../typing.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
//Internal Import
const Iterator_1 = require("../core/Util/Patterns/Iterator");
const models_1 = require("../models");
const Train_1 = require("../core/Train");
const Train_2 = require("../models/Train");
models_1.default.instance();
var trains = [
    {
        'name': "Jp Express",
        'code': "12489",
        'destination': "jaipur",
        'source': "jodhpur",
        'fare': "300"
    },
    {
        'name': "KK Express",
        'code': "12589",
        'destination': "bangalore",
        'source': "delhi",
        'fare': "300"
    },
    {
        'name': "Rajadhani Express",
        'code': "12589",
        'destination': "jaipur",
        'source': "jodhpur",
        'fare': "300"
    }
];
var manager = Train_1.default.instance();
var iterator = new Iterator_1.default(trains, function (item, checker) {
    manager.add(item.name, item.code, item.destination, item.source, item.fare).then((result) => {
        checker(null, result);
    }).catch(err => {
        checker(err, null);
    });
});
Train_2.TrainModel.deleteMany({}).then(() => {
    return iterator.iterate();
}).then((result) => {
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=train_init.js.map
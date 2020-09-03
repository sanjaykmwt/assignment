"use strict";
//Including the typing
/// <reference path="../typing.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
//Internal Import
const Iterator_1 = require("../core/Util/Patterns/Iterator");
const Name_1 = require("../core/Util/DataTypes/Name");
const models_1 = require("../models");
const Admin_1 = require("../core/Admin");
const DataTypes_1 = require("../core/Util/DataTypes");
const AdminUser_1 = require("../models/AdminUser");
models_1.default.instance();
var admins = [
    {
        'name': "Admin",
        'email': "admin@letsgo.com",
        'password': "password"
    }
];
var manager = Admin_1.default.instance();
var iterator = new Iterator_1.default(admins, function (item, checker) {
    manager.add(new Name_1.Name(item.name), new DataTypes_1.Email(item.email), new DataTypes_1.Password(item.password)).then((result) => {
        checker(null, result);
    }).catch(err => {
        checker(err, null);
    });
});
AdminUser_1.AdminUserModel.deleteMany({}).then(() => {
    return iterator.iterate();
}).then((result) => {
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=admin_user_init.js.map
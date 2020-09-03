"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
/*
 |-------------------------------------------------------------------
 |  server.ts - File for server defination
 |-------------------------------------------------------------------
 |  File contains the class to manage the server. It consist of logic
 |  for bootstraping of server and Middleware initization and biniding
 |  with server port.
 |
 */
const express = require("express");
const router_1 = require("./router");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const http = require("http");
const dot = require("dot");
const models_1 = require("./models");
var renderer = require('./../render');
class Server {
    //Constructor For applicatin
    constructor(env, port) {
        this.app = null;
        this.router = null;
        this.server = null;
        if (env == null || env == undefined || env.trim().length == 0) {
            throw new Error('Empty/Null/Undefined eviorment provided.');
        }
        if (port == null || port == undefined) {
            throw new Error('Port not provided.');
        }
        this.env = env;
        this.port = port;
        this.bootstarp();
    }
    //Bootstarping the server
    bootstarp() {
        //Initializing the express
        this.app = express();
        this.app.use(fileUpload());
        this.server = new http.Server(this.app);
        dot.templateSettings = {
            evaluate: /\[\[([\s\S]+?)\]\]/g,
            interpolate: /\[\[=([\s\S]+?)\]\]/g,
            encode: /\[\[!([\s\S]+?)\]\]/g,
            use: /\[\[#([\s\S]+?)\]\]/g,
            define: /\[\[##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\]\]/g,
            conditional: /\[\[\?(\?)?\s*([\s\S]*?)\s*\]\]/g,
            iterate: /\[\[~\s*(?:\]\]|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\]\])/g,
            varname: 'it',
            strip: true,
            append: true,
            selfcontained: false
        };
        dot.process({ global: "_page.render",
            destination: __dirname + "/../render",
            path: (__dirname + "/../views")
        });
        // parse application/x-www-form-urlencoded
        var upperBound = '1gb';
        this.app.use(bodyparser.urlencoded({ extended: false, limit: upperBound }));
        // parse application/json
        this.app.use(bodyparser.json());
        // console.log(),"LOKEHS");
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, APP-SESSION-ID, APP-VERSION");
            next();
        });
        this.router = new router_1.Router(this.app);
        models_1.default.instance();
        //Associating the routers to application
        this.router.associate();
    }
    //Running the server
    run() {
        var me = this;
        if (this.server == null) {
            throw new Error('Express application is not initialized.');
        }
        this.server.listen(this.port, function () {
            console.log('Application started on port ' + me.port);
        });
        console.log('Application started on port ' + me.port);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
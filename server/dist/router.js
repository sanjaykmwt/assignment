"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
/*
 |-------------------------------------------------------------------
 |  router.ts - Defination of rountes goes here
 |-------------------------------------------------------------------
 */
const Controller = require("./controllers");
// import AuthMiddleware from "./core/Middleware/AuthMiddleware"
const Config_1 = require("./core/Util/Config");
var renderer = require('../render');
class Router {
    //Constructor For applicatin
    constructor(app) {
        this.application = app;
    }
    //Association of rounters goes here
    associate() {
        //Defination of routes will go here 
        this.application.get("/", (request, response) => {
            response.send("Hello");
        });
        this.application.get("/status", (request, response) => {
            const config = Config_1.default.instance();
            var status = config.get('env.APP_STATUS');
            response.json(status);
        });
        this.application.post('/train/register', Controller.TrainController.trainRegister);
        this.application.post('/train/fetch', Controller.TrainController.fetchTrain);
        this.application.post('/booking/register', Controller.BookingController.userBooking);
        this.application.get('/booking/fetch', Controller.BookingController.fetch);
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map
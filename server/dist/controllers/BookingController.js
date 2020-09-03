"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const Errors_1 = require("../core/Util/Errors");
const Message_1 = require("../core/Util/Message");
const Booking_1 = require("../core/Booking");
class BookingController extends Controller_1.default {
    userBooking(request, response) {
        var body = request.body;
        var isource = body['source'];
        if (isource == undefined || isource == null || isource.trim().length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "Source is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var idestination = body['destination'];
        if (idestination == undefined || idestination == null || idestination.trim().length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "destination is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var idot = body['dot'];
        if (idot == undefined || idot == null) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "Dot is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var iuser = body['user'];
        if (iuser == undefined || iuser == null || iuser.length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "User is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var itotal_fare = body['total_fare'];
        if (itotal_fare == undefined || itotal_fare == null || itotal_fare.length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "User is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var itrain_id = body['train_id'];
        if (itrain_id == undefined || itrain_id == null || itrain_id.length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "User is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var manager = Booking_1.default.instance();
        manager.add(isource, idestination, itotal_fare, iuser, idot, itrain_id).then((tr_result) => {
            var message = new Message_1.default(Message_1.MessageCode.SUCCESS_CREATED, "Booking Added Successfully.", tr_result.serialize(['_id', 'name', 'code']));
            response.status(message.getStatusCode());
            response.json(message.getJson());
        }).catch(err => {
            if (err instanceof Errors_1.NullValueError) {
                var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, err.message, err.stack);
                response.status(message.getStatusCode());
                response.json(message.getJson());
                return;
            }
            else {
                var message = new Message_1.default(Message_1.MessageCode.INTERNAL_ERROR, "Failed to register booking", err.stack);
                response.status(message.getStatusCode());
                response.json(message.getJson());
                return;
            }
        });
    }
    fetch(request, response) {
        var manager = Booking_1.default.instance();
        manager.fetch().then((booking) => {
            var message = new Message_1.default(Message_1.MessageCode.SUCCESS_CREATED, "Booking.", booking);
            response.status(message.getStatusCode());
            response.json(message.getJson());
        }).catch(err => {
            var message = new Message_1.default(Message_1.MessageCode.INTERNAL_ERROR, "Failed to get booking", err.stack);
            response.status(message.getStatusCode());
            response.json(message.getJson());
        });
    }
}
exports.default = BookingController;
//# sourceMappingURL=BookingController.js.map
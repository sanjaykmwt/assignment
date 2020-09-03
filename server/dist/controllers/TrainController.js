"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const Errors_1 = require("../core/Util/Errors");
const Message_1 = require("../core/Util/Message");
const Train_1 = require("../core/Train");
class TrainController extends Controller_1.default {
    trainRegister(request, response) {
        var body = request.body;
        var ilname = body['name'];
        if (ilname == undefined || ilname == null || ilname.trim().length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "Name is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var icode = body['code'];
        if (icode == undefined || icode == null || icode.trim().length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "Code is empty.");
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
        var isource = body['source'];
        if (isource == undefined || isource == null || isource.trim().length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "Source is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var ifare = body['fare'];
        if (ifare == undefined || ifare == null || ifare.trim().length == 0) {
            var message = new Message_1.default(Message_1.MessageCode.INVALID_PARAM, "fare is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var manager = Train_1.default.instance();
        manager.add(name, icode, idestination, isource, ifare).then((tr_result) => {
            var message = new Message_1.default(Message_1.MessageCode.SUCCESS_CREATED, "Train Added Successfully.", tr_result.serialize(['_id', 'name', 'code', 'destination', 'source']));
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
                var message = new Message_1.default(Message_1.MessageCode.INTERNAL_ERROR, "Failed to register train", err.stack);
                response.status(message.getStatusCode());
                response.json(message.getJson());
                return;
            }
        });
    }
    fetchTrain(request, response) {
        var data = request.body;
        var trainManager = Train_1.default.instance();
        trainManager.get(data).then((tt) => {
            var message = new Message_1.default(Message_1.MessageCode.SUCCESS_CREATED, "Fetch train.", tt);
            response.status(message.getStatusCode());
            response.json(message.getJson());
        }).catch(err => {
            var message = new Message_1.default(Message_1.MessageCode.INTERNAL_ERROR, "Failed to get train", err.stack);
            response.status(message.getStatusCode());
            response.json(message.getJson());
        });
    }
}
exports.default = TrainController;
//# sourceMappingURL=TrainController.js.map
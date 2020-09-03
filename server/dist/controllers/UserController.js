"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const Message_1 = require("../core/Util/Message");
class UserController extends Controller_1.default {
    userRegister(request, response) {
        var body = request.body;
        var ilname = body['source'];
        if (ilname == undefined || ilname == null || ilname.trim().length == 0) {
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
        // var manager:TrainManager         =   TrainManager.instance();
        //     manager.add(name,idot).then((tr_result:ITrain)=>{
        //     var message:Message     =   new Message(MessageCode.SUCCESS_CREATED,"Train Added Successfully.",tr_result.serialize(['_id','name','code']))
        //     response.status(message.getStatusCode())
        //     response.json(message.getJson());
        // }).catch(err =>{
        //     if(err instanceof NullValueError){
        //         var message      =   new Message(MessageCode.INVALID_PARAM,err.message,err.stack);
        //         response.status(message.getStatusCode());
        //         response.json(message.getJson());
        //         return;
        //     } else {
        //         var message:Message     =   new Message(MessageCode.INTERNAL_ERROR,"Failed to register train",
        //         err.stack
        //     )
        //         response.status(message.getStatusCode())
        //         response.json(message.getJson());
        //         return;
        //     }
        // }) 
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map
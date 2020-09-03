"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvents = void 0;
const Message_1 = require("./core/Messenger/Message");
/*
 |-------------------------------------------------------------------
 |  router.ts - Defination of rountes goes here
 |-------------------------------------------------------------------
 */
class SocketEvents {
    //Constructor For applicatin
    constructor(io) {
        this.io = io;
        io.on('connection', this.onConnect);
    }
    //Association of rounters goes here
    onConnect(socket) {
        console.log("Sockert Calling");
        socket.on('JOIN_ROOM', function (data) {
            console.log("ROOM_" + data.room_id, 'USER_' + data.user_id);
            socket.join("ROOM_" + data.room_id);
        });
        socket.on('MESSAGE_ADDED', function (data) {
            console.log("ROOM_" + data.room_id);
            socket.to("ROOM_" + data.room_id).emit('ROOM_MESSAGE_ADDED', data);
        });
        socket.on('READ_MESSAGE', function (data) {
            console.log(data._id, 'data....');
            console.log(data.current_user, 'cuurent....');
            console.log(data.from._id, 'to....');
            console.log(data.current_user == data.from._id);
            if (data.current_user == data.from._id) {
                console.log('not happy...');
                var messageManager = Message_1.default.instance();
                messageManager.updateStatus(data._id);
            }
        });
    }
}
exports.SocketEvents = SocketEvents;
//# sourceMappingURL=socketEvents.js.map
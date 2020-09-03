import Controller from "./Controller";
import { Request, Response } from "express";
import { InvalidIPError, NullValueError, SessionCreateError, InvalidEmailError, NotFoundError, InternalError } from "../core/Util/Errors";
import Message, { MessageCode } from "../core/Util/Message";
import { Phone, Email, Password } from "../core/Util/DataTypes";
import { Types } from "mongoose";
import * as path from "path"
import TrainManager from "../core/Train";
import { ITrain } from "../models/Train";
import BookingManager from "../core/Booking";
import { IBooking } from "../models/Booking";

export default class BookingController extends Controller{

   
    public userBooking(request:Request,response:Response){
        var body:any        =       request.body;

       
        var isource       =       body['source'];
        if(isource == undefined || isource == null || isource.trim().length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"Source is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }

        var idestination       =       body['destination'];
        if(idestination == undefined || idestination == null || idestination.trim().length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"destination is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }

        var idot      =       body['dot'];
        if(idot == undefined || idot == null){
            var message      =   new Message(MessageCode.INVALID_PARAM,"Dot is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var iuser      =       body['user'];
        if(iuser == undefined || iuser == null || iuser.length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"User is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var itotal_fare      =       body['total_fare'];
        if(itotal_fare == undefined || itotal_fare == null || itotal_fare.length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"User is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var itrain_id      =       body['train_id'];
        if(itrain_id == undefined || itrain_id == null || itrain_id.length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"User is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }

        var manager:BookingManager         =   BookingManager.instance();
            manager.add(isource,idestination,itotal_fare,iuser,idot,itrain_id).then((tr_result:ITrain)=>{
            var message:Message     =   new Message(MessageCode.SUCCESS_CREATED,"Booking Added Successfully.",tr_result.serialize(['_id','name','code']))
            response.status(message.getStatusCode())
            response.json(message.getJson());
        }).catch(err =>{

            if(err instanceof NullValueError){
                var message      =   new Message(MessageCode.INVALID_PARAM,err.message,err.stack);
                response.status(message.getStatusCode());
                response.json(message.getJson());
                return;
            } else {

                var message:Message     =   new Message(MessageCode.INTERNAL_ERROR,"Failed to register booking",
                err.stack
            )
                response.status(message.getStatusCode())
                response.json(message.getJson());
                return;
            }
        }) 
    }

    public fetch(request: Request, response:Response) {

        var manager:BookingManager         =   BookingManager.instance();
        manager.fetch().then((booking:IBooking[])=>{
            var message:Message     =   new Message(MessageCode.SUCCESS_CREATED,"Booking.",booking)
            response.status(message.getStatusCode())
            response.json(message.getJson());
        }).catch(err =>{
            var message:Message     =   new Message(MessageCode.INTERNAL_ERROR,"Failed to get booking",
            err.stack
            )
            response.status(message.getStatusCode())
            response.json(message.getJson());
        }) 
    }

}
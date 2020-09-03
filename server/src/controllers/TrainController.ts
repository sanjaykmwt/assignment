import Controller from "./Controller";
import { Request, Response } from "express";
import { InvalidIPError, NullValueError, SessionCreateError, InvalidEmailError, NotFoundError, InternalError } from "../core/Util/Errors";
import Message, { MessageCode } from "../core/Util/Message";
import { Phone, Email, Password } from "../core/Util/DataTypes";
import { Types } from "mongoose";
import * as path from "path"
import TrainManager from "../core/Train";
import { ITrain } from "../models/Train";

export default class TrainController extends Controller{

   
    public trainRegister(request:Request,response:Response){
        var body:any        =       request.body;

       
        var ilname       =       body['name'];
        if(ilname == undefined || ilname == null || ilname.trim().length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"Name is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }

        var icode      =       body['code'];
        if(icode == undefined || icode == null || icode.trim().length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"Code is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }

        var idestination      =       body['destination'];
        if(idestination == undefined || idestination == null || idestination.trim().length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"destination is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }

        var isource      =       body['source'];
        if(isource == undefined || isource == null || isource.trim().length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"Source is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }
        var ifare      =       body['fare'];
        if(ifare == undefined || ifare == null || ifare.trim().length == 0){
            var message      =   new Message(MessageCode.INVALID_PARAM,"fare is empty.");
            response.status(message.getStatusCode());
            response.json(message.getJson());
            return;
        }

        var manager:TrainManager         =   TrainManager.instance();
            manager.add(name,icode,idestination,isource,ifare).then((tr_result:ITrain)=>{
            var message:Message     =   new Message(MessageCode.SUCCESS_CREATED,"Train Added Successfully.",tr_result.serialize(['_id','name','code','destination','source']))
            response.status(message.getStatusCode())
            response.json(message.getJson());
        }).catch(err =>{

            if(err instanceof NullValueError){
                var message      =   new Message(MessageCode.INVALID_PARAM,err.message,err.stack);
                response.status(message.getStatusCode());
                response.json(message.getJson());
                return;
            } else {

                var message:Message     =   new Message(MessageCode.INTERNAL_ERROR,"Failed to register train",
                err.stack
            )
                response.status(message.getStatusCode())
                response.json(message.getJson());
                return;
            }
        }) 
    }
     
    public fetchTrain(request: Request, response:Response) {
        var data = request.body;
        var trainManager:TrainManager         =   TrainManager.instance();
        trainManager.get(data).then((tt:ITrain[])=>{
            var message:Message     =   new Message(MessageCode.SUCCESS_CREATED,"Fetch train.",tt)
            response.status(message.getStatusCode())
            response.json(message.getJson());
        }).catch(err =>{
            var message:Message     =   new Message(MessageCode.INTERNAL_ERROR,"Failed to get train",
            err.stack
            )
            response.status(message.getStatusCode())
            response.json(message.getJson());
        }) 
    }
}
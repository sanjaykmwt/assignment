/*
 |  Class BookingManager - SingleTon
 |  Class is used to manage the user from database
 |
 */

//External import
import * as q from "q";

//Internal import
import Message, { MessageCode } from "../Util/Message";
import Validator from "../Util/Validator";
import { NullValueError, NotFoundError,  } from "../Util/Errors";
import { Types } from "mongoose";
import { MongoError } from "mongodb";
import { BookingModel, IBooking } from "../../models/Booking";


export default class BookingManager{
    private static $_instance:(BookingManager|null)        =   null;

    private validator:(Validator|null)         =   null;
    //private constructor
    private constructor(){
        this.validator      =   Validator.instance();
    }

    //Static method to get the singleton instance of manager
    public static instance(){
        if(BookingManager.$_instance == null){
            BookingManager.$_instance  =   new BookingManager();
        }
        return BookingManager.$_instance;
    }

     //Method to add
    public add(source,destination,total_fare,user:any,dot,train_id:any):q.Promise<Message|Error>{
        var defer   =   q.defer<Message|Error>();
        if(total_fare == null){
            defer.reject(new NullValueError("Total fare should not be null."));
            return defer.promise;
        }

        if(destination == null){
            defer.reject(new NullValueError("Code should not be null."));
            return defer.promise;
        }


        BookingModel.create({
            'source':source,
            'destination':destination,
            'train_id':new Types.ObjectId(train_id),
            'user':user,
            'total_fare':total_fare,
            'dot':dot
        }).then((user)=>{
            console.log("inside res")
                defer.resolve(user);
        }).catch((err)=>{
            console.log("22222")
            defer.reject(err);
        }); 
        return defer.promise;    
    }

    

    public fetch():q.Promise<IBooking[]|Error>{
        let defer   =   q.defer<IBooking[]|Error>();
        BookingModel.find().populate("train_id").select(['_id','source','destination','user','total_fare','dot']).then((result:IBooking[])=>{
            defer.resolve(result);
        }).catch(err=>{
            defer.reject(err);
        });
        return defer.promise;
    }

}
import {Schema, model,connect,Document, Types} from "mongoose";
import * as q from "q";
import * as mongoosePaginate from "mongoose-paginate";
import { IPaginatedModel } from "./IPaginatedModel";
import Validator from "../core/Util/Validator";
import { TrainModel, ITrain } from "./Train";

const validator:Validator   =   Validator.instance();

export interface IUser extends  Document {
    name:String;
    gender:String;
    age:String;

}

var UserSchema:Schema      =   new Schema({
    name: {
        type: String, 
        default:null
    },
    gender:{
        type:String,
        default:null
    },
    age:{
        type:String,
        default:null
    }

  });


export interface IBooking extends  Document {
    source: String;
    destination: String;   
    train_id: (Types.ObjectId | ITrain);   
    user: IUser;
    total_fare:String;
    dot:Date;   
    createdAt? : Date; 
    updatedAt? : Date; 
    serialize(options:string[]):any
}

export var BookingSchema:Schema      =   new Schema({
    source:{
        type:String,
        required: true, 
    },
    destination:{
        type:String,
        required: true, 
    },
    train_id:{
        type: Schema.Types.ObjectId, 
        ref: TrainModel,
        default:null 
    },
    user:[UserSchema],
    total_fare:{
        type:String,
        required: true, 
    },
    dot:{
        type:Date,
        required: true, 
    },
},{
    timestamps:true
});

BookingSchema.methods.serialize   =  function(attributes:string[]) {

    var result = {
    }

    attributes.forEach(element => {
        result[element]     =   this[element]
    });

    return result;
}


BookingSchema.plugin(mongoosePaginate);

export const BookingModel: IPaginatedModel<IBooking> = model<IBooking>("Booking", BookingSchema);
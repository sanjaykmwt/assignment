import {Schema, model,connect,Document, Types} from "mongoose";
import * as q from "q";
import * as mongoosePaginate from "mongoose-paginate";
import { IPaginatedModel } from "./IPaginatedModel";
import Validator from "../core/Util/Validator";
import { Password } from '../core/Util/DataTypes';
import { PasswordDoesNotMatchError } from '../core/Util/Errors';

const validator:Validator   =   Validator.instance();



export interface ITrain extends  Document {
    name: String;
    destination:String;
    source:String;
    code: String;   
    fare: String;   
    createdAt? : Date; 
    updatedAt? : Date; 
    serialize(options:string[]):any
}

export var TrainSchema:Schema      =   new Schema({
    name:{
        type:String,
        required: true, 
    },
    destination:{
        type:String,
        required: true, 
    },
    source:{
        type:String,
        required: true, 
    },
    code:{
        type:String,
        required: true, 
    },
    fare:{
        type:String,
        required: true, 
    },
},{
    timestamps:true
});

TrainSchema.methods.serialize   =  function(attributes:string[]) {

    var result = {
    }

    attributes.forEach(element => {
        result[element]     =   this[element]
    });

    return result;
}


TrainSchema.plugin(mongoosePaginate);

export const TrainModel: IPaginatedModel<ITrain> = model<ITrain>("Train", TrainSchema);
/*
 |  Class TrainManager - SingleTon
 |  Class is used to manage the user from database
 |
 */

//External import
import * as q from "q";
import * as moment from "moment";

//Internal import
import Message, { MessageCode } from "../Util/Message";
import Validator from "../Util/Validator";
import { Name,Email,Password,Phone } from "../Util/DataTypes";
import { NullValueError, InvalidUsernameError, InternalError, NotFoundError, PasswordDoesNotMatchError, PasswordSameMatchError } from "../Util/Errors";
import { Types } from "mongoose";
import { MongoError } from "mongodb";
import { TrainModel, ITrain } from "../../models/Train";


export default class TrainManager{
    private static $_instance:(TrainManager|null)        =   null;

    private validator:(Validator|null)         =   null;
    //private constructor
    private constructor(){
        this.validator      =   Validator.instance();
    }

    //Static method to get the singleton instance of manager
    public static instance(){
        if(TrainManager.$_instance == null){
            TrainManager.$_instance  =   new TrainManager();
        }
        return TrainManager.$_instance;
    }

     //Method to add
    public add(name,code:string,destination,source,fare):q.Promise<Message|Error>{
        var defer   =   q.defer<Message|Error>();
        if(name == null){
            defer.reject(new NullValueError("Name should not be null."));
            return defer.promise;
        }

        if(code == null){
            defer.reject(new NullValueError("Code should not be null."));
            return defer.promise;
        }


        TrainModel.create({
            'name':name,
            'code':code,
            'destination':destination,
            'source':source,
            'fare':fare
        }).then((user)=>{
            console.log("inside res")
                defer.resolve(user);
        }).catch((err)=>{
            console.log("22222")
            defer.reject(err);
        }); 
        return defer.promise;    
    }

    public getUserById(id:Types.ObjectId):q.Promise<ITrain|Error>{
        var defer   =   q.defer<ITrain|Error>()
        TrainModel.findOne({_id : id}).then((user:ITrain)=>{
            if(user == null){
                defer.reject(new NotFoundError("Train not able to found."))
            } else {
                defer.resolve(user)
            }
        }).catch((err)=>{
            defer.reject(err)
        });

        return defer.promise;
    }

    public get(data:any):q.Promise<ITrain[]|Error>{
        var defer   =   q.defer<ITrain[]|Error>()



        var where_query     =   {};

        
        if(data['destination'] != undefined && data['destination'] != null && (data['destination']+'').length != 0){
            var query_string        =   (data['destination'] +'').toLowerCase().trim();
            where_query['destination']      =   {
                '$regex':'.*'+query_string+'.*',
                '$options':'i'
            }
        }

        if(data['source'] != undefined && data['source'] != null && (data['source']+'').length != 0){
            var query_string        =   (data['source'] +'').toLowerCase().trim();
            where_query['source']      =   {
                '$regex':'.*'+query_string+'.*',
                '$options':'i'
            }
        }
        var data_count = null;
        TrainModel.countDocuments(where_query).then(count =>{
            data_count  = count;
            return TrainModel.find(where_query)
        }).then(users => {
            console.log("users");
            console.log(users);
            var result  =   {};
            result['data']      =   users;
            result['count']      =   data_count;
            defer.resolve(result)
        }).catch(err =>{
            defer.reject(err)
        })
        return defer.promise;
    }

}
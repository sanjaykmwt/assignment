 //Including the typing
/// <reference path="../typing.d.ts" />

//Internal Import
import Iterator     from "../core/Util/Patterns/Iterator";
import { Name } from "../core/Util/DataTypes/Name";
import Config from "../core/Util/Config";
import Connection from "../models"
import TrainManager from "../core/Train";
import { ITrain, TrainModel } from "../models/Train";
Connection.instance();

var trains:any[]  =   [
    {
        'name':"Jp Express",
        'code':"12489",
        'destination':"jaipur",
        'source':"jodhpur",
        'fare':"300"
    },
    {
        'name':"KK Express",
        'code':"12589",
        'destination':"bangalore",
        'source':"delhi",
        'fare':"300"
    },
    {
        'name':"Rajadhani Express",
        'code':"12589",
        'destination':"jaipur",
        'source':"jodhpur",
        'fare':"300"
    }

];

var manager:TrainManager     =    TrainManager.instance();

var iterator:Iterator   =   new Iterator(trains,function(item,checker){
    
    manager.add(item.name,item.code,item.destination,item.source,item.fare).then((result:ITrain)=>{
        checker(null,result)
    }).catch(err=>{
        checker(err,null)
    })
})


TrainModel.deleteMany({
}).then(()=>{
    return iterator.iterate();
}).then((result)=>{
    process.exit(0);
}).catch(err=>{
    console.error(err);
    process.exit(1);
})
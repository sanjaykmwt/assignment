import Config from "../core/Util/Config";
// import {createConnection,Connection as MongoConnection} from "mongoose";
import {connect} from "mongoose";
import * as mongoose from "mongoose";

mongoose.set('debug', true);

export interface IMongoConfig{
    db_name:string;
    host:string;
    port:number;
    username?:string,
    password?:string
}

export default class Connection{
    private static $_instance:Connection   =       null;

    private connection:Promise<typeof mongoose>  =   null;

    private constructor(){
        const env = process.env.NODE_ENV || 'development';
        const config:Config  =   Config.instance();
        const mongo_config:IMongoConfig  =   config.get('mongo.'+env,null);
        this.connection     =   connect(this.getConnectionString(mongo_config), { useNewUrlParser: true });
    }

    public static instance(){
        if(Connection.$_instance == null){
            Connection.$_instance = new Connection;
        }
        return Connection.$_instance;
    }

    public get():Promise<typeof mongoose>{
        return this.connection;
    }

    private getConnectionString(config:IMongoConfig):string{

        var database    =   config.db_name;
        var host        =   config.host;
        var username    =   config.username;
        var password    =   config.password;
        var port        =   config.port;

        if(username == undefined || username == null || username.trim().length ==  0){
            return "mongodb://"+host+":"+port+"/"+database;
        } else {
            return "mongodb://"+username+":"+password+"@"+host+":"+port+"/"+database;
        }
    }
}

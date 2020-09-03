/*
 |  Class Config is used to get the config data 
 |
 |
 */
import * as path from "path";
import * as fs from "fs";

export default class Config{

    private static $_instance:Config   =   null;

    private constructor(){

    }

    //Method to get the Config Instance
    public static instance():Config{
        if(Config.$_instance == null){
            Config.$_instance   =   new Config
        }        
        return Config.$_instance;
    }

    //Method will fetch the config from required config file
    public get(key:string,default_value:any=null):any{
        if(key == null){
            return default_value;
        }
        
        var key_splits:string[]  =   key.split(".");
        if(key_splits.length < 2){
            return default_value;
        }

        var config_file_path:string    =   path.join(__dirname,"../../../config/"+key_splits[0]+".json");
        if(!fs.existsSync(config_file_path)){
            return default_value;
        }

        var config:any  =   require(config_file_path);
        var interm_value:any   =   config;
        var config_chain_failed:boolean     =   false;
        for(var i=1;i<key_splits.length;i++){
            var key     =   key_splits[i];
            if(interm_value[key] != undefined){
                interm_value    =   interm_value[key];
            } else {
                config_chain_failed     =   true;
                break;
            }
        }
        if(config_chain_failed){
            return default_value;
        }
        return interm_value;
    }


}
/*
 |-----------------------------------------------------------------
 |  index.ts    - Start point of application.
 |-----------------------------------------------------------------
 |
 */

 //Including the typing
/// <reference path="typing.d.ts" />

//Including the dependencies for server
import {Server} from './server';
import * as env from './../config/env.json';
import Config from "./core/Util/Config";

var server:Server;
const config:Config  =   Config.instance();

process.env.TZ = config.get('env.TIMEZONE',"Asia/Kolkata");

try{
    //Setting up the server
    server      =   new     Server(config.get('env.ENV'),config.get('env.PORT'));
    server.run();
} catch(e){
    process.exit(0);
}


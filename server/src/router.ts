/*
 |-------------------------------------------------------------------
 |  router.ts - Defination of rountes goes here
 |-------------------------------------------------------------------
 */
import * as Controller from './controllers';

import {Application,Request,Response} from 'express';
// import AuthMiddleware from "./core/Middleware/AuthMiddleware"
import Config from "./core/Util/Config";
var  renderer = require('../render');

export class Router{

    private application:Application;

    //Constructor For applicatin
    constructor(app:Application){
        this.application    =   app;
    }

    //Association of rounters goes here
    public associate(){
        //Defination of routes will go here 

        this.application.get("/",(request,response)=>{
                response.send("Hello");
        })


        this.application.get("/status",(request,response)=>{
            const config:Config  =   Config.instance();
            var status   =   config.get('env.APP_STATUS');
            response.json(status);
        })


        this.application.post('/train/register',Controller.TrainController.trainRegister);
        this.application.post('/train/fetch',Controller.TrainController.fetchTrain);
        this.application.post('/booking/register',Controller.BookingController.userBooking);
        this.application.get('/booking/fetch',Controller.BookingController.fetch);
    }
}

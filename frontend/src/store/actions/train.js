import axios from 'axios';
import * as Environment from "../../utils/enviorment";
import NetworkAction from './network';
import { handleError } from './util';
import DialogAction from "./dialog"

export default class TrainAction {
    
    static ACTION_FETCH_TRAIN_START      =     "ACTION_FETCH_TRAIN_START";
    static ACTION_FETCH_TRAIN_END        =     "ACTION_FETCH_TRAIN_END";


    static ACTION_GET_TRAIN_START    =   "ACTION_GET_TRAIN_START";
    static ACTION_GET_TRAIN_END      =     "ACTION_GET_TRAIN_END";

    static ACTION_ADD_BOOKING_START      =     "ACTION_ADD_BOOKING_START";
    static ACTION_ADD_BOOKING_END      =     "ACTION_ADD_BOOKING_END";



    static fetchTrain(data){
        const api_server    =   Environment.api_host();
        var url             =   api_server+"/train/fetch";
        var accessToken     =   window.localStorage.getItem(Environment.app_name()+".accessToken",null)
        return (dispatch)=>{
          dispatch({
            type:TrainAction.ACTION_FETCH_TRAIN_START,
          })
          axios.post(url,data,{
            'headers':{
                'Authorization':'Bearer '+ accessToken,
            }
          }).then((result)=>{
            var payload  =   {}
            if(result.data !== undefined){
              payload   =   {'data':result.data.data}
            }
            dispatch({type:TrainAction.ACTION_FETCH_TRAIN_END,payload:payload});
          }).catch(err=>{
                  handleError(err,dispatch);
                  if(err.response !== undefined){
                    var eror = err.response.data
                    dispatch({
                        type:TrainAction.ACTION_FETCH_TRAIN_END,
                        payload:{
                            'error':eror
                        }
                    })
                } else {
                    dispatch({
                        type:TrainAction.ACTION_FETCH_TRAIN_END,
                        payload:{
                        }
                    })
                }
              });
        };
    }


}


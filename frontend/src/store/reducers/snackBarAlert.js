import SnackBarAlertAction from "../actions/snackBarAction";

const initState  = {
    alerts:[]
}

export default (state=initState,action)=>{
    let alerts  =   state.alerts;
    var payload  =  action.payload;
    switch(action.type){
        case SnackBarAlertAction.ACTION_ADD_ALERT:
            if(payload !== undefined && payload.message !== undefined && payload.type !== undefined){
                alerts.push(payload);
            }
            return {...state,alerts:alerts};
        case SnackBarAlertAction.ACTION_REMOVE_ALERT:
            if(payload !== undefined && payload.index !== undefined){
                alerts.splice(payload.index,1);
            }
            return {...state,alerts:alerts};
        default:
            return {...state};
    }
}
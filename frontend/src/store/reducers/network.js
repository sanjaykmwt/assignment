import NetworkAction from "../actions/network";

const initState = {
    networkError:false
}

export default (state=initState,action)=>{
    let payload     =   action.payload;
    switch(action.type){
        case NetworkAction.ACTION_NETWORK_ERROR:
            let status   = state.networkError;
            if(payload.networkError !== undefined){
                status  =   payload.networkError;
            };
            return {...state,networkError:status}
        default:
            return {...state}
    }
}
import CircularProgressAction from "../actions/circularProgress";

const initState = {
    progress:false
}

export default (state=initState,action)=>{
    let payload     =   action.payload;
    switch(action.type){
        case CircularProgressAction.ACTION_CIRCULAR_PROGRESS:
            let status   = state.progress;
            if(payload.progress !== undefined){
                status  =   payload.progress;
            };
            return {...state,progress:status}
        default:
            return {...state}
    }
}
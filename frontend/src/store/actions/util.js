import NetworkAction from "./network";

export function handleError(error,dispatch){
    if(error instanceof Error){
        if(error.message === "Network Error"){
            dispatch(NetworkAction.networkError(true));
        }
    }
}
export default class NetworkAction {
    static ACTION_NETWORK_ERROR = "ACTION_NETWORK_ERROR";
    
    static networkError(status){
        return {
            type:NetworkAction.ACTION_NETWORK_ERROR,
            payload:{
                networkError:status
            }
        }
    };
}
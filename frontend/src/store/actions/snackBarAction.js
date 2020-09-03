export class SnackBarAlertType{
    static ERROR = "ERROR";
    static SUCCESS = "SUCCESS";

}
export default class SnackBarAlertAction {
    static ACTION_ADD_ALERT     =    "ACTION_ADD_ALERT";
    static ACTION_REMOVE_ALERT     =    "ACTION_REMOVE_ALERT";

    static addAlert(message,type){
        return {
            type:SnackBarAlertAction.ACTION_ADD_ALERT,
            payload:{
                message:message,
                type:type
            }
        }
    }

    static removeAlert(index){
        return {
            type:SnackBarAlertAction.ACTION_REMOVE_ALERT,
            payload:{
                index:index
            }
        }
    }

}
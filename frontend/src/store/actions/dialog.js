export default class DialogAction {
    static ACTION_SHOW_ALERT    =   "ACTION_SHOW_ALERT";
    static ACTION_HIDE_ALERT    =   "ACTION_HIDE_ALERT";

    static ACTION_SHOW_CONFIRM    =   "ACTION_SHOW_CONFIRM";
    static ACTION_HIDE_CONFIRM    =   "ACTION_HIDE_CONFIRM";

    static showAlert(title,message,actionBtn){
        return {
            type:DialogAction.ACTION_SHOW_ALERT,
            payload:{
                title,message,actionBtn
            }
        }
    }

    static hideAlert(){
        return {
            type:DialogAction.ACTION_HIDE_ALERT,
            payload:{}
        }
    }

    static showConfirm(title,message,actionBtn1,actionBtn2){
        return {
            type:DialogAction.ACTION_SHOW_CONFIRM,
            payload:{
                title,message,actionBtn1,actionBtn2
            }
        }
    }

    static hideConfirm(){
        return {
            type:DialogAction.ACTION_HIDE_CONFIRM,
            payload:{}
        }
    }

}
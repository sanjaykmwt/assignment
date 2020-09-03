import DialogAction from "../actions/dialog";

const alertInitState    =   {
    open:false,
    title:"",
    message:"",
    actionBtn:{
        label:"",
        onClick:null
    }
};

const confirmInitState = {
    open:false,
    title:"",
    message:"",
    actionBtn1:{
        label:"",
        onClick:null
    },
    actionBtn2:{
        label:"",
        onClick:null
    }
};

const initState     =   {
    alert:alertInitState,
    confirm:confirmInitState
};

export default (state=initState,action)=>{
    let data    =   action.payload;
    switch(action.type){
        case DialogAction.ACTION_SHOW_ALERT:
            let alert   =   { ...state.alert};
            alert.open  =   true;
            if(data.title === undefined || data.title === null){
                alert.title     =   "Alert";
            } else {
                alert.title     =   data.title;
            }

            if(data.message === undefined || data.message === null){
                alert.message     =   "";
            } else {
                alert.message     =   data.message;
            }

            if(data.actionBtn === undefined || data.actionBtn === null){
                alert.actionBtn.label   =   "Close";
                alert.actionBtn.onClick   =   null;
            } else {
                var actionBtn   =   data.actionBtn;
                if(actionBtn.label === undefined || actionBtn.label === null){
                    alert.actionBtn.label   =   "Close";
                } else {
                    alert.actionBtn.label   =   actionBtn.label;
                }
                if(actionBtn.onClick === undefined || actionBtn.onClick === null){
                    alert.actionBtn.onClick   =   null;
                } else {
                    alert.actionBtn.onClick   =   actionBtn.onClick;
                }
            }
            return {...state , alert:alert};
        case DialogAction.ACTION_HIDE_ALERT:
            return {...state , alert:alertInitState};
        case DialogAction.ACTION_SHOW_CONFIRM:
            let confirm   =   { ...state.confirm};
            confirm.open  =   true;
            if(data.title === undefined || data.title === null){
                confirm.title     =   "Confirm";
            } else {
                confirm.title     =   data.title;
            }

            if(data.message === undefined || data.message === null){
                confirm.message     =   "";
            } else {
                confirm.message     =   data.message;
            }

            if(data.actionBtn1 === undefined || data.actionBtn1 === null){
                confirm.actionBtn1.label   =   "Yes";
                confirm.actionBtn1.onClick   =   null;
            } else {
                var actionBtn1   =   data.actionBtn1;
                if(actionBtn1.label === undefined || actionBtn1.label === null){
                    confirm.actionBtn1.label   =   "Yes";
                } else {
                    confirm.actionBtn1.label   =   actionBtn1.label;
                }
                if(actionBtn1.onClick === undefined || actionBtn1.onClick === null){
                    confirm.actionBtn1.onClick   =   null;
                } else {
                    confirm.actionBtn1.onClick   =   actionBtn1.onClick;
                }
            }

            if(data.actionBtn2 === undefined || data.actionBtn2 === null){
                confirm.actionBtn2.label   =   "Yes";
                confirm.actionBtn2.onClick   =   null;
            } else {
                var actionBtn2   =   data.actionBtn2;
                if(actionBtn2.label === undefined || actionBtn2.label === null){
                    confirm.actionBtn2.label   =   "Yes";
                } else {
                    confirm.actionBtn2.label   =   actionBtn2.label;
                }
                if(actionBtn2.onClick === undefined || actionBtn2.onClick === null){
                    confirm.actionBtn2.onClick   =   null;
                } else {
                    confirm.actionBtn2.onClick   =   actionBtn2.onClick;
                }
            }

            return {...state , confirm:confirm};
        case DialogAction.ACTION_HIDE_CONFIRM:
            return {...state , confirm:confirmInitState};
        default:
            return {...state};
    }
}
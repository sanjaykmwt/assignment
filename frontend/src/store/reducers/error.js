import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message:null,
  title:null,
  open:false,
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ERROR_SHOW:
        state.open   =   true;
        state.message   =   action.payload.message;
        state.title   =   action.payload.title;
        return { ...state, open: state.open,message: state.message,title: state.title };
      
    case actionTypes.ERROR_CLOSE:
        state.open   =   false;
        state.message   =  null;
        return { ...state, open: state.open,message: state.message };

    default:
      return state;
  }
};

export default reducer;

import DrawerAction from "../actions/drawer"
const initialState = {
  status: true,
};

export default  (state = initialState, action) => {
    switch (action.type) {
        case DrawerAction.ACTION_DRAWER:
            return {...state, status:!state.status};
        default:
            return state;
    }
}
import TrainAction from "../actions/train";

const initState = {
    error: null,
    fetchProg: false,
    fetchTrain:[],
    getTrainProg: false,
    getTrainError: null,
    getTrain: {},
    deleteProg:false,
    deleteerror:null

};

export default (state = initState, action) => {
    let payload = action.payload;
    switch (action.type) {
        case TrainAction.ACTION_FETCH_TRAIN_START:
            return { ...state, fetchProg: true };
        case TrainAction.ACTION_FETCH_TRAIN_END:
            var itrain = [];
            var ferror = null;
            if (payload.data !== undefined) {
                itrain = payload.data;
            }
            if (payload.error !== undefined) {
                ferror = payload.error;
            }
            return { ...state, fetchProg: false, fetchTrain: itrain, error: ferror};
                
        case TrainAction.ACTION_GET_TRAIN_START:
            return { ...state, getTrainProg: true };
        case TrainAction.ACTION_GET_TRAIN_END:
            var _train = {};
            var err = null;
            if (payload.data !== undefined) {
                _train = payload.data;
            }
            if (payload.error !== undefined) {
                err = payload.error;
            }

            return { ...state, getTrainProg: false, getTrain: _train, getTrainError: err };

        case TrainAction.ACTION_DELETE_TRAIN_START:
            return { ...state, deleteProg: true };
        case TrainAction.ACTION_DELETE_TRAIN_END:
            var _derror = null;
            if (payload.error !== undefined) {
                console.log("payload ", payload)
                _derror = payload.error;
            }
            return { ...state, deleteProg: false, deleteerror: _derror };
        
        default:
            return { ...state };
    }
}
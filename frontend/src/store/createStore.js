import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import snackBarAlertReducer  from "./reducers/snackBarAlert";
import dialogReducer  from "./reducers/dialog";
import errorReducer from "./reducers/error";
import trainReducer from "./reducers/train";
import {logger} from "redux-logger";
import promise from "redux-promise-middleware";
import networkReducer from "./reducers/network";
import circularProgressReducer from "./reducers/circularprogress"
import drawerReducer from "./reducers/drawer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const rootReducer = combineReducers({
  networkReducer,
  snackBarAlertReducer,
  trainReducer,
  dialogReducer,
  errorReducer,
  circularProgressReducer,
  drawerReducer,
 
});
export const middlewares = [promise,thunk,logger];
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
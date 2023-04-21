import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import combineReduers from "./Reducers/combineReducers";

const store = createStore(combineReduers, {}, applyMiddleware(thunk));

export default store;

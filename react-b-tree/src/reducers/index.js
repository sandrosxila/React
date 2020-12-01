import {combineReducers} from "redux";
import treeReducer from "./tree";

const allReducers = combineReducers({
    tree : treeReducer,
});

export default allReducers;
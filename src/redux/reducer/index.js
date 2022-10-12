import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import visibilityFilter from "./visibilityFilter";

const rootReducer = combineReducers({
  todoReducer,
  visibilityFilter,
});

export default rootReducer;

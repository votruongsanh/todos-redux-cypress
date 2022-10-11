import { Provider } from "react-redux";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import todoReducer from "./reducer/todoReducer";
import visibilityFilter from "./reducer/visibilityFilter";

const rootReducer = combineReducers({
  todoReducer,
  visibilityFilter,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));

export const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

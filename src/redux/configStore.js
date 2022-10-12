import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store;
}

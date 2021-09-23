import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import reducers from "./rootReducer";

let middleware: any;

if (process.env.REACT_APP_ENVIRONMENT !== "production") {
  middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
} else {
  middleware = applyMiddleware(thunkMiddleware);
}

export default function configureStore() {
  return createStore(reducers, middleware);
}

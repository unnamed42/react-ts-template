import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export interface StoreType {}

const rootReducers = combineReducers({

});

export const store = createStore(rootReducers,
  composeWithDevTools(
    applyMiddleware(

    )
  )
);

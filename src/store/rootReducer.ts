// store/rootReducer.ts
import { combineReducers } from "redux";
import exampleReducer from "./exampleSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  example: exampleReducer,
  user: userReducer,
});

export default rootReducer;

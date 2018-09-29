import { combineReducers } from "redux";

import auth from "./authReducer";
import restoData from "./restoDataReducer";


export default combineReducers({
  restoData,
  auth
});

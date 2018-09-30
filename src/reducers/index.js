import { combineReducers } from "redux";

import auth from "./authReducer";
import restoData from "./restoDataReducer";
import firebase_restoList from "./restoListReducer";



export default combineReducers({
  firebase_restoList,
  restoData,
  auth
});

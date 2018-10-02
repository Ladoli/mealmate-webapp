import { combineReducers } from "redux";

import auth from "./authReducer";
import restoData from "./restoDataReducer";
import firebase_restoList from "./restoListReducer";
import userData from "./userDataReducer";



export default combineReducers({
  firebase_restoList,
  restoData,
  auth,
  userData
});

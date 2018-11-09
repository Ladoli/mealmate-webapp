import { authRef, provider, restoRef, databaseRef } from "../config/firebase";
import { FETCH_USER, RIGHT_SWIPE, GET_RESTO, GET_RESTO_LIST, RESET_RESTO, GET_USER_DATA } from "./types";
import { map } from 'lodash';
import swal from 'sweetalert2';
import history from '../components/History';


export const addToUserFavourite = (id,restoID,name) => dispatch => {
  databaseRef.child('/Users/' + id + '/favourites/'+restoID).set(name);
};

export const removeUserFavourite = (id,restoID) => dispatch => {
  databaseRef.child('/Users/' + id + '/favourites/'+restoID).remove();
};

export const addToUserBlockList = (id,restoID,name) => dispatch => {
    databaseRef.child('/Users/' + id + '/blocklist/'+restoID).set(name);
};

export const removeUserBlockList = (id,restoID) => dispatch => {
  databaseRef.child('/Users/' + id + '/blocklist/'+restoID).remove();
  swal({
    title: "Restaurant has been unblocked!",
    text: "Reloading app. The restaurant will now show up again once the app reloads.",
  }).then((res)=>{
    window.location.reload();
  });
};

export const resetUserBlockList = (id) => dispatch => {
  databaseRef.child('/Users/' + id + '/blocklist').remove();
  swal({
    title: "Blocklist has been reset!",
    text: "Reloading app. Formerly blocked restaurants will now show up again once the app reloads.",
  }).then((res)=>{
    window.location.reload();
  });
};


export const getUserData = (id) => async dispatch => {
  databaseRef.child('/Users/' + id).on("value", snapshot =>{
    dispatch({
          type: GET_USER_DATA,
          payload: snapshot.val()
      });
  });
};

export const setRestoData = restoData  => ({
        type: RIGHT_SWIPE,
        payload: restoData
});

export const getRestoData = (restoID) => async dispatch => {
  databaseRef.child('/Restaurants/' + restoID).on("value", snapshot =>{
    dispatch({
          type: GET_RESTO,
          payload: snapshot.val()
      });
  });
};

export const resetRestoData = () => dispatch => {
  dispatch({
        type: RESET_RESTO,
        payload: null
      });
};

export const getRestoList = () => async dispatch => {
  restoRef.on("value", snapshot =>{
    let arrayConvert = map(snapshot.val(), (values,keys)=>{
      return values;
    });

    dispatch({
          type: GET_RESTO_LIST,
          payload: arrayConvert
      });
  });
};


export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      history.push("/");
    })
    .catch(error => {
      console.log(error);
    });
};

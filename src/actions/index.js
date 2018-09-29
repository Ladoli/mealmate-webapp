import { authRef, provider } from "../config/firebase";
import { FETCH_USER, RIGHT_SWIPE, GET_RESTO } from "./types";


export const setRestoData = restoData  => ({
        type: RIGHT_SWIPE,
        payload: restoData
});

export const getRestoData = (restoData) => dispatch => {
  dispatch({
        type: GET_RESTO,
        payload: restoData
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
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};

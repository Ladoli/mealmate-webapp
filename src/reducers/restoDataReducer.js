import { RIGHT_SWIPE, GET_RESTO } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case RIGHT_SWIPE:
      console.log("Swiped right")
      console.log(action)
      return action.payload || null;
    case GET_RESTO:
      console.log(action)
      return action.payload || null;
    default:
      return state;
  }
};

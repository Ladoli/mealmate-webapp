import { RIGHT_SWIPE, GET_RESTO, RESET_RESTO } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case RIGHT_SWIPE:
      return action.payload || null;
    case GET_RESTO:
      return action.payload || "initial";
    case RESET_RESTO:
      return "initial";
    default:
      return state;
  }
};

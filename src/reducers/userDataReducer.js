import { GET_USER_DATA } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return action.payload;
    default:
      return state;
  }
};

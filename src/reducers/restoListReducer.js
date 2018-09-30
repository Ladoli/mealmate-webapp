import { GET_RESTO_LIST } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_RESTO_LIST:
      return action.payload || null;
    default:
      return state;
  }
};

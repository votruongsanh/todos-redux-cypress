import { SET_VISIBILITY_FILTER } from "../contants/actionTypes";
import { SHOW_ALL } from "../contants/TodoFilter";

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;

    default:
      return state;
  }
};

export default visibilityFilter;

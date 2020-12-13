import { ADD_CREATED_TIME } from "../actions/types";

const initialState = {
  createdTime: null,
};

export default function (state = initialState, action) {
  console.log("IN REDUCER");
  console.log(action.payload);
  switch (action.type) {
    case ADD_CREATED_TIME:
      return {
        ...state,
        createdTime: action.payload,
      };
    default:
      return state;
  }
};
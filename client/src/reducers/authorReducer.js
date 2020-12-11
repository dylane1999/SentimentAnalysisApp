import { ADD_AUTHOR } from "../actions/types";

const initialState = {
  name: null,
  profileName: null,
  profileImage: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_AUTHOR:
      return {
        ...state,
        name: action.payload.name,
        profileName: action.payload.profileName,
        profileImage: action.payload.url,
      };
    default:
      return state;
  }
}

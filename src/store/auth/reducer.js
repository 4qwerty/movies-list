import { getUser } from './actions';
import { SET_USER, LOGOUT } from './types';

const initialState = {
  user: getUser(localStorage.token),
  isAuthenticated: localStorage.token ? true : false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}

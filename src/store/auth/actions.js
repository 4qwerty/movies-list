import API from 'services/api';
import { SET_USER, LOGOUT } from './types';
import actionFactory from 'utils/actions/actionFactory';
import { jwt_decode_user as jwt_decode } from 'utils/helpers';

export const logOut = actionFactory(LOGOUT);
export const setUser = actionFactory(SET_USER);

export const getUser = token => {
  return token ? jwt_decode(token) : null;
};

export const loginUserRequest = (data, history) => dispatch => {
  API.post('/sessions', data)
    .then(res => {
      const { token } = res;

      localStorage.setItem('token', token);
      const user = getUser(token);
      dispatch(setUser(user));
      history.push('/movies');
    })
    .catch(() => {
      dispatch(logOut());
    });
};

export const registerUserRequest = (data, history) => dispatch => {
  API.post('/users', data).then(res => {
    const { token } = res;

    localStorage.setItem('token', token);
    const user = getUser(token);
    dispatch(setUser(user));
    history.push('/movies');
  });
};

export const logOutAction = () => dispatch => {
  dispatch(logOut());
  localStorage.removeItem('token');
};

import jwt_decode from 'jwt-decode';

export const jwt_decode_user = token => {
  try {
    return jwt_decode(token);
  } catch (err) {
    return null;
  }
};

import { combineReducers } from 'redux';

import authReducer from 'store/auth/reducer';
import movieReducer from 'store/movie/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
});

export default rootReducer;

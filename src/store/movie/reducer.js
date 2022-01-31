import {
  GET_MOVIE,
  GET_MOVIES,
  CLEAR_MOVIE,
  CREATE_MOVIE,
  DELETE_MOVIE,
  IMPORT_MOVIES,
} from './types';

const initialState = {
  total: 0,
  movies: [],
  movie: null,
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MOVIE:
      return {
        ...state,
        movie: null,
      };

    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };

    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload.data,
        total: action.payload.total,
      };

    case CREATE_MOVIE:
      return {
        ...state,
        total: state.total + 1,
        movies: [...state.movies, action.payload],
      };

    case IMPORT_MOVIES:
      return {
        ...state,
        total: action.payload.total,
        movies: [...state.movies, ...action.payload.data],
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: action.payload,
        total: state.total - 1,
      };

    default:
      return state;
  }
}

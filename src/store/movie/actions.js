import { message } from 'antd';

import {
  GET_MOVIE,
  GET_MOVIES,
  CLEAR_MOVIE,
  CREATE_MOVIE,
  DELETE_MOVIE,
  IMPORT_MOVIES,
} from './types';
import store from 'store';
import API from 'services/api';
import actionFactory from 'utils/actions/actionFactory';

const getMovie = actionFactory(GET_MOVIE);
const getMovies = actionFactory(GET_MOVIES);
const createMovie = actionFactory(CREATE_MOVIE);
const deleteMovie = actionFactory(DELETE_MOVIE);
const importMovies = actionFactory(IMPORT_MOVIES);
export const clearMovie = actionFactory(CLEAR_MOVIE);

export const getMovieByIdRequest = id => dispatch => {
  API.get(`/movies/${id}`).then(({ data }) => {
    dispatch(getMovie(data));
  });
};

export const getMoviesRequest = params => dispatch => {
  API.get('/movies', params).then(({ data, meta }) => {
    dispatch(getMovies({ data, total: meta.total }));
  });
};

export const createMovieRequest = body => dispatch => {
  API.post('/movies', body).then(({ data }) => {
    message.success('Movie successfully created');
    dispatch(createMovie(data));
  });
};

export const deleteMovieRequest = id => dispatch => {
  API.delete(`/movies/${id}`).then(({ status }) => {
    if (status === 1) {
      message.success('Movie successfully deleted');
      const storedMovies = store.getState().movie.movies;
      const newList = storedMovies.filter(e => e.id !== id);
      dispatch(deleteMovie(newList));
    }
  });
};

export const importMoviesRequest = body => dispatch => {
  API.post('/movies/import', body).then(({ data, meta }) => {
    const movie = store.getState().movie;
    const storedTotal = movie.total;
    const responseTotal = meta?.total;
    const countNewMovies = responseTotal - storedTotal;

    // all movies already exist
    if (storedTotal === responseTotal) {
      message.error('You import the same file multiple times, all movies already exist');
      return;
    }

    // all movies are new
    if (countNewMovies === data?.length) {
      message.success('Movies successfully imported from file');
      return dispatch(importMovies({ data, total: meta.total }));
    }

    // Some movies are repeated
    const storedMovies = movie.movies;
    // filter all new movies that are not in the current store
    const importedMovies = data?.filter(movie => !storedMovies.find(el => el.id === movie.id));
    message.success(
      `File imported successfully, some movies are repeating. Added ${countNewMovies} new movies out of ${responseTotal}`
    );
    dispatch(importMovies({ data: importedMovies, total: meta.total }));
  });
};

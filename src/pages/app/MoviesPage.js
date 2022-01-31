import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Row, Checkbox, Input } from 'antd';

import {
  getMoviesRequest,
  createMovieRequest,
  deleteMovieRequest,
  importMoviesRequest,
} from 'store/movie/actions';
import MoviesList from 'components/Movies';
import ImportMovies from 'components/ImportMovies';
import PageLayout from 'components/layout/PageLayout';
import AddMovieModal from 'components/modals/AddMovie';

const MoviesPage = ({
  moviesStore,
  getMoviesRequest,
  createMovieRequest,
  deleteMovieRequest,
  importMoviesRequest,
}) => {
  const [movies, setMovies] = useState([]);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const sortByTitle = localStorage.getItem('sortByTitle') === 'false' ? false : true;
  const [sort, setSort] = useState(localStorage.sortByTitle ? sortByTitle : false);

  useEffect(() => {
    sort ? getMoviesRequest({ sort: 'title' }) : getMoviesRequest();
  }, [sort]);

  useEffect(() => {
    setMovies(moviesStore);
  }, [moviesStore]);

  const showModal = () => setShowAddMovieModal(true);
  const hideModal = () => setShowAddMovieModal(false);
  const onChangeSort = ({ target }) => {
    setSort(target.checked);
    localStorage.setItem('sortByTitle', target.checked);
  };

  const addMovie = data => {
    createMovieRequest(data);
  };
  const importMovies = data => {
    importMoviesRequest(data);
  };
  const searchMovieByTitleActor = value => {
    const sortBy = sort ? 'title' : 'id';
    value?.length === 0 ? getMoviesRequest() : getMoviesRequest({ search: value, sort: sortBy });
  };

  return (
    <PageLayout>
      <Typography.Title className="center">Movies</Typography.Title>
      <Row justify="space-between" align="middle">
        <Button type="primary" onClick={showModal}>
          Add movie
        </Button>
        <ImportMovies importMovies={importMovies} />
      </Row>
      <hr />
      <Row justify="space-between" align="middle" className="margin-20">
        <Checkbox checked={sort} onChange={onChangeSort}>
          Sort by title
        </Checkbox>
        <Input.Search
          allowClear
          enterButton="Search"
          className="input-width"
          onSearch={searchMovieByTitleActor}
          placeholder="search by title/actor"
        />
      </Row>
      <AddMovieModal addMovie={addMovie} handleCancel={hideModal} isOpen={showAddMovieModal} />
      <MoviesList movies={movies} deleteMovieRequest={deleteMovieRequest} />
    </PageLayout>
  );
};

const mapStateToProps = ({ movie }) => ({
  moviesStore: movie.movies,
});

const mapDispatchToProps = {
  getMoviesRequest,
  createMovieRequest,
  deleteMovieRequest,
  importMoviesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);

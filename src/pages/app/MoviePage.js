import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import PageLayout from 'components/layout/PageLayout';
import { clearMovie, getMovieByIdRequest } from 'store/movie/actions';

const MoviePage = ({ movieData, clearMovie, getMovieByIdRequest }) => {
  const { id } = useParams();
  useEffect(() => {
    getMovieByIdRequest(id);
    return () => {
      clearMovie();
    };
  }, [id]);

  return (
    <PageLayout>
      <Link to="/movies">Go back</Link>
      <Typography.Title className="center">Movie information</Typography.Title>
      <Typography.Title level={2} className="center">
        {movieData?.title} (id - {movieData?.id})
      </Typography.Title>
      <p>Release Year - {movieData?.year}</p>
      <p>Format - {movieData?.format}</p>
      <p>Actors - {movieData?.actors?.map(e => e.name).join(', ')}</p>
    </PageLayout>
  );
};

const mapStateToProps = ({ movie }) => ({
  movieData: movie.movie,
});

const mapDispatchToProps = {
  clearMovie,
  getMovieByIdRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

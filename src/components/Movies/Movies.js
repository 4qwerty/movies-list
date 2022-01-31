import React, { useState } from 'react';
import { Empty, Row, List } from 'antd';
import { useHistory } from 'react-router-dom';

import MovieItem from './MovieItem';
import DeleteMovieModal from 'components/modals/DeleteMovie';

const Movies = ({ movies, deleteMovieRequest }) => {
  const history = useHistory();
  const [deleteData, setDeleteData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteMovie = id => () => {
    deleteMovieRequest(id);
    setDeleteData({});
    setShowDeleteModal(false);
  };

  const clickDelete = movie => () => {
    setShowDeleteModal(true);
    setDeleteData({ id: movie.id, title: movie.title });
  };

  const hideModal = () => {
    setDeleteData({});
    setShowDeleteModal(false);
  };

  return movies?.length > 0 ? (
    <>
      <DeleteMovieModal
        id={deleteData?.id}
        title={deleteData?.title}
        isOpen={showDeleteModal}
        handleCancel={hideModal}
        deleteMovie={deleteMovie}
      />
      <List
        dataSource={movies}
        itemLayout="horizontal"
        renderItem={movie => (
          <MovieItem
            movie={movie}
            clickDelete={clickDelete(movie)}
            clickMore={() => history.push(`/movies/${movie.id}`)}
          />
        )}
      />
    </>
  ) : (
    <Row justify="center">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Row>
  );
};

export default Movies;

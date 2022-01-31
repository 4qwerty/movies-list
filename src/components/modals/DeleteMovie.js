import React from 'react';
import { Modal } from 'antd';

const DeleteMovie = ({ id, title, isOpen, handleCancel, deleteMovie }) => (
  <Modal visible={isOpen} title="Delete movie" onOk={deleteMovie(id)} onCancel={handleCancel}>
    <p>Are you sure you want to delete &quot;{title}&quot; movie?</p>
  </Modal>
);

export default DeleteMovie;

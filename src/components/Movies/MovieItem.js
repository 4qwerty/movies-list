import React from 'react';
import { Button, List } from 'antd';

const MovieItem = ({ movie, clickDelete, clickMore }) => (
  <List.Item
    actions={[
      <Button key="1" danger onClick={clickDelete}>
        delete
      </Button>,
      <Button type="primary" key="2" onClick={clickMore}>
        more
      </Button>,
    ]}
  >
    <List.Item.Meta
      title={<div>{movie.title}</div>}
      description={<div>Release Year - {movie.year}</div>}
    />
    <div>Format - {movie.format}</div>
  </List.Item>
);

export default MovieItem;

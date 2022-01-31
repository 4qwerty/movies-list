import React, { useState, useRef } from 'react';
import { Button, message } from 'antd';

const style = { marginRight: 10 };
const ImportMovies = ({ importMovies }) => {
  const txtInputRef = useRef();
  const [file, setFile] = useState(null);

  const clickImport = () => {
    const formData = new FormData();
    formData.append('movies', file[0]);
    importMovies(formData);
    txtInputRef.current.value = '';
    setFile(null);
  };
  const onChangeFile = e => {
    if (e.target.files[0]?.type !== 'text/plain') {
      return message.error('Only files of type - text/plain (.txt)');
    }
    setFile(e.target.files);
  };

  return (
    <div>
      {file?.length > 0 ? (
        <Button onClick={clickImport} style={style}>
          Import file
        </Button>
      ) : (
        <span style={style}>Click to import movies from file</span>
      )}
      <input type="file" onChange={onChangeFile} ref={txtInputRef} />
    </div>
  );
};

export default ImportMovies;

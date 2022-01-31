import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

const Page404 = () => {
  const history = useHistory();
  return (
    <Result
      title="404"
      status="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Home
        </Button>
      }
    />
  );
};

export default Page404;

import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

const Page401 = () => {
  const history = useHistory();
  return (
    <Result
      title="401"
      status="403"
      subTitle="Sorry, you are not authorized. Log in to your profile to continue."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Home
        </Button>
      }
    />
  );
};

export default Page401;

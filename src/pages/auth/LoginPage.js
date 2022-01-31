import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, Input, Button, Form } from 'antd';

import PageLayout from 'components/layout/PageLayout';
import { loginUserRequest } from 'store/auth/actions';
import { PASSWORD_RULE, EMAIL_RULE } from 'utils/formRules';

const LoginPage = ({ loginUserRequest }) => {
  const history = useHistory();

  const login = values => {
    loginUserRequest(values, history);
  };

  return (
    <PageLayout size="small">
      <Typography.Title level={2}>Login</Typography.Title>
      <Form onFinish={login} initialValues={{ email: '', password: '' }}>
        <Form.Item name="email" rules={EMAIL_RULE}>
          <Input size="large" placeholder="email" />
        </Form.Item>
        <Form.Item name="password" rules={PASSWORD_RULE}>
          <Input.Password size="large" placeholder="password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </PageLayout>
  );
};

const mapDispatchToProps = {
  loginUserRequest,
};

export default connect(null, mapDispatchToProps)(LoginPage);

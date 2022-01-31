import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, Input, Button, Form } from 'antd';

import PageLayout from 'components/layout/PageLayout';
import { registerUserRequest } from 'store/auth/actions';
import { PASSWORD_RULE, FULLNAME_RULE, EMAIL_RULE } from 'utils/formRules';

const RegisterPage = ({ registerUserRequest }) => {
  const history = useHistory();

  const register = values => {
    registerUserRequest(values, history);
  };

  return (
    <PageLayout size="small">
      <Typography.Title level={2}>Registration</Typography.Title>
      <Form
        onFinish={register}
        initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
      >
        <Form.Item name="email" rules={EMAIL_RULE}>
          <Input size="large" placeholder="email" />
        </Form.Item>
        <Form.Item name="name" rules={FULLNAME_RULE}>
          <Input size="large" placeholder="name" />
        </Form.Item>
        <Form.Item name="password" rules={PASSWORD_RULE}>
          <Input.Password size="large" placeholder="password" />
        </Form.Item>
        <Form.Item name="confirmPassword" rules={PASSWORD_RULE}>
          <Input.Password size="large" placeholder="confirm password" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </PageLayout>
  );
};

const mapDispatchToProps = {
  registerUserRequest,
};

export default connect(null, mapDispatchToProps)(RegisterPage);

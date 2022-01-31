import React from 'react';
import { PageHeader } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => (
  <PageHeader
    className="header-color"
    title="Authorization"
    extra={[
      <Link key="1" to="/login" className="nav-link">
        Login
      </Link>,
      <Link key="2" to="/registration" className="nav-link">
        Registration
      </Link>,
    ]}
  ></PageHeader>
);

export default Header;

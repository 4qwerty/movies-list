import React from 'react';
import { PageHeader } from 'antd';
import { Link } from 'react-router-dom';

const AuthHeader = ({ logOut }) => (
  <PageHeader
    className="header-color"
    title="Movies App"
    extra={[
      <Link key="1" to="/movies" className="nav-link">
        Movies
      </Link>,
      <Link key="2" to="/login" onClick={logOut} className="nav-link nav-link-logout">
        Logout
      </Link>,
    ]}
  ></PageHeader>
);

export default AuthHeader;

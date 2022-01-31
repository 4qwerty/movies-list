import React from 'react';
import { connect } from 'react-redux';
import { logOutAction } from 'store/auth/actions';
import { Header, AuthHeader } from 'components/Navs';

const PageLayout = ({ children, isAuth, logOutAction, size = 'big' }) => (
  <>
    {isAuth ? <AuthHeader logOut={logOutAction} /> : <Header />}
    <div className={size === 'big' ? 'container' : 'container-small'}>
      <div className={size === 'big' ? 'pagewrap' : 'pagewrap-small center'}>{children}</div>
    </div>
  </>
);

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.isAuthenticated,
});

const mapDispatchToProps = {
  logOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);

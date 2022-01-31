import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Loader from 'components/Preloader';
import PrivateRoute from 'components/PrivateRoute';
import AppLayout from 'components/layout/AppLayout';
const Page401 = lazy(() => import('./pages/Page401'));
const Page404 = lazy(() => import('./pages/Page404'));
const MoviePage = lazy(() => import('./pages/app/MoviePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const MoviesPage = lazy(() => import('./pages/app/MoviesPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));

const App = ({ user, isAuth }) => {
  return (
    <AppLayout>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute exact path="/movies" user={user} isAuth={isAuth} component={MoviesPage} />
            <PrivateRoute
              exact
              user={user}
              isAuth={isAuth}
              path="/movies/:id"
              component={MoviePage}
            />

            <Route exact path="/" render={props => <LoginPage {...props} />} />
            <Route exact path="/login" render={props => <LoginPage {...props} />} />
            <Route exact path="/registration" render={props => <RegisterPage {...props} />} />
            <Route exact path="/401" render={props => <Page401 {...props} />} />
            <Route exact path="/404" render={props => <Page404 {...props} />} />
            <Route component={Page404} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AppLayout>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  isAuth: auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);

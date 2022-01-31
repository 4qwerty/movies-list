import React from 'react';
import { Route } from 'react-router-dom';
import Page401 from 'pages/Page401';

const PrivateRoute = ({ component: Component, user, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !!isAuth && !!user?.email ? <Component {...props} /> : <Page401 {...props} />
    }
  />
);

export default PrivateRoute;

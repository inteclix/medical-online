import React, { useContext } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

import PrivateRouteWithLayout from '../../components/RouteWithLayout/PrivateRouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from '../../layouts';

import AppConext from '../../contexts/app-context';

import List from './List';
import Add from './Add';

export default ({ math }) => {
  const { url, path } = useRouteMatch();
  console.log(`path = ${path}/add`);
  return (
    <Switch>
      <Route component={Add} path={`${path}/add`} />
      <Route component={List} exact path={path} />
    </Switch>
  );
};

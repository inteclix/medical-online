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

import Add from './Add';
import Edit from "./Edit";

export default () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route component={Add} path={`${path}/add/:patientId`} />
      <Route component={Edit} path={`${path}/edit/:id`} />
    </Switch>
  );
};

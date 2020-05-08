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
import Edit from "./Edit";

import PatientConsultations from "./PatientConsultations"
export default () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route component={Add} path={`${path}/add`} />
      <Route component={Edit} path={`${path}/edit/:id`} />
      <Route component={PatientConsultations} path={`${path}/:patientId/consultations`} />
      <Route component={List} path={path} />
    </Switch>
  );
};

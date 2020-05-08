import React, { useContext } from 'react';
import { Switch, Redirect, useHistory } from 'react-router-dom';

import RouteWithLayout from './components/RouteWithLayout/RouteWithLayout';
import PrivateRouteWithLayout from './components/RouteWithLayout/PrivateRouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import AppConext from './contexts/app-context';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Patients as PatientsView,
  Appointments as AppointmentsView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Consultations as ConsultationsView
} from './views';

const Routes = () => {
  const history = useHistory();
  const { user } = useContext(AppConext);
  if (!user) {
    return (
      <Switch>
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-in"
        />
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        {history.location.pathname !== '/sign-up' && <Redirect to="/sign-in" />}
      </Switch>
    );
  }
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <PrivateRouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRouteWithLayout
        component={PatientsView}
        layout={MainLayout}
        path="/patients"
      />
      <PrivateRouteWithLayout
        component={AppointmentsView}
        layout={MainLayout}
        path="/appointments"
      />
      <PrivateRouteWithLayout
        component={ConsultationsView}
        layout={MainLayout}
        path="/consultations"
      />
      <PrivateRouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <PrivateRouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
    </Switch>
  );
};
//<Redirect to="/not-found" />

export default Routes;

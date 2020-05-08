import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppContext from '../../contexts/app-context';
import RouteWithLayout from './RouteWithLayout';

const PrivateRouteWithLayout = props => {
  const { user } = useContext(AppContext);
  const { layout: Layout, component: Component, ...rest } = props;

  if (!user) {
    return <Redirect to="/sign-in" />;
  }
  return <RouteWithLayout {...rest} component={Component} layout={Layout} />;
};

PrivateRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default PrivateRouteWithLayout;

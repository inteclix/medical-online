import React, { useEffect, Suspense } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

import { scrollToTop } from "../../helpers";
const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  useEffect(() => {
    scrollToTop()
  })
  const Loader = () => (
    <Layout>
      <LinearProgress />
    </Layout>
  )
  return (
    <Suspense fallback={<Loader />}>
      <Route
        {...rest}
        render={matchProps => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
    </Suspense>
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout

import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Notifications, Password } from './components';
import AppContext from '../../contexts/app-context';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();
  const { user } = useContext(AppContext);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={7} xs={12}>
          <Notifications />
        </Grid>
        <Grid item md={5} xs={12}>
          <Password />
        </Grid>
        <Grid>
          <code>{JSON.stringify(user)}</code>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;

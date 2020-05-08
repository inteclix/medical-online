import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  }
}));

export default ({ children }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.contentHeader}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className={classes.contentBody}>{children}</div>
    </div>
  );
};

import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, CircularProgress } from '@material-ui/core';

import AppContext from "../../../../../../contexts/app-context";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { user } = useContext(AppContext)

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt={user.username.toUpperCase()}
        className={classes.avatar}
        component={RouterLink}
        src={"/image/"}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.username}
      </Typography>
      <Typography variant="body2">{"bio"}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile

import React, {useState, useEffect, useContext} from 'react';
import {Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';

import {makeStyles} from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import AppContext from '../../contexts/app-context';
import LayoutWithBack from "../../layouts/LayoutWithBack";
import Form from "../../components/Form";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
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
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = (props) => {
  const history = useHistory();
  const {api, setToken, setUser} = useContext(AppContext);
  const {t} = useTranslation();
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();

  const handleBack = () => {
    history.goBack();
  };

  const handleSignIn = (data) => {
    api
      .post('auth/signin', data)
      .then(({data}) => {
        console.log(data);
        setUser(data.user);
        setToken(data.accessToken);
        enqueueSnackbar(t('Welcome again!'), {
          variant: 'success'
        });
        history.push('/');
      })
      .catch((err) => {
        const message = err?.response?.data?.message || '' + err;
        enqueueSnackbar(message, {
          variant: 'error'
        });
      });
  };

  const signiForm = [
    {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      rules: {required: 'This field is required'}
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      rules: {required: 'This field is required'}
    }
  ];

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  Takamaru Ayako
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon/>
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <Form
                form={signiForm}
                onSubmit={handleSignIn}
                submitText={t("Sign in")}
                title={"Sign in"}
                extraFieldsBottom={()=>(
                  <Typography color="textSecondary" variant="body1">
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/sign-up" variant="h6">
                      {t('Sign up')}
                    </Link>
                  </Typography>
                )}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;

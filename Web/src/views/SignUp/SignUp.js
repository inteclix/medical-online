import React, {useState, useEffect, useContext} from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/styles';
import {useSnackbar} from 'notistack';

import {
  Grid,
  IconButton,
  Link,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppContext from '../../contexts/app-context';
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
}));

const SignUp = (props) => {
  const history = useHistory();
  const {api} = useContext(AppContext);
  const [specialities, setSpecialities] = useState([]);
  const classes = useStyles();
  const {t} = useTranslation();
  const {enqueueSnackbar} = useSnackbar();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {is: 'doctor'},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    let mounted = true;
    api
      .get('/specialities')
      .then(({data}) => {
        if (mounted) {
          const spes = data.map((s) => {
            return {label: s.name, value: s.id};
          });
          console.log(spes);
          setSpecialities(spes);
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || '' + err;
        enqueueSnackbar(message, {
          variant: 'error'
        });
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = (data) => {
    api
      .post('/auth/signup', {...data, is: "doctor"})
      .then(() => {
        enqueueSnackbar(t('sign in now with username and password'), {
          variant: 'success'
        });
        history.push('/sign-in');
      })
      .catch((err) => {
        const message = err?.response?.data?.message || '' + err;
        enqueueSnackbar(message, {
          variant: 'error'
        });
      });
  };
  const signupForm = [
    {
      name: 'specialityId',
      placeholder: 'Chose your speciality',
      type: 'select',
      options: specialities,
      rules: {required: 'This field is required'}
    },
    {
      name: 'mobile',
      placeholder: 'mobile phone',
      type: 'text',
      rules: {required: 'This field is required'}
    },
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
console.log(signupForm[0].options)
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                {t('Welcome to Med ONLINE')}
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  {t('Platform and tools for your medicale work')}
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  {t('@inteclix')}
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
                title={t('Sign up')}
                onSubmit={handleSignUp}
                form={signupForm}
                extraFieldsBottom={()=>(
                  <Typography color="textSecondary" variant="body1">
                    {t('Have an account?') + ' '}
                    <Link component={RouterLink} to="/sign-in" variant="h6">
                      {t('Sign in')}
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

export default SignUp;

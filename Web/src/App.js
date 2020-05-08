import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Chart} from 'react-chartjs-2';
import {ThemeProvider} from '@material-ui/styles';
import {LinearProgress} from '@material-ui/core';
import {SnackbarProvider} from 'notistack';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import './i18n';
import {chartjs} from './helpers';
import theme from './theme';
import Routes from './Routes';

import AppContext from './contexts/app-context';
import useApi from './hooks/use-api';


Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const {api, setToken} = useApi();
  window.api = api;
  useEffect(() => {
    api
      .get('/auth/me')
      .then(({data}) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [api]);

  if (isLoading) {
    return (
      <div>
        <LinearProgress/>
      </div>
    );
  }
  return (
    <AppContext.Provider value={{api, setToken, setUser, user}}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes/>
            </BrowserRouter>
          </ThemeProvider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </AppContext.Provider>
  );
};

export default App;

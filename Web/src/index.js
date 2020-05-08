import React from 'react';
import ReactDOM from 'react-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import './lib/material-icons.css'

import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

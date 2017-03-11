import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, browserHistory} from 'react-router';
import './index.css';
import routes from  './routes/routes'


injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('root')
);


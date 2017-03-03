import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import Feed from './components/Feed'
import Main from './components/Main'
import './index.css';


injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Feed} />
      <Route path="/main" component={Main} />
    </Route>
  </Router>,
  document.getElementById('root')
);

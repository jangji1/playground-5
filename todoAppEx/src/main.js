import React from 'react';
import {
  BrowserRouter as Router, // HashRouter, BrowserRouter 중 하나 사용.
  Route,
  Switch,
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <Router>
    <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/:filterName" component={App}/>
    </Switch>
  </Router> , document.getElementById('root')
);

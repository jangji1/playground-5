import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <Router>
        <Switch>
            <Router exact path="/" component={App} />
            <Route path="/:filterName" component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
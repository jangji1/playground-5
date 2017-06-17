import React from 'react';
import ReactDOM from 'react-dom';
import Main from './reduxPractice/Main';

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

/*import React from 'react';
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
            <Route exact path="/" component={App} />
            <Route path="/:filterName" component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
*/

import React from 'react';
import ReactDom from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Main from './reduxPractice2/Main';
/* for routerPractice
const main = <Router>
		<Switch>
			<Route exact path ="/" component={App} />
			<Route path ="/:filterName" component={App} />
		</Switch>
	</Router>;
*/
/* for reduxPractice
const main = <App />;
*/
const main = <Main />
ReactDom.render(
	main,
	document.getElementById('root')
);


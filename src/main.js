// import React from 'react';
// import ReactDom from 'react-dom';
// import {
//     BrowserRouter as Router,
//     Route,
//     Switch
// } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import App from './App';
//
// ReactDom.render(
//     <Router>
//         <Switch>
//             <Route exact path ="/" component={App}/>
//             <Route path ="/:filterName" component={App}/>
//         </Switch>
//     </Router>,
//     document.getElementById('root')
//
//
// );


import React from 'react';
import ReactDom from 'react-dom';
import Main from './reduxPractice/components/Main';

ReactDom.render(
    <Main/>,
    document.getElementById('root')

)
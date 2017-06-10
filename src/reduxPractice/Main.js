import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
//스토어랑 연결해주는역할
import store from './store';

export default () => (
    <Provider store = {store}>
        <App/>
    </Provider>>
);




/*
ReactDom.render(


*/
import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);

/*
    원래대로는
    ReactDOM.render(
        <Provider store={store]}
            <App />
        </Provider>,
        document.getElementById('root')
    );
*/

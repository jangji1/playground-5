import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

//{/* provider 안쪽에 있는 컴포넌트들은 해당 스토어에 구독 가능한 컴포넌트들 이다. */}
export default()=>(
	<Provider store={store}>
		<App />
	</Provider>
);

/*
ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
*/
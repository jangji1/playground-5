/* 전체 시스템에 하나만 존재 */

import { createStore } from 'redux';
import bankReducer from './reducers/bankReducer';

const store = createStore(
	bankReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
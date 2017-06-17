/* 전체 시스템에 하나만 존재 */

import { createStore, combineReducers } from 'redux';
import bankReducer from './reducers/bankReducer';
import tabReducer from './reducers/tabReducer';

const reducers = combineReducers({
	bank : bankReducer,
	tab : tabReducer
})

/*
state = {
	bank : { accountList : []},
	tab : { foucsed : 0}
}
*/

const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
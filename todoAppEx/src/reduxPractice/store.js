/*
  전체 시스템에 하나만존대 state들을 관리
*/

import { createStore } from 'redux';
import bankReducer from './reducers/bankReducer';

const store = createStore(bankReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
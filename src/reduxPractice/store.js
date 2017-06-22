import { createStore, combineReducers } from 'redux';
import bankReducer from './reducers/bankReducer';
import tabReducer from './reducers/tabReducer';

const reducers = combineReducers({
    bank: bankReducer,
    tab: tabReducer
});

const store = createStore(
    reducres,
    window.__REDUX_DEVTOOLS_EXTENSINON__ && window.__REDUX_DEVTOOLS_EXTENSINON__()
);

export default store;

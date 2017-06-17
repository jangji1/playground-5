import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux'; // store 랑 연결
import store from './store';


export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

//원래  main.js였다면 dom render형식으로 작성
/* provider 안에 들어있는 녀석들은 같은 store를 바라봄 */


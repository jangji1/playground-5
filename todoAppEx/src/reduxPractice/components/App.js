import React from 'react';
import InputBox from './InputBox';
import AccountBox from './AccountBook';
import { connect } from 'react-redux';
import bankAction from '../actions/bankActions';

// 둘다 props로 전달될것이다.
const mapStateToProps = state => ({ // store에 있는 상태들을 App한테 props로 전화
  accountList : state.accountList
});
const mapDispatchToProps = dispatch => ({ // action에 대한  dispatch명령(메서드)를 props로 전환
  calculate : (type, money) => dispatch(bankAction[type](money))
});

class App extends React.Component {
  // 이제 컴포넌트들은 데이터관련된 state는 store로 넘기고 ui관련된 것들만 가지고 있겠다.
  render() {
    const {
      accountList,
      calculate
    } = this.props;
    return (
      <div>
        <InputBox calculate={calculate}/>
        <AccountBox accountList={accountList}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// connect (stateprop , dispatch) ==> container( App );
import React from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';

import { connect } from 'react-redux';
import bankActions from '../actions/bankActions';

const mapStateToProps = state => ({ // store 에 있는 state 들을 App한테 props로 전환
    accountList : state.accountList
});
const mapDispatchToProps = dispatch => ({ // action 에 대한 dispath 명령(메소드)를 props로 전환
    calculate : (type, money) => dispatch(bankActions[type](money))
});

class App extends React.Components {

    render() {

        const {
            accountList,
            calculate
        } = this.props;

        return (
            <div>
                <InputBox calculate={calculate} />
                <AccountBook accountList={accountList} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
connectf를 풀어쓰면
const c = connect(mapStateToProps, mapDispatchToProps);
export default c(App);

connect = function(a, b){
    // blah blah
    return function(c){}
}
*/

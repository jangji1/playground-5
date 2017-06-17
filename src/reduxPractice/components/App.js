import React from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import { connect } from 'react-redux';
import bankActions from '../actions/bankActions';

const mapStateToProps = state => ({ //store의 state들을 App한테 props로 전환
    accountList: state.accountList
});
const mapDispatchToProps = dispatch => ({ // action에 대한 dispatch명령(메소드)를 props로 전환
    calculate: (type, money) => dispatch(bankActions[type](money))
    //caculate: (type, money) => dispatch(bankActions[type](money))
});

class App extends React.Component {
    render() {
        const {
            accountList,
            calculate,
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
const c = connect(mapStateToProps, mapDispatchToProps)
export default c(App);

connect = function(a, b) {
    return function(c) {}
}
*/

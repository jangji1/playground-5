import React from 'react';
import InputBox from './inputBox';
import AccountBook from './AccountBook';
import { connect } from 'react-redux'
import bankAction from '../actions/bankActions';

const mapStateToProps = state => ({ //store의 state들을 앱한테 props로 전달
    accountList: state.accountList
});

const mapDispatchToProps = dispatch => ({ //action에 대한  dispatch(method) 명령을 props로 전달
    calculate: (type, money) => dispatch(bankAction[type](money))
});
class App extends React.Component {
    state = {
        accountList: []
    };
    calculate = (type, money) => {
        money = money * 1;
        if(typeof money !== 'number') {
            return;
        }
        const prevAccount = this.state.accountList;
        const lastResult = prevAccount.length
            ? prevAccount[prevAccount.length - 1].result
            : 0;
        this.setState({
            accountList: [
                ...prevAccount, {
                    type,
                    money,
                    result: lastResult + (type === 'save' ? 1 : -1) * money
                }
            ]
        });
    };

    render() {
        return (
            <div>
                <InputBox
                    calculate={this.calculate}
                />
                <AccountBook
                    accountList={this.state.accountList}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


//
// const c = connect(mapStateToProps, mapDispatchToProps);
// export default c(App);
//
// connect = function(a,b){
//     return function(c){}
// }

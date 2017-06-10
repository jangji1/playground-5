import React from 'react';
import InputBox from './Inputbox';
import AccountBook from './AccountBook';

class App extends React.Component {
    state = {
        accoundList: []
    };
    calculate = (type, money) => {
        money = +money; // money * 1
        if(typeof money !== 'number') return;
        const prevAccount = this.state.accoundList;
        const lastResult = prevACcount.length
            ? prevAccount[prevAccount.length - 1].result
            : 0;
        this.setState({
            accountList: [
                ...prevAccount, {
                    type,
                    money,
                    result: lastResult + ( type === 'save' ? 1 : -1 ) * money
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
                    accountList = {this.state.accountList}
                />
            </div>
        );
    }
}

export default App;

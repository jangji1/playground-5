import React from 'react';
import InputBox from './InputBox';
import AccountBox from './AccountBook';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      accountList: []
    }
  }
  calculate = (type, money) => {
    money = money * 1;
    if (typeof money !== 'number') return;
    const prevAccount = this.state.accountList;
    const lastResult = prevAccount.length ? prevAccount[prevAccount.length - 1].result : 0;
    this.setState({
      accountList: [
        ...prevAccount, {
          type,
          money,
          result: lastResult + ( type === 'save' ? 1 : -1) * money
        }
      ]
    })
  };
  render() {
    return (
      <div>
        <InputBox
          calculate={this.calculate}
        />
        <AccountBox
          accountList={this.state.accountList}
        />
      </div>
    )
  }
}

export default App;
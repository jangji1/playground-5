import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Header from './Header';
import List from './List';

class App extends React.Component {
    state = {
        account: [{
          id : '',
          money : '',
          transaction : '',
          total : 0
        }],
        balance: 0,
        inputValue:0
    };
    changeValue = (val) => {
      this.setState({
        inputValue : val
      });
    }
    deposit = () => {
      if (this.state.inputValue == 0) {
        alert('입금할 금액을 입력하세요.')
      } else {
        this.addRow(this.state.inputValue,1);
      }
    }
    withdraw = () => {
      if (this.state.inputValue == 0) {
        alert('출금할 금액을 입력하세요.')
      } else {
        if (this.state.balance < this.state.inputValue) {
          alert('잔액이 부족합니다')
          return false;
        }
        this.addRow(this.state.inputValue,-1);
      }
    }
    addRow = (money,transaction) => {
      this.setState({
        account : [...this.state.account, {
          id : Date.now(),
          money : money,
          transaction : transaction,
          total : this.state.balance+Number(money)*transaction
        }],
        inputValue : 0,
        balance : this.state.balance+Number(money)*transaction
      })
    }

    render() {
        const {
            account,
            inputValue,
            balance
        } = this.state;
        return (
            <div>
                <Header
                  balance={balance}
                  changeValue={this.changeValue}
                  deposit={this.deposit}
                  withdraw={this.withdraw}
                />
                <table>
                  <thead>
                    <tr>
                      <th>입금</th>
                      <th>출금</th>
                      <th>잔액</th>
                    </tr>
                  </thead>
                  <List
                      account={account}
                      balance={balance}
                      addRow={this.addRow}
                  />
                </table>
            </div>
        );
    }
}

export default App;

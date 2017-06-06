import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Header from './Header';
import List from './List';

class App extends React.Component {
    state = {
        transaction: [{
          id : '',
          money : '',
          isDeposit : '',
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
      this.addRow(this.state.inputValue,1);
    }
    withdraw = () => {
      if (this.state.balance < this.state.inputValue) {
        alert('잔액이 부족합니다')
        return false;
      }
      this.addRow(this.state.inputValue,-1);
    }
    addRow = (money,isDeposit) => {
      this.setState({
        transaction : [...this.state.transaction, {
          id : Date.now(),
          money : money,
          isDeposit : isDeposit,
          total : this.state.balance+Number(money)*isDeposit
        }],
        balance : this.state.balance+Number(money)*isDeposit
      })
    }

    render() {
        const {
            transaction,
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
                      transaction={transaction}
                      balance={balance}
                      addRow={this.addRow}
                  />
                </table>
            </div>
        );
    }
}

export default App;

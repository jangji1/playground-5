import React from 'react';
import InputBox from 'InputBox';
import AccountBook from 'AccountBook';

class App extends React.Component {

    // state 총합계, 입출금 내역 저장
    constructor() {
        super();
        this.state = {
            totalMoney: 0,
            account: []
        };
    }
    // 입출금 관리
    handleMoney = (m, type) => {
        const totalMoney = this.state.totalMoney;
        const inputMoney = parseInt(m);
        //예외처리
        if(m === '' || type === '출금' && inputMoney > totalMoney) return;
        this.setState({
            account : [...this.state.account, {
                id : new Date(0),
                input : type === '입금' ? m : 0,
                output : type === '출금' ? m : 0,
                currentMoney : type === '입금' ? totalMoney + inputMoney : totalMoney - inputMoney
            }],
            totalMoney: type === '입금' ? totalMoney + inputMoney : totalMoney - inputMoney
        })
    };

    render() {
        const {
            totalMoney,
            account
        } = this.state;
        return (
            <div className="main_wrap">
                <InputBox totalMoney={totalMoney} handleMoney={this.handleMoney}/>
                <AccountBook totalMoney={totalMoney} account={account}/>
            </div>
        )
    }
}
export default App;

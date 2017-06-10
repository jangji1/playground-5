import React from 'react';

import InputBox from './InputBox';
import AccountBook from './AccountBook';

class Account extends React.Component {
    state = {
        acc: [{accIn:'', accOut:'', accResult: ''}]
    }
    btnAcc = (i, val) => {
        const valNum = Number(val);
        const length = this.state.acc.length - 1;
        const old  = this.state.acc.find((v,i) => i === length);
        const oldResult = Number(old.accResult);
        const sta = i === '입금'
        ? {accIn : valNum, accResult : oldResult + valNum}
        : {accOut : valNum, accResult : oldResult - valNum}
        const newAcc = [...this.state.acc, sta]
        this.setState({acc: newAcc})
    }
    render() {
        return(
            <div>
                <InputBox btnAcc = {this.btnAcc} />
                <AccountBook acc = {this.state.acc} />
            </div>
        )
    }

}
export default Account;

import React from 'react';
import Header from 'Header';
import View from 'View';
import ViewList from 'ViewList';

class App extends React.Component {
    state = {
     money: [{
         id: 1,
         number: 0,
         mnumber:0,
     }],
     inputValue: '',
     sum:0,
     sum2:0,
     sum3:0
    }
updateInputValue = (e) => {
    this.setState({
        inputValue: e.target.value
    });
}


click_deposit = () => {

    const number = this.state.inputValue;
    this.state.sum2 = Number(this.state.sum2) + Number(number)
    const sum2 = this.state.sum2
    this.sumFunc()
    this.setState({
        money: [...this.state.money, {
            id: Date.now(),
            number,
        }],
    });
};

click_withdraw = () => {
    const mnumber = this.state.inputValue;
    this.state.sum3 = Number(this.state.sum3) + Number(mnumber)
    const sum3 = this.state.sum3
    this.sumFunc()
    this.setState({
        money: [...this.state.money, {
            id: Date.now(),
            mnumber
        }],

    });
};
sumFunc = () => {
    const sum2 = this.state.sum2
    const sum3 = this.state.sum3
    const sum = Number(sum2) - Number(sum3)
    if(sum < 0) {
        alert('빚이 생겼습니다.')
    }
    this.setState({
        sum2: sum2,
        sum3 : sum3,
        sum : sum
    });
};
    render() {
        const {
            money,
            sum
        } = this.state

        return (
            <div>
                <Header
                    click_deposit =
                    {
                        this.click_deposit
                    }
                    click_withdraw =
                    {
                        this.click_withdraw
                    }
                    updateInputValue =
                    {
                        this.updateInputValue
                    }
                    />
                <ViewList
                    money={money}
                    sum={sum}
                />
            </div>
        )
    }
}

export default App;

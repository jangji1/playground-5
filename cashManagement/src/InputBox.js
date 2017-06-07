import React from 'react';

class InputBox extends React.Component{
    //input 값을 위한 state
    constructor(){
        super();
        this.state = {
            inputMoney : ''
        }
    }
    // state update
    updateMoeny(e){
        this.setState({
            inputMoney : e.target.value
        })
    };
    // state 리셋
    resetInputState(){
        this.setState({
            inputMoney : ''
        })
    };
    // 이벤트핸들러
    handleInputBox(e){
        const type = e.target.innerHTML;
        const money = this.state.inputMoney;
        this.props.handleMoney(money,type);
        this.resetInputState()
    }
    render(){
        const {
            inputMoney
        } = this.state;
        return (
            <div>
                <input type="text" placeholder="숫자를 입력해주세요" onChange={(e) => this.updateMoeny(e)} value={inputMoney}/>
                <button onClick={(e,money) => this.handleInputBox(e)}>입금</button>
                <button onClick={(e,money) => this.handleInputBox(e)}>출금</button>
            </div>
        )
    }
}
export default InputBox;
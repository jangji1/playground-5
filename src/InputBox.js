import React from 'react';

class InputBox extends React.Component {
    state = {val:''}
    buttonNames = ['입금', '출금']
    handleChange(e) {
        const nextVal = e.target.value;
        this.setState({val:nextVal});
    }
    render() {
        const buttons = this.buttonNames.map(i => (
            <button key={i} onClick={() => this.props.btnAcc(i, this.state.val)}>{i}</button>
        ))
        return(
            <div>
                <input type="number" onChange={this.handleChange.bind(this)}/>
                {buttons}
            </div>
        )
    }
}
export default InputBox;

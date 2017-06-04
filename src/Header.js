import React from 'react';

class Header extends React.Component {

    render() {
        return (
            <header>
                   <h1>금전 출납부</h1>
                   <input
                        type="text"
                        value=
                            {this.props.inputValue}
                        onChange=
                            {this.props.updateInputValue}
                    />
                   <button
                       className="deposit_button"
                       onClick={this.props.click_deposit}
                       >
                       입금
                   </button>
                   <button
                       onClick={this.props.click_withdraw}
                       >출금
                   </button>

           </header>
        )
    }
}
export default Header;

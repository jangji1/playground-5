import React from 'react';

class Header extends React.Component {
    state = {
        valued : 0
    }

    
    addDeposit = (deposit) => {     
        this.props.addDeposit(this.state.valued)  
        
    }
    
    addWithdraw = () => {
        this.props.addWithdraw(this.state.valued)
    }
    
    valueUp = e => {
        this.state.valued = e.target.value;
       
    }
    
 

    render() {
        
        return (
            <header>
               <input 
                    type="text"
                    onChange = {this.valueUp}
                    className = "add_number"
                />
                <button 
                    onClick = {this.addDeposit}
                >입금</button>
                <button
                    onClick = {this.addWithdraw}
                >출금</button>
                
            </header>
        );
    }
}


export default Header;



import React from 'react';
import Header from './Header';
import TableList from './TableList';


class App extends React.Component { 
    state = {       
                deposit : 0,
                withdraw : 0,
                balance : 0,
                depositTrue : false,
                withdrawTrue : false
            }
    
    
    addDeposit = (deposit) => {
        const balance = parseInt(this.state.balance);                
        deposit = parseInt(deposit);
        
        this.setState({
            deposit : deposit,
            withdraw : 0,
            balance : balance + deposit,
            depositTrue : true
        });        
        
        setTimeout(
               () => {
                   this.setState({
                       depositTrue: false
                   });
               }, 500
           );
       
    }
    
    addWithdraw = withdraw => {
        const balance = parseInt(this.state.balance);   
        withdraw = parseInt(withdraw);
        this.setState({
            deposit : 0,
            withdraw : withdraw,
            balance : balance - withdraw,
            withdrawTrue : true
        });
        
        setTimeout(
               () => {
                   this.setState({
                       withdrawTrue: false
                   });
               }, 500
           );
    }


    
    render() {      
        return (
            <div>
                <Header
                    addDeposit = {this.addDeposit}
                    addWithdraw = {this.addWithdraw}
                />
                <TableList 
                    deposit = {this.state.deposit}
                    withdraw = {this.state.withdraw}
                    balance = {this.state.balance}
                    depositTrue = {this.state.depositTrue}
                    withdrawTrue = {this.state.withdrawTrue}
                />   
            </div>
        );
    }
}

export default App;

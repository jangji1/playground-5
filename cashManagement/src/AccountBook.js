import React from 'react';

class AccountBook extends React.Component{
    render(){
        const {
            account
        } = this.props;
        const cols = ['입금', '출금','합계'];
        const colsData = cols.map((v,i) => (
            <span key={i}>{v}</span>
            ));

        const rowData = account.map((v,i) => (
            <div className="cont" key={i}>
                <span>{v.input}</span>
                <span>{v.output}</span>
                <span>{v.currentMoney}</span>
            </div>
        ));
        return (
            <div className="header">
                <h1>입출금내역</h1>
                {colsData}
                {rowData}
            </div>
        )
    }
}
export default AccountBook;
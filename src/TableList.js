import React from 'react';
import CN from 'classnames'

class TableList extends React.Component {
    render() {       
        const {
            deposit,
            withdraw,
            balance,
            depositTrue,
            withdrawTrue
        } = this.props;
        return (
            <div>
                <table className="deWi">
                    <colgroup>
                        <col style={{width:'33%'}} />
                        <col style={{width:'33%'}} />
                        <col style={{width:'33%'}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">입금</th>
                            <th scope="col">출금</th>
                            <th scope="col">잔액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={CN({deposit : depositTrue})}><p>{`${deposit}원`}</p></td>
                            <td></td>
                            <td style={{
                                color : balance < 0 ? 'red' : 'black'
                            }}>{`${balance}원`}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className={CN({withdraw : withdrawTrue})}>
                                           <p>{`${withdraw}원`}</p></td>
                            <td style={{
                                color : balance < 0 ? 'red' : 'black'
                            }}>{`${balance}원`}</td>
                        </tr>
                    </tbody>            
                </table>
            </div>
        );
    }
}

export default TableList;

import React from 'react';

class AccountBook extends React.Component {
    render() {
        const {acc, accIn, accOut, accResult} = this.props;
        const accList = acc.map( ({accIn, accOut, accResult}, i) =>
            <AccountList
                accIn = {accIn}
                accOut = {accOut}
                accResult = {accResult}
                key = {i}
            />
        )
        return (
            <table>
                <thead>
                    <tr>
                        <th scope="row">입금</th>
                        <th scope="row">출금</th>
                        <th scope="row">잔액</th>
                    </tr>
                </thead>
                <tbody>
                    {accList}
                </tbody>
            </table>
        )
    }
}
class AccountList extends React.Component {
    render() {
        const {accIn, accOut, accResult} = this.props;
        return (
            <tr>
                <td>{accIn}</td>
                <td>{accOut}</td>
                <td>{accResult}</td>
            </tr>
        )
    }
}
export default AccountBook;

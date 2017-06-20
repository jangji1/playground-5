import React from 'react';

const AccountBook = ({accountList}) => {
    const tableData = accountList.map(({type, money, result}, i) => (
        <tr key={i}>
            <td>{type === 'save' ? money : ''}</td>
            <td>{type === 'withdraw' ? money : ''}</td>
            <td>{result}</td>
        </tr>
    ));
    return (
        <table>
            <thead>
                <tr>
                    <th scope="row">입금</th>
                    <th scope="row">출금</th>
                    <th scope="row">계</th>
                </tr>
            </thead>
            <tbody>
                {tableData}
            </tbody>
        </table>
    );
};

export default AccountBook;

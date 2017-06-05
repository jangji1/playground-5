import React from 'react';

class Table extends React.Component {   
    render() {
        const {
            deposit,
            withdraw,
            balance
        } = this.props;
        return (
           <tr>
                <td>{deposit}</td>
                <td>{withdraw}</td>
                <td>{balance}</td>
            </tr>
        );
    }
}

export default Table;

import React from 'react';
import ClassNames from 'classnames';

class Row extends React.Component {
  render() {
    const {
      money,
      transaction,
      total
    } = this.props;
    return (
      <tr>
        <td>{transaction == 1? money : ''}</td>
        <td>{transaction == -1? money : ''}</td>
        <td>{total}</td>
      </tr>
    )
  }
}

export default Row;

import React from 'react';
import ClassNames from 'classnames';

class Row extends React.Component {
  render() {
    const {
      money,
      isDeposit,
      total
    } = this.props;
    return (
      <tr>
        <td>{isDeposit == 1? money : ''}</td>
        <td>{isDeposit == -1? money : ''}</td>
        <td>{total}</td>
      </tr>
    )
  }
}

export default Row;

import React from 'react';
import ClassNames from 'classnames';
import Row from './Row'

class List extends React.Component {
  render() {
    const {
      transaction
    } = this.props;

    const list = transaction.map(({ id, money, isDeposit, total }) => (
      <Row
          key={id}
          money={money}
          isDeposit={isDeposit}
          total={total}
      />
    ));
    return (
      <tbody>
          {list}
      </tbody>
    );
  }
}

export default List;

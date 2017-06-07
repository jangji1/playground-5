import React from 'react';
import ClassNames from 'classnames';
import Row from './Row'

class List extends React.Component {
  render() {
    const {
      account
    } = this.props;

    const list = account.map(({ id, money, transaction, total }) => (
      <Row
          key={id}
          money={money}
          transaction={transaction}
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

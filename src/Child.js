import React from 'react';
import PropTypes from 'prop-types';

class Child extends React.Component {
  render() {
    const { name, phone, show, handleClick } = this.props;
    return (
      <li onClick={handleClick}>
        <p>name: {name}</p>
        <p style={{
          display: show ? 'inline' : 'none'
        }}>
          {phone}
        </p>
      </li>
    );
  }
}

Child.defaultProps = {
    name : '이름없음',
    phone : '전화없음',
    show : true
}

Child.PropTypes = {
    name : PropTypes.string,
    phone : PropTypes.string,
    show : PropTypes.bool
}

export default Child;

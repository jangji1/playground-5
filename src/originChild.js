import React from 'react';
import PropTypes from 'prop-types';

class Child extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        phone: PropTypes.string.isRequired,
        show: PropTypes.bool
    };
//check할 때 필요.
    static defaultProps = {
        name: '이름없음',
        phone: '전화없음',
        show: true
    };
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


export default Child;


//static props 공부하기
//static method공부하기


//차일드에서 실행했는데 상위 컴포넌트에서 실행을 하게되었다.
//state나 props가 바뀔떄마다 렌더가 무조건 호출된다.

//이벤트를 전달하고 그걸 하위컴포넌트에서 실행시키고 호출시킨다.
//그러면 상위의 이벤트는 상위에서 변화하고 다시 전달해주는 방식으로
//반복시켜서 아래에서 위로 올리는 형식을 사용.



// 차일드에서 실행 되는데  props에서 받은걸 호출할수 있는 이유는
// 결국 타고올라가서인것같지만 맨위에있는것을 실행하게된다.

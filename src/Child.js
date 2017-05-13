import React from 'react';
import PropTypes from 'prop-types';

class Child extends React.Component {
  constructor() {
    super();
    this.state = { toggleColor: false };
  }
  componentWillMount() {
    console.log('1. 컴포넌트가 마운트될 예정입니다.');
  }
  componentDidMount() {
    console.log('2. 컴포넌트가 마운트되었습니다.');
  }
  componentWillReceiveProps(nextProps) {
    console.log('3. 컴포넌트가 새로운 props를 받을 예정입니다 : ', nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('4. 컴포넌트를 업데이트 해야할지 말지를 판단합니다 : ', nextProps, nextState);
    const shouldUpdate = confirm('업데이트 할까요?');
    return !!shouldUpdate;
  }
  //이부분이 중요하다. 조건을 어떻게 판단할 것인가? 그리고 왜 판단을 해야하는가?
  //클릭할때마다가 아니라 시간이 지나갈때마다 만든다면 브라우저에 flow를 하니까 엄청난 과부하를 발생시킨다.
  //정보는 계쏙 변하지만 렌더링만안해도 브라우저의 성능은 올라간다.
  //필요할 때만 넣어주면 된다. 만약에 4번이 없을경우는 무조건 true로 적용된다.


  componentWillUpdate(nextProps, nextState) {
    console.log('5. 컴포넌트가 업데이트될 예정입니다 : ', nextProps, nextState);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('6. 컴포넌트가 업데이트되었습니다 : ', prevProps, prevState);
  }
  componentWillUnmount() {
    console.log('7. 컴포넌트가 언마운트될 예정입니다.');
  }
  bgToggle(e) {
    this.setState({
      toggleColor: !this.state.toggleColor
      //자바스크립트와 다르게 접근한 순간에만 메모리에 접근이 가능하다. 나머진 날리겠따.
      console.dir(e)
      console.dir(e.nativeEvent)
      //이유는 Proxy라는 녀석이 돌려줬기 때문이다.
      //synthentic event라고 불리는 리액트 이벤트. 
    });
  }
  render() {
    const toggleColor = this.state.toggleColor;
    const list = this.props.list.map((v, i) => <li key={i}>{v}</li>);
    console.log('[[ 렌더 메소드가 호출되었습니다. ]]');
    return (
      <div>
        <ul style={{
          backgroundColor: toggleColor ? '#acf' : '#fca'
        }}>{list}</ul>
        <button onClick={()=> this.bgToggle()}>색상변경</button>
      </div>
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

import React from 'react';
import Child from './Child';


class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [0]
    }
    this.addChild = this.addChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
  }
  addChild() {
    const nextList = [...this.state.list];
    nextList.push(nextList.length);
    this.setState({ list: nextList });
  }
  removeChild() {
    const nextList = [...this.state.list];
    nextList.pop();
    this.setState({ list: nextList });
  }
  render() {
    if(!this.state.list.length) return (
      <button onClick={this.addChild}>자식 추가</button>
    );
    return (
      <div>
        <Child list={this.state.list} />
        <button onClick={this.addChild}>자식 추가</button>
        <button onClick={this.removeChild}>자식 삭제</button>
      </div>
    );
  }
}






export default Parent;

//         <div className ="a">
//             {/* 클래스는 클래스네임으로 이유는 자바스크립트 문법 안에 있기 때문에 자바스크립트로 해석한다. */}
//             <label htmlFor= "a">라벨</label>
//         {/* label for도 for문으로해석한다 그렇기에 htmlfor로 이유는 자바스크립트 문법 안에 있기 때문에 자바스크립트로 해석한다. */}
//         <input type="text" id = "a" />
//     <Child />
// {/* <Child title = />
// <Child /> */}





//CHild의 렌더내용이 그려지는거구나~

//JSX문법
//nested Element : 최상단에는 반드시 하나의 엘리먼트만 존재해야 한다. 즉, 여러 형제요소들은 반드시 부모요소로 감싸야 한다.
// '/'표시가 꼭 있어야함.
//<div /> 모든 태그 단일 태그로 표현 가능

import React from 'react';
//this bind를 안해주면 안됨 . 함수호출시 this 바인딩이 안됨!
//리액트에선 기본 바인딩이 window가 아니라 null 로 바인딩된다.
/*
    this 바인딩 방법
    1. constructor에서 바인딩 원본과 별개로 this bind가 된 함수를 자시닝 가진다.
    2. 사용할 부분에서 바인딩 render가 될때마다 실행된다
    3. e => this.handleKeyDown(e) null로 바인딩되는걸 사전에 방지
    4. 메서드 자체를 에로우펑션으로 만든다. 가장추천 아직은 상용화 되지않았다 2단계에 존재.
     handleKeyDown = e => {
        const text = e.target.value;
         if(!text || e.keyCode !== 13){
             return;
         }
         this.props.addTodo(text);
     }
*/

class Header extends React.Component{
    constructor(){
        super();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    handleKeyDown = e => {
      const text = e.target.value;
      if(!text || e.keyCode !== 13){
          return;
      }
      this.props.addTodo(text);
      e.target.value = '';
    };

    render(){
        return(
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input type="text" className="todo-app__new-todo" placeholder="What needs to be done?" onKeyDown={this.handleKeyDown}/>
                <button className="toggle-all"></button>
            </header>
        )
    }
}

export default Header;


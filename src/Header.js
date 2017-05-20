/*
    1. 선언될 때마다 this 바인딩
    onKeyDown={this.handler.bind(this)}

    2. 생성자메소드 내부에서 덮어씌우기
    constructor() {
        this.handler = this.handler.bind(this);
    }

    3. 애로우펑션으로 호출
    onKeyDown={e => this.handler(e)}

    4. 애로우펑션으로 정의(class property 선언방식(proposal2))
    handler = e => { };
 */

import React from 'react';

class Header extends React.Component {
    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode === 13) {
            return;
        }
        this.props.addTodo(text);
        e.target.value = '';
    }
    render() {
        return ( 
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={this.handleKeyDown}
                />
                <button className="toggle-all"></button>
            </header>
        );
    }
}

export default Header;
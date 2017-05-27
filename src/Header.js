import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {

    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13){
            return;
        }
        this.props.addTodo(text);
        e.target.value = '';
    }

    render(){
        const {
            isAllDone,
            toggleAll
        } = this.props
        return (
            <header>
                <h1 className="todo-app__header">totos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={this.handleKeyDown}
                />
                <button
                    className={ClassNames("toggle-all", {
                        checked : isAllDone
                    })}
                    onClick={toggleAll}
                />
            </header>
        );
    }
}

export default Header;

/*
    1. 선언될 떄마다 this 바인딩
    onkeydown = {this.handler.bind(this)}
    - 급할때
    - 비추천

    2. 생성자메소드 내부에서 덮어씌우기
    constructor(){
        this.handler = this.handler.bind(this)
    }
    - 여러군데 비교해야함
    - 협업시 불편함

    3. 애로우펑션으로 호출
    onKeyDown={e=> this.handler(e)}
    - 낫배드
    - 함수를 한번 더 감싼다는 단점
    - 실무에서 추천

    4. 애로우펑션으로 정의 (class property 선언방식(proposal2))
    handler = e => {};
    - 가장 추천하는 방식
    - 아직 정식 버전이 아님(위험할 수 있음)

*/

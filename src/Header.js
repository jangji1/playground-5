import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {
    handleKeyDown = e => { // 프로퍼티 자체에 애로우 펑션을 할당
        const text = e.target.value;
        if(!text || e.keyCode != 13) {
            return;
        }
        this.props.addTodo(text);
        e.target.value = ''; // addTodo 실행 값이 남아있으면 계속 실행됨
    };

    render() {
        const {
            isAllDone,
            toggleAll
        } = this.props;
        return (
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={this.handleKeyDown.bind(this)}
                />
                <button className={ClassNames('toggle-all', {
                    checked: isAllDone
                })}
                onClick={toggleAll}
            />
            </header>
        );
    }
}

export default Header;

/*

    1. 선언될 때마다 this 바인딩
    onKeyDown = {this.handler.bind(this)}
    급할때 많이 사용, 렌더 메소드 안에 온키다운이 걸린다. 렌더 호출뙬때마다 바인드 디스 걸림 메모리 성능상 좋지 않다.

    2. 생성자메소드 내부에서 덮어씌우기
    constructor() {
        this.handler = this.handler.bind(this);
    }
    협업시 별로
    인스턴스에서 메소드를 만든다.ㅠㅠ
    컨스트럭터에서 별도로 관리

    3. 애로푸펑션(this 바인딩 안함)으로 호출
    onKeyDown = { e => this.handler(e)}
    this 바인드가 안걸리는 애로우펑션
    함수를 한번 더 생성한다.

    4. 애로우펑션으로 정의 (class property 선언방식 (proposal2)) 가장 좋지만 아직...ㅠㅠ
    handler = e => {}; (Line.28)

*/

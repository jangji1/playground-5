import React from 'react';
import ClassNames from 'classnames';



class Header extends React.Component {
    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode != 13) {
            return;
        }
        this.props.addTodo(text);
    };
    // editTodo
    // saveTodo
    // cancelEdit
    render() {
        const {
            isAllDone,
            toggleAll
        } = this.props;
        //해체할당을 하면 기존에 있던 값이 각각 들어온다. 결과적으로 부모의 props값을 가져온다.
        return(
                <header>
                    <h1 className= "todo-app__header">todos</h1>
                    <input type="text"
                           className="todo-app__new-todo"
                           placeholder="What needs to be done?"
                           onKeyDown={this.handleKeyDown} />
                    {/*여기서의 디스는 헤더의 인스턴스이다 1. .bind(this)해줘라*/}
                    <button className={ClassNames('toggle-all', {
                            checked: isAllDone
                            })}
                            onClick={toggleAll}/>
                </header>
        );
    }

}
//일반적인 메서드 함수오출의 this는 객체, 콜백으로 다른 함수호출하면 윈도우객체
//이벤트핸들러의 경우 이벤트 걸어주는 대상이 this가 된다
//onKeyDown이 이벤트핸들러와 다르게 null로 기본적으로 바인딩 되어있다.

/*
handlekeydown은 프로토타입 함수
this 바인딩 방법
1. constructor 내에서 걸어준다 this.handler = this.handler.bind(this)
    많아질수록 일일이 하나씩 다 걸어줘야한다.
2. jsx 내에서 this.handle.bind(this) 렌더할때마다 키다운이벤트에 호출한 결과를 가지고 디스를 바인딩
    함수를 한번씩 더돌린다.
3. 핸들키다운을 메서드로 호출 디스는 다시 메서드드로 자기자신이들어감 함수내부에서 this를 다시호출
    jsx내에서 arrow function으로 e=>this.handleKeyDown(e)
4. 메서드 자체를 처음부터 arrow function으로 만든다.
    디스바인딩이 안된다는거는 본인이 현재위치한 this를 그대로 가져다 쓰는 것이다.
    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode != 13) {
            return;
        }
        this.props.addTodo(text);
    }
    stage 2미만이어야만 사용가능하다.
    프로토타입에 들어가지 않고 인스턴스 자신에게 프로퍼티를 할당하는 문제가 생기기 때문에
    메서드로써의 효용성이 떨어지게 되었다.
*/
export default Header;

import React from 'react';

class Todo extends React.Component {
    render() {
        const {
            text,
            deleteTodo
        } = this.props;
        // ㅂ받을거 두개이상이면 해체할당하는 것이 좋다.
        return(
                <li className="todo-item">
                    <button className="toggle"></button>
                    <div className="todo-item__view">
                        <div className="todo-item__view__text">{text}</div>
                        <button className="todo-item__destroy"
                                onclick={deleteTodo}></button>
                    </div>
                    <input type="text" className="todo-item__edit"/>
                </li>
        );
    }

}

export default Todo;

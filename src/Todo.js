import React from 'react';
import ClassNames from 'classnames';

class Todo extends React.Component {
    componentDidUpdate(prevProps) {
        if(this.props.isEditing && !prevProps.isEditing) {
            this._inputDOM.focus();
            this._inputDOM.value = this.props.text;
        }
    }
    handleKeyDown(e) { // 프로퍼티 자체에 애로우 펑션을 할당
        const text = e.target.value;
        if(!text || e.keyCode !== 13) {
            return;
        }
        this.props.saveTodo(text);
        // e.target.value = ''; // saveTodo 실행 값이 남아있으면 계속 실행됨
    };

    render() {
        const {
            text,
            isEditing,
            editTodo,
            isDone,
            deleteTodo,
            cancelEdit,
            toggleTodo
        } = this.props;
        return (
            <li className={ClassNames('todo-item',{
                editing: isEditing,
                completed: isDone
            })}>
                <button
                    className="toggle"
                    onClick={toggleTodo}
                />
                <div className="todo-item__view">
                    <div className="todo-item__view__text"
                         onDoubleClick={editTodo}
                        >{text}</div>
                    <button
                        className="todo-item__destroy"
                        onClick={deleteTodo}
                    />
                </div>
                <input
                    type="text"
                    ref={ref => {
                        this._inputDOM = ref;
                    }}
                    className="todo-item__edit"
                    onKeyDown={e => this.handleKeyDown(e)}
                    onBlur={cancelEdit}
                />
            </li>
        );
    }
}

export default Todo;

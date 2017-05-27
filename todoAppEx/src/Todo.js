import React from 'react';
import ClassNames from 'classnames';

class Todo extends React.Component {
    componentDidUpdate(prevProps){ // render 마무리 되었을때
        if(this.props.isEditing && !prevProps.isEditing){
            this._inputDOM.focus();
            this._inputDOM.value = this.props.text;
        }
    }
    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13){
            return;
        }
        this.props.saveTodo(text);
    };
    render() {
        const {
            text,
            deleteTodo,
            editTodo,
            isDone,
            isEditing,
            cancelEdit,
            togleTodo
        } = this.props;
        return (
            <li className={ClassNames('todo-item',
                {editing : isEditing,
                 completed: isDone}
                )}>
                <button className="toggle"
                        onClick={togleTodo}
                />
                <div className="todo-item__view">
                    <div className="todo-item__view__text" onDoubleClick={editTodo}>{text}</div>
                    <button className="todo-item__destroy" onClick={deleteTodo}/>
                </div>
                <input type="text"
                       className="todo-item__edit"
                       ref = {ref => this._inputDOM = ref}
                       onKeyDown={this.handleKeyDown}
                       onBlur={cancelEdit}
                />
            </li>
        )
    }
}

export default Todo;
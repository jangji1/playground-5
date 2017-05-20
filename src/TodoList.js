import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
    render() {
        const todoList = this.props.todos.map(({ id, text, isDone }) => (
            <Todo 
                key={id}
                text={text}
                isDone={isDone}
                deleteTodo={() => this.props.deleteTodo(id)}
            />
        ));

        return (
            <div className="todo-app__main">
                <ul className="todo-list">
                     {todoList}
                </ul>
            </div>
        );
    }
}

export default TodoList;
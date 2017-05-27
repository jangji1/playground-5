import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component{
    render(){
        const {
            todos,
            deleteTodo,
            saveTodo,
            editingId,
            editTodo,
            cancelEdit,
            togleTodo
        } = this.props;
        const todoList = todos.map(({id, text ,isDone}) =>
            <Todo text={text}
                  isDone={isDone}
                  isEditing={editingId === id}
                  editTodo={() => editTodo(id)}
                  key={id}
                  deleteTodo={() => deleteTodo(id)}
                  saveTodo = {text => saveTodo(id,text)}
                  cancelEdit = {cancelEdit}
                  togleTodo = {() => togleTodo(id)}
            />);
        return(
           <div className="todo-app__main">
                <ul className="todo-list">
                    {todoList}
                </ul>
           </div>
        )
    }
}

export default TodoList;
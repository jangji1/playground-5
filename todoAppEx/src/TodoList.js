import React from 'react';
import Todo from './Todo';
/*import Todo from './Todo';*/

class TodoList extends React.Component{
    render(){
        const {
            todos,
            deleteTodo,
        } = this.props;
        const todoList = todos.map(({id, text ,isDone}) =>
            <Todo text={text} isDone={isDone} key={id} deleteTodo={() => deleteTodo(id)}/>);
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
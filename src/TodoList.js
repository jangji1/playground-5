import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {

    render() {
        const {
            todos,
            deleteTodo,
            saveTodo,
            editTodo,
            editingId,
            cancelEdit,
            toggleTodo
        } = this.props;

        const todoList = todos.map(({id, text, isDone}) =>  (
        <Todo   text={text}
                isDone ={isDone}
                key={id}
                isEditing={editingId === id}
                editTodo={()=> editTodo(id)}
                deleteTodo = {() => deleteTodo(id)}
                saveTodo={(text) => saveTodo(id, text)}
                cancelEdit={cancelEdit}
                toggleTodo={() => toggleTodo(id)}
        />
        ))

        return(
                <div className="todo-app__main">
                    <ul className="todo-list">

                        {/*<Todo text={this.state.todos[0]} />*/}
                        {/*<Todo text={this.state.todos[1]}/>*/}
                        {/*<Todo text={this.state.todos[2]}/>*/}
                        {/* {this.props.todos.map((v, i) => <Todo text={v} key={i} />)} */}
                        {todoList}

                    </ul>
                </div>
        );
    }

}

export default TodoList;

import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {

    state = {
        todos : [{
            id : 1000,
            text : '치킨에  맥주',
            isDone : false
        }, {
            id : 1001,
            text : '삼겹에 소주',
            isDone : false
        }, {
            id : 1002,
            text : '김떡순',
            isDone : false
        }],
        editingId : null
    };

    addTodo = text => {
        this.setState({
            todos: [... this.state.todos, {
                id : Date.now(),
                text,
                isDone : false
            }]
        });
    }

    deleteTodo = id => {
        const newTodos = [... this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id == id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos : newTodos
        })
    }

    editTodo = id => {
        this.setState({
            editingId : id
        })
    }

    saveTodo = (id, newText) => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id == id);
        newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
            text : newText
        });
        this.setState({
            todos : newTodos,
            editingId : null
        });
    }

    cancelEdit = () => {
        this.setState({
            editingId : null
        });
    };

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id == id);
        newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
            isDone : !newTodos[editIndex].isDone
        });
        this.setState({
            todos : newTodos
        });
    }

    toggleAll = () => {

        // const allIsDone = !this.state.todos.every(v => v.isDone); // 전부 해당될때
        const newDone = this.state.todos.some(v => !v.isDone);  // 일부만 해당될때
        const newTodos = this.state.todos.map(v =>
            Object.assign({}, v, {
                isDone : newDone
            })
        );
        this.setState({
            todos : newTodos
        });

    }

    clearCompleted = () => {
        const newTodos = this.state.todos.filter(v => !v.isDone);
        this.setState({
            todos : newTodos
        })
    }

    render(){

        const {
            todos,
            editingId
        } = this.state;

        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >= 0 ;

        return (
            <div className="todo-app">
                <Header
                    isAllDone={todos.every(v => v.isDone)}
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                />
                <TodoList
                    todos={todos}
                    editingId={editingId}
                    deleteTodo={this.deleteTodo}
                    editTodo={this.editTodo}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    toggleTodo={this.toggleTodo}
                />
                <Footer
                    activeLength={activeLength}
                    clearCompleted={this.clearCompleted}
                    hasCompleted={hasCompleted}
                />
            </div>
        );
    }
}

export default App;

import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    state = {
        todos: [{
            id: 1000,
            text: '치킨에 맥주',
            isDone: false
        }, {
            id: 1001,
            text: '삽겹살에 쏘주',
            isDone: false
        }, {
            id: 1002,
            text: '떡순튀',
            isDone: true
        }],
        editingId: null,
        filterName: 'All'
    };

    selectFilter = name => {
        this.setState({
            filterName: name
        });
    };

    addTodo = text => {
        this.setState({
            todos: [...this.state.todos, {
                id: Date.now(),
                text,
                isDone: false
            }]
        });
    };

    deleteTodo = id => {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos: newTodos
        });
    };

    editTodo = id => {
        this.setState({
            editingId: id
        });
    };

    saveTodo = (id, newText) => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
            text: newText
        });
        this.setState({
            todos: newTodos,
            editingId: null
        });
    };

    cancelEdit = () => {
        this.setState({
            editingId: null
        });
    };

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
            isDone: !newTodos[editIndex].isDone
        });
        this.setState({
            todos: newTodos
        });
    };

    toggleAll = () => {
        const newDone = this.state.todos.some(v => !v.isDone);
        const newTodos = this.state.todos.map(v =>
            Object.assign({}, v, {
                isDone: newDone
            })
        );
        this.setState({
            todos: newTodos
        });
    };

    clearCompleted = () => {
        const newTodos = this.state.todos.filter(v => !v.isDone);
        this.setState({
            todos: newTodos
        });
    };

    render() {
        const {
            todos,
            editingId,
            filterName
        } = this.state;

        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >= 0;

        const filteredTodos = filterName === 'All'
            ? todos
            : todos.filter(v => (
                (filterName === 'Completed' && v.isDone)
                || (filterName === 'Active' && !v.isDone)
            ));

        return (
            <div className="todo-app">
                <Header
                    isAllDone={todos.every(v => v.isDone)}
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                />
                <TodoList
                    todos={filteredTodos}
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
                    filterName={filterName}
                    selectFilter={this.selectFilter}
                />
            </div>
        );
    }
}

export default App;

import React from 'react';
import axios from 'axios';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const ax = axios.create({
    baseURL: 'http://localhost:2403/todos'
});

class App extends React.Component {
    state = {
        todos: [],
        editingId: null,
        filterName: 'All'
    };

    componentWillMount() {
        ax.get('/')
        .then(res => {
            this.setState({
                todos: res.data
            });
        });
    }

    selectFilter = name => {
        this.setState({
            filterName: name
        });
    };

    addTodo = text => {
        ax.post('/', { text })
        .then(res => {
            this.setState({
                todos: [...this.state.todos, res.data]
            });
        });
    };

    deleteTodo = id => {
        ax.delete(`/${id}`)
        .then(() => {
            const newTodos = [...this.state.todos];
            const deleteIndex = newTodos.findIndex(v => v.id === id);
            newTodos.splice(deleteIndex, 1);
            this.setState({
                todos: newTodos
            });
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

        ax.put(`/${id}`, {
            text: newText
        }).then(res => {
            newTodos[editIndex] = res.data;
            this.setState({
                todos: newTodos,
                editingId: null
            });
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

        ax.put(`/${id}`, {
            isDone: !newTodos[editIndex].isDone
        }).then(res => {
            newTodos[editIndex] = res.data;
            this.setState({
                todos: newTodos
            });
        });
    };

    toggleAll = () => {
        const newDone = this.state.todos.some(v => !v.isDone);

        const axArray = this.state.todos.map(v => ax.put(`/${v.id}`, {
            isDone: newDone
        }));

        axios.all(axArray).then(res => {
            this.setState({
                todos: res.map(v => v.data)
            });
        });
    };

    clearCompleted = () => {
        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${v.id}`));

        axios.all(axArray).then(() => {
            const newTodos = this.state.todos.filter(v => !v.isDone);
            this.setState({
                todos: newTodos
            });
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

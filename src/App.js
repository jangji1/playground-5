import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

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
    };

    componentWillMount() {
        ax.get('/')
        .then(res => {
            this.setState({
                todos: res.data
            });
        });
    }

    addTodo = text => {
        ax.post('/', { text })
        .then(res => {
            this.setState(
                update(this.state, {
                    todos: {
                        $push: [ res.data ]
                    }
                })
            );
        });
    };

    deleteTodo = id => {
        const prevTodos = [...this.state.todos];
        const deleteIndex = prevTodos.findIndex(v => v.id === id);
        const newTodos = update(prevTodos, {
            $splice: [
                [ deleteIndex, 1]
            ]
        });
        this.setState({
            todos: newTodos
        });

        ax.delete(`/${id}`)
        .catch(() => {
            this.setState({
                todos: prevTodos
            });
        });
    };

    editTodo = id => {
        this.setState({
            editingId: id
        });
    };

    saveTodo = (id, newText) => {
        const prevTodos = [...this.state.todos];
        const editIndex = prevTodos.findIndex(v => v.id === id);
        const newTodos = update(prevTodos, {
            [editIndex]: {
                text: {
                    $set: newText
                }
            }
        });
        this.setState({
            todos: newTodos,
            editingId: null
        });

        ax.put(`/${id}`, {
            text: newText
        }).catch(() => {
            this.setState({
                todos: prevTodos
            });
        });
    };

    cancelEdit = () => {
        this.setState({
            editingId: null
        });
    };

    toggleTodo = id => {
        const prevTodos = [...this.state.todos];
        const editIndex = prevTodos.findIndex(v => v.id === id);
        const newDone = !prevTodos[editIndex].isDone;
        const newTodos = update(prevTodos, {
            [editIndex]: {
                isDone: {
                    $set: newDone
                }
            }
        });
        this.setState({
            todos: newTodos
        });

        ax.put(`/${id}`, {
            isDone: newDone
        }).catch(() => {
            this.setState({
                todos: prevTodos
            });
        });
    };

    toggleAll = () => {
        const prevTodos = [...this.state.todos];
        const newDone = prevTodos.some(v => !v.isDone);
        const newTodos = update(prevTodos, {
            $apply: todos => todos.map(v => update(v, {
                isDone: {
                    $set: newDone
                }
            }))
        });
        this.setState({
            todos: newTodos
        });

        const axArray = prevTodos.map(v => ax.put(`/${v.id}`, {
            isDone: newDone
        }));

        axios.all(axArray).catch(() => {
            this.setState({
                todos: prevTodos
            });
        });
    };

    clearCompleted = () => {
        const prevTodos = [...this.state.todos];
        const newTodos = update(prevTodos, {
            $apply: todos => todos.filter(v => !v.isDone)
        });
        this.setState({
            todos: newTodos
        });

        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${v.id}`));

        axios.all(axArray).catch(() => {
            this.setState({
                todos: prevTodos
            });
        });
    };

    render() {
        const {
            todos,
            editingId
        } = this.state;

        const {
            match: {
                params
            }
        } = this.props;
        const filterName = params.filterName || '';

        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >= 0;

        const filteredTodos = !filterName
            ? todos
            : todos.filter(v => (
                (filterName === 'completed' && v.isDone)
                || (filterName === 'active' && !v.isDone)
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
                />
            </div>
        );
    }
}

export default App;

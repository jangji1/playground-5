import React from 'react';
import { connect } from 'react-redux';


import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import TodoActions from '../actions/TodoActions';

const mapStateToProps = state => ({
    todos: state.todos,
    editingId: state.editingId
});
const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(TodoActions.getTodos()),
    addTodo: text => dispatch(TodoActions.addTodo(text)),
    deleteTodo: id => dispatch(TodoActions.deleteTodo(id)),
    editTodo: id => dispatch(TodoActions.editTodo(id)),
    saveTodo: (id, newText) => dispatch(TodoActions.saveTodo(id, newText)),
    cancelEdit: () => dispatch(TodoActions.cancelEdit()),
    toggleTodo: id => dispatch(TodoActions.toggleTodo(id)),
    toggleAll: () => dispatch(TodoActions.toggleAll()),
    clearCompleted: () => dispatch(TodoActions.clearCompleted())
});

class App extends React.Component {

    componentWillMount() {
        this.props.getTodos();
    }

    /*
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
    */

    render() {
        const {
            todos,
            editingId,
            addTodo,
            deleteTodo,
            editTodo,
            saveTodo,
            cancelEdit,
            toggleTodo,
            toggleAll,
            clearCompleted
        } = this.props;

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
                    addTodo={addTodo}
                    toggleAll={toggleAll}
                />
                <TodoList
                    todos={filteredTodos}
                    editingId={editingId}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    saveTodo={saveTodo}
                    cancelEdit={cancelEdit}
                    toggleTodo={toggleTodo}
                />
                <Footer
                    activeLength={activeLength}
                    clearCompleted={clearCompleted}
                    hasCompleted={hasCompleted}
                    filterName={filterName}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import axios from 'axios';
import update from 'immutability-helper'

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const ax = axios.create({
    baseURL : 'http://localhost:2403/todos'
})

class App extends React.Component {
    state = {
        todos: [],
        editingId: null,
        filterName: 'all'
    }
    componentWillMount(){
        ax.get('/')
        .then(res => {
            this.setState({
                todos: res.data
            })
        })
    }
    selectFilter = name => {
        this.setState({
            filterName : name
        })
    }
    addTodo = text => {
        ax.post('/', { text })
        .then(res => {
            this.setState(
                update(this.state, {
                    todos: {
                        $push: [res.data]
                    }
                })
            )
        })
        // this.setState({
        //     todos: [...this.state.todos, {
        //         text,
        //         isDone: false,
        //         id: Date.now()
        //     }]
        // })
    }
    deleteTodo = id => {
        const prevTodos = [...this.state.todos]
        const deleteIndex = prevTodos.findIndex(v => v.id === id);
        const newTodos = update(prevTodos,{
            $splice: [
                [deleteIndex, 1]
            ]
        });
        this.setState({
            todos: newTodos
        });
        ax.delete(`/${id}`)
        .catch(() => {
            this.setState({
                todos: prevTodos
            })
            // const newTodos = [...this.state.todos];
            // const deleteIndex = newTodos.findIndex(v => v.id === id);
            // newTodos.splice(deleteIndex, 1);
            // this.setState({
            //     todos: newTodos
            // });
        })
    }
    editTodo = id => {
        this.setState({
            editingId: id
        });
    }
    saveTodo = (id, newText) => {
        const prevTodos = [...this.state.todos];
        const editIndex = prevTodos.findIndex(v => v.id === id);
        const newTodos = update(prevTodos, {
            [editIndex]: {
                text: {
                    $set: newText
                }
            }
        })
        this.setState({
            todos: newTodos,
            editingId: null
        })
        ax.put(`/${id}`, {
            text: newText
        }).catch(() => {
            this.setState({
                todos: prevTodos
            })
        })
        // newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
        //     text: newText
        // });
    }
    cancelEdit = () => {
        this.setState({
            editingId: null
        })
    }
    toggleTodo = id => {
        const prevTodos = [...this.state.todos];
        const editIndex = prevTodos.findIndex(v => v.id === id);
        const newDone = !newTodos[editIndex].isDone
        const newTodos = update(prevTodos, {
            [editIndex]: {
                isDone: {
                    $set: newDone
                }
            }
        })
        this.setState({
            todos: newTodos
        })
        ax.put(`/${id}`, {
            isDone :  newDone
        }).then(res => {
            this.setState({
                todos: prevTodos
            })
        })
        // newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
        //     isDone: !newTodos[editIndex].isDone
        // });
    }
    toggleAll = () => {
        const newDone = this.state.todos.some(v => !v.isDone);
        const axArray = this.state.todos.map(v => ax.put(`/${v.id}`, {
            isDone: newDone
        }));

        axios.all(axArray).then(res => {
            this.setState({
                todos: res.map(v => v.data)
            })
        });
        // const newTodos = this.state.todos.map(v =>
        //     Object.assign({}, v, {
        //         isDone: newDone
        //     })
        // );
        // this.setState({
        //     todos: newTodos
        // })
    }
    clearCompleted = () => {
        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${v.id}`));
        axios.all(axArray).then(()=>{
            const newTodos = this.state.todos.filter(v => !v.isDone);
            this.setState({
                todos: newTodos
            })
        })
    }
    render(){
        const {
            todos,
            editingId,
            filterName
        } = this.state;
        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >= 0;
        const filteredTodos = filterName === 'all'
            ? todos
            : todos.filter(v => (
            (filterName === 'completed' && v.isDone)
            || (filterName === 'active' && !v.isDone)
        ))
        return (
            <div className="todo-app">
                <Header
                    isAllDone = {todos.every(v => v.isDone)}
                    addTodo = {this.addTodo}
                    toggleAll = {this.toggleAll}
                />
                <TodoList
                    todos = {filteredTodos}
                    editingId = {editingId}
                    deleteTodo = {this.deleteTodo}
                    saveTodo = {this.saveTodo}
                    editTodo = {this.editTodo}
                    cancelEdit = {this.cancelEdit}
                    toggleTodo = {this.toggleTodo}
                />
                <Footer
                    activeLength = {activeLength}
                    clearCompleted = {this.clearCompleted}
                    hasCompleted = {hasCompleted}
                    filterName = {filterName}
                    selectFilter = {this.selectFilter}
                />
            </div>
        )
    }
}

export default App;

import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos : [
                {
                    text : 'hungry',
                    isDone : false,
                    id : 1000
                },
                {
                    text : 'chiken',
                    isDone : false,
                    id : 1001
                },
                {
                    text : 'sleep',
                    isDone : false,
                    id : 1002
                }


            ]
        };
    }
    appTodo = text => {
        this.setState({
            todos: [...this.state.todos, {
                text: text,
                isDone: false,
                id: Date.now()
            }]
        });
    }
    deleteTodo = id => {
        const newTodos = [...this.state.todos];

    const deleteIndex = newTodos.findIndex(v => v.id === id);
    newTodos.splice(deleteIndex, 1)
    this.setState({
        todos: newTodos
    });
    }

    render() {
        return(
            <div className="todo-app">
                <Header addTodo="{this.addTodo}" />
                <Todo
        )
    }
}
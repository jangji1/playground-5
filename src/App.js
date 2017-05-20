import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [{
                id: 1000,
                text: '파스타에 콜라',
                isDone: false
            }, {
                id: 1001,
                text: '떡볶이에 오뎅',
                isDone: false
            }, {
                id: 1002,
                text: '치킨에 맥주',
                isDone: true
            }]
        };
    }
    addTodo = text => {
        this.setState({
            todos: [...this.state.todos, {  /* SpreadOperator 사용 arr.push 는 리턴값이 이상함 */
                id: Date.now(),
                text,
                isDone: false
            }]
        });
    }
    deleteTodo = id => {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos: newTodos
        });
    };

    render() {
        return (
            <div className="todo-app">
                <Header
                    addTodo={this.addTodo}
                />
                <TodoList
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo}
                />
                <Footer />
            </div>
        );
    }
}

export default App;

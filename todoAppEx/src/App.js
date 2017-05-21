import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

//형제간의 데이터 통신이필요할때 부모로 올려서 처리
//this.state.todos.push -> setState를 거치지않고 임의의 변경은 절대로 해서는 안된다.
//기존 state를 깊은복사로 새로 만들고 push를 하면 되나 그것보단 [...this.state.todos , text] 이렇게 하자

//addTodo 자기자신이 호출한게아니라 Header에서 호출이되서 올라와서 this.props가 this가 되어버려서 this 바인딩이 필요

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            todos : [
                {
                    text : '배고파',
                    isDone : false,
                    id : 1000
                },
                {
                    text : '밥줘',
                    isDone : false,
                    id : 1001
                },
                {
                    text : '졸려',
                    isDone : true,
                    id : 1002
                }
            ]
        };
    }
    addTodo = text => {
        this.setState({
            todos : [...this.state.todos , {
                text : text,
                isDone : false,
                id : Date.now()
            }]
        });
    };
    deleteTodo = id => {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos : newTodos
        })
    };
    render(){
        return(
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo}/>
                <Footer/>
            </div>
        );
    }
}

export default App;
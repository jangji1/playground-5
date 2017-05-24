import React from 'react';
import TodoList
                    id : 1002
                }
            ]

        };
    }
    addTodo = text => {
        // this.state.todos.push(text); 담는변수는 추가한 length가 나온다, 바로넣으면 안된다.
        // 절대로 바로 바꾸면 안된다. state 임의로 바꾸는 것을 피해야한다
        // newTodos라는 걸로 기존의 todos를 복사하고, 그 newTodos.push하고 setState

        this.setState({
            todos: [...this.state.todos, {
                text : text,
                isDone: false,
                id: Date.now()
            }]
        });
    }
    deleteTodo(id) {
        const newTodos = [...this.state.todos]; from './TodoList';
        import Todo from './Todo';
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
                            text : 'rice',
                            isDone : false,
                            id : 1001
                        },
                        {
                            text : 'sleep',
                            isDone : false,
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1)
        this.setState({
            todos: newTodos
        });
    }
    render() {
        return(
            <div className="todo-app">
                <Header addTodo={this.addTodo} />
                <TodoList    todos={this.state.todos}
                             deleteTodo={this.deleteTodo}/>
                <Footer />
            </div>
        );
    }

}
//header는 이벤트리스너 this바인딩이 널로되서 한거
//addtodo호출대상이 자기자신을 호출한게 아니라 props호출된게 다시호출됬기 때문에 this가 달라져서
//this바인딩을 해주는 것이다
export default App;

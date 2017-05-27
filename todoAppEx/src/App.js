import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

//형제간의 데이터 통신이필요할때 부모로 올려서 처리
//this.state.todos.push -> setState를 거치지않고 임의의 변경은 절대로 해서는 안된다.
//기존 state를 깊은복사로 새로 만들고 push를 하면 되나 그것보단 [...this.state.todos , text] 이렇게 하자

//addTodo 자기자신이 호출한게아니라 Header에서 호출이되서 올라와서 this.props가 this가 되어버려서 this 바인딩이 필요

class App extends React.Component {
    state = {
        todos: [
            {
                text: '배고파',
                isDone: false,
                id: 1000
            },
            {
                text: '밥줘',
                isDone: false,
                id: 1001
            },
            {
                text: '졸려',
                isDone: true,
                id: 1002
            }
        ],
        editingId: null
    };

    addTodo = text => {
        this.setState({
            todos: [...this.state.todos, {
                text: text,
                isDone: false,
                id: Date.now()
            }]
        });
    };
    deleteTodo = id => {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos: newTodos
        })
    };
    editTodo = id => { // 수정
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
            editingId : null
        })
    };
    cancelEdit = () => {
        this.setState({
            editingId : null
        })
    };
    togleTodo = id => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
            isDone : !newTodos[editIndex].isDone
        });
        this.setState({
            todos: newTodos,
        })
    };
    toggleAll = () => { // every , some 전부순회하느냐 하나만 되도 하느냐
        const newDone = this.state.todos.some(v => !v.isDone);
        const newTodos = this.state.todos.map(v => Object.assign({}, v, {
            isDone : newDone
            })
        );
        this.setState({
            todos : newTodos
        });
    };
    clearCompleted = () => {
        const newTodos = this.state.todos.filter(v => !v.isDone);
        this.setState({
            todos : newTodos
        })
    };
    render() {
        const {
            todos,
            editingId
        }= this.state;
        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) > 0;
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo}
                        toggleAll={this.toggleAll}
                        isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList todos={todos}
                          deleteTodo={this.deleteTodo}
                          editingId={editingId}
                          editTodo={this.editTodo}
                          saveTodo={this.saveTodo}
                          cancelEdit = {this.cancelEdit}
                          togleTodo = {this.togleTodo}/>
                <Footer clearCompleted={this.clearCompleted}
                        activeLength = {activeLength}
                        hasCompleted = {hasCompleted}/>
            </div>
        );
    }
}

export default App;
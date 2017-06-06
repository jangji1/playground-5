import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';
import axios from 'axios';

const ax = axios.create({
    baseURL : 'http://localhost:2403/todos'
});

//형제간의 데이터 통신이필요할때 부모로 올려서 처리
//this.state.todos.push -> setState를 거치지않고 임의의 변경은 절대로 해서는 안된다.
//기존 state를 깊은복사로 새로 만들고 push를 하면 되나 그것보단 [...this.state.todos , text] 이렇게 하자

//addTodo 자기자신이 호출한게아니라 Header에서 호출이되서 올라와서 this.props가 this가 되어버려서 this 바인딩이 필요

class App extends React.Component {
    // render는 무조건 2 번실행된다 ... 비동기기 떄문에 ..
    componentWillMount(){
        ax.get('/')
        .then(res => {
            this.setState({
                todos : res.data
            })
        });
    }

    state = {
        todos: [],
        editingId: null,
        filterName: 'All'
    };

    setlectFilter = filterName => {
        this.setState({
            filterName
        })
    };

    addTodo = text => {
        ax.post('/', {text})
            .then(res => {
                this.setState({
                    todos: [...this.state.todos, res.data]
                });
            })
    };
    deleteTodo = id => {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);

        ax.delete(`/${id}`)
            .then(() => {
                newTodos.splice(deleteIndex, 1);
                this.setState({
                    todos: newTodos
                })
            });
    };
    editTodo = id => { // 수정
        this.setState({
            editingId: id
        });
    };
    saveTodo = (id, newText) => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        ax.put(`/${id}`, {text : newText})
            .then(res => {
                newTodos[editIndex] = res.data;
                this.setState({
                    todos: newTodos,
                    editingId: null
                })
            });
    };
    cancelEdit = () => {
        this.setState({
            editingId: null
        })
    };
    togleTodo = id => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        ax.put(`/${id}`,{isDone : !newTodos[editIndex].isDone})
            .then(res => {
                newTodos[editIndex] = res.data;
                this.setState({
                    todos: newTodos,
                })
            });
    };
    toggleAll = () => { // every , some 전부순회하느냐 하나만 되도 하느냐
        const newDone = this.state.todos.some(v => !v.isDone);
        const axArray = this.state.todos.map(v => (
            ax.put(`/${v.id}`, {isDone : newDone})
        ));

        axios.all(axArray)
            .then(res => {
                this.setState({
                    todos: res.map(v => v.data)
                });
            });
    };
    clearCompleted = () => { // 완료 된애들 , 완료안된애들 db 삭제때문에 나눔
        const newTodos = this.state.todos.filter(v => !v.isDone);
        const axArray = this.state.todos.filter(v => v.isDone)
            .map(v => {
                ax.delete(`/${v.id}`)
            });
        axios.all(axArray).then(() => {
            this.setState({
                todos: newTodos
            })
        });
    };

    render() {
        const {
            todos,
            editingId,
            filterName
        }= this.state;
        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >=  0;
        const filteredTodos = filterName === 'All' ? todos : todos.filter(v => (
                (filterName === 'Active' && !v.isDone) ||
                (filterName === 'Completed' && v.isDone)
            ));
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo}
                        toggleAll={this.toggleAll}
                        isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList todos={filteredTodos}
                          deleteTodo={this.deleteTodo}
                          editingId={editingId}
                          editTodo={this.editTodo}
                          saveTodo={this.saveTodo}
                          cancelEdit={this.cancelEdit}
                          togleTodo={this.togleTodo}
                />
                <Footer clearCompleted={this.clearCompleted}
                        activeLength={activeLength}
                        hasCompleted={hasCompleted}
                        setlectFilter={this.setlectFilter}
                        filterName={filterName}
                />
            </div>
        );
    }
}

export default App;
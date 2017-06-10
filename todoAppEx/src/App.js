import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';
import axios from 'axios';
import update from 'immutability-helper';

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
    };

    addTodo = text => {
        ax.post('/', {text})
            .then(res => {
                this.setState({
                    todos: update(this.state.todos, {
                        $push : [res.data]
                    })
                    /*[...this.state.todos, res.data]*/
                });
            })
    };

    deleteTodo = id => { // 낙관적 업데이트
        const preveTodos = [...this.state.todos];
        const deleteIndex = this.state.todos.findIndex(v => v.id === id);
        const newTodos = update(preveTodos, {
            $splice : [
                [deleteIndex, 1]
            ]
        });
        this.setState({
            todos :  newTodos
        });

        ax.delete(`/${id}`)
            .catch(() => {
                this.setState({
                    todos : preveTodos
                })
            })
    };

    editTodo = id => { // 수정
        this.setState({
            editingId: id
        });
    };

    saveTodo = (id, newText) => {
        const preveTodos = [...this.state.todos];
        const editIndex = preveTodos.findIndex(v => v.id === id);
        const newTodos = update(preveTodos, { // 인덱스로 접근
           [editIndex] : {
               text : {
                   $set : newText
               }
           }
        });
        this.setState({
            todos: newTodos,
            editingId: null
        });
        ax.put(`/${id}`, {text : newText})
            .catch(()=>{
                this.setState({
                    todos : preveTodos
                })
            })
    };
    cancelEdit = () => {
        this.setState({
            editingId: null
        })
    };
    togleTodo = id => {
        const preveTodos = [...this.state.todos];
        const editIndex = preveTodos.findIndex(v => v.id === id);
        const newDone = !preveTodos[editIndex].isDone;
        const newTodos = update(preveTodos, {
            [editIndex] :{
                isDone : {
                    $set : newDone
                }
            }
        });
        this.setState({
            todos : newTodos
        });
        ax.put(`/${id}`,{isDone : newDone})
            .catch(() => {
                this.setState({
                    todos : preveTodos
                })
            });
    };
    toggleAll = () => { // every , some 전부순회하느냐 하나만 되도 하느냐
        const preveTodos = [...this.state.todos];
        const newDone = preveTodos.some(v => !v.isDone);
        const newTodos = preveTodos.map(v => update(v, {
            isDone : {
                $set : newDone
            }
        }));
        this.setState({
            todos : newTodos
        });

        const axArray = preveTodos.map(v => (
            ax.put(`/${v.id}`, {isDone : newDone})
        ));

        axios.all(axArray)
            .catch(()=>{
            this.setState({todos : preveTodos})
            })
    };
    clearCompleted = () => { // 완료 된애들 , 완료안된애들 db 삭제때문에 나눔
        const preveTodos = [...this.state.todos];
        const newTodos = update(preveTodos, {
            $apply : todos => todos.filter(v => !v.isDone)
        });

        this.setState({
            todos : newTodos
        });

        const axArray = preveTodos.filter(v => v.isDone)
            .map(v => {
                ax.delete(`/${v.id}`)
            });
        axios.all(axArray).catch(()=>{
            this.setState({todos : preveTodos});
        })
    };

    render() {
        const {
            todos,
            editingId,
        }= this.state;
        const {
            match : {
                params
            }
        } = this.props;

        const filterName = params.filterName || '';
        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >=  0;
        const filteredTodos = !filterName ? todos : todos.filter(v => (
                (filterName === 'active' && !v.isDone) || // 대소문자를 구별못한다.
                (filterName === 'completed' && v.isDone)
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
                        filterName={filterName}
                />
            </div>
        );
    }
}

export default App;
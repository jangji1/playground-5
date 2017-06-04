import React from 'react';
import axios from 'axios';
import update from 'immutability-helper'
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
        filterName: 'All'
    };

    // componentWillMount() { //최초렌더링직후
    //     //setstate
    // }
    componentWillMount() {
        ax.get('/')
        .then(res => {
            console.dir(res);
            this.setState({
                todos: res.data
            });
        });
    }

    selectFilter = name => {
        this.setState({
            filterName: name
        });
    };

    addTodo = text => {
        ax.post('/', { text })
        .then(res => {
            console.dir(res);
            this.setState({
                update(this.state, {
                    todos: {
                        $push: [ res.data ]
                    }
                })
                // todos: update(this.state)
                // todos: [...this.state.todos, res.data]
                })
        })
    };

    deleteTodo = id => {
        ax.delete(`/${id}`)
        .then(() => {
            const deleteIndex = newTodos.findIndex(v => v.id === id);
            const newTodos = update(this.state.todos, {
                $splice: [
                    [ deleteInex, 1]
                ]
            })
            this.setState({
                todos: newTodos
            });
        });

    };

    editTodo = id => {
        this.setState({
            editingId: id
        });
    };

    saveTodo = (id, newText) => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        ax.put(`/${id}`, {
            text: newText
        }).then(res => {
            newTodos[editIndex] = res.data;
            this.setState({
                todos: newTodos,
                editingId: null
            });
        })
    };

    cancelEdit = () => {
        this.setState({
            editingId: null
        });
    };

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        ax.put(`/${id}`, {
             isDone: !newTodos[editIndex].isDone
        }).then(res => {
            this.setState({
                todos: newTodos
            });
        })
        // newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
        //     isDone: !newTodos[editIndex].isDone
        // });
    };

    toggleAll = () => {
        const newDone = this.state.todos.some(v => !v.isDone);
        const axArray = this.state.todos.map(v => ax.put(`/${v.id}`, {
            isDone: newDone
        }));

        axios.all(axArray).then(res => {
            this.setState({
                todos: res.map(v => v.data)
            });
        });
        // const newTodos = this.state.todos.map(v =>
        //     Object.assign({}, v, {
        //         isDone: newDone
        //     })
        // );
        // this.setState({
        //     todos: newTodos
        // });
    };
/*
포문을 돌리는 것으 맞지만 셋스테이트는 마지막에 한번만하게 하고 싶다.
promiseAll([promise,promise,promisse, ...])
.then(res => {})  ====>중간에 모두성공하면 된다.
.cathch(err => {}) ===> 하나라도 실패하면 실패한다.
var prom = axios.put(url, data)  ===> 이 자체가 하나의 promis 명령이다.
prom.then(res => {})


newTodos.forEach(v => {
ax.put({v.id}, {isDone: newDone})
.then(res => {
this.setState({

})
})
})

*/


    clearCompleted = () => {
        const axArray = this.state.todos
        .filter(v => v.isDone)
        .map(v => ax.delete(`/${id}`));

        axios.all(axArray).then(() => {
            const newTodos = this.state.todos.filter(v => !v.isDone);
            this.setState({
                todos: newTodos
            });
        })
    };

    render() {
        const {
            todos,
            editingId,
            filterName
        } = this.state;

        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >= 0;

        const filteredTodos = filterName === 'All'
            ? todos
            : todos.filter(v => (
                (filterName === 'Completed' && v.isDone)
                || (filterName === 'Active' && !v.isDone)
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
                    selectFilter={this.selectFilter}
                />
            </div>
        );
    }
}

export default App;

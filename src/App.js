import React from 'react';
import axios from 'axios';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const ax = axios.create({
    baseURL : 'http://localhost:2403/todos'
});

class App extends React.Component {

    state = {
        todos : [],
        editingId : null,
        filterName : 'All'
    };

    // 로딩바 추가시 state 에 isReady 추가하여 false 인지 true 인지 체크해서 render에 뿌려 주고 리퀘스트 완료시 없애면 된다
    componentWillMount(){
        ax.get('/')
        .then(res => {
            this.setState({
                todos : res.data
            });
        });
    }

    selectFilter = filterName => {
        this.setState({
            filterName
        });
    }

    addTodo = text => {
        ax.post('/', { text })
        .then(res => {
            this.setState({
                todos: [... this.state.todos, res.data]
            });
        });

    }

    deleteTodo = id => {
        const newTodos = [... this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id == id);

        ax.delete(`/${id}`)
        .then(() => {
            newTodos.splice(deleteIndex, 1);
            this.setState({
                todos : newTodos
            });
        });

    }

    editTodo = id => {
        this.setState({
            editingId : id
        });
    }

    saveTodo = (id, newText) => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id == id);

        ax.put(`/${id}`, {text : nexText})
        .then(res => {
            newTodos[editIndex] = res.data;
            this.setState({
                todos : newTodos,
                editingId : null
            });
        });

    }

    cancelEdit = () => {
        this.setState({
            editingId : null
        });
    };

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id == id);

        ax.put(`/${id}`, {isDone : !newTodos[editIndex].isDone })
        .then(res => {
            newTodos[editIndex] = res.data;
            this.setState({
                todos : newTodos
            });
        });
    }

    toggleAll = () => {

        // const allIsDone = !this.state.todos.every(v => v.isDone); // 전부 해당될때
        const newDone = this.state.todos.some(v => !v.isDone);  // 일부만 해당될때
        const axArray = this.state.todos.map(v => (
            ax.put(`/${v.id}`, {isDone : newDone})
        ));

        axios.all(axArray)
        .then(res => {
            this.setState({
                todos : res.map(v => v.data)
            });
        });

    }

    clearCompleted = () => {
        const newTodos = this.state.todos.filter(v => !v.isDone);
        const axArray = this.state.todos.filter(v => v.isDone)
            .map(v => (
                ax.delete(`/${v.id}`)
            ));

        axios.all(axArray).then(() => {
            this.setState({
                todos : newTodos
            });
        });

    }

    render(){

        const {
            todos,
            editingId,
            filterName
        } = this.state;

        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >= 0 ;

        const filteredTodos = filterName == 'All'
            ? todos
            : todos.filter(v => (
                (filterName == 'Active' && !v.isDone)
                || (filterName == 'Completed' && v.isDone)
            ));

        todos.filter(v => {
            if(filterName == 'All') return true;
            if(filterName == 'Active' && !v.isDone) return true;
            if(filterName == 'Completed' && v.isDone) return true;
            return false;
        })

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

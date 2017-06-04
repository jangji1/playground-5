import React from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import Footer from './Footer';
import Header from './Header';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos'
})
    class App extends React.Component {
            state = {
                todos: [],
                editingId: null,
                filterName: 'All'
            };

    componentWillMount() {
        ax.get('/')
        .then(res => {
            console.log(res)
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
            console.log(res);
            this.setState({
                todos:[...this.state.todos,
                res.data]
            })
        })
    };

    deleteTodo = id => {
        ax.delete(`/${id}`)
        .then(() => {
        const newTodos = [...this.state.todos];
        const deleteIndex =
        newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1)
        this.setState({
            todos: newTodos
        });
    });
};

    editTodo = (id) => {
        console.log(id)
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
                console.log(res);
                newTodos[editIndex] = res.data;
                this.setState({
                    todos: newTodos,
                    editingId: null
                });
            });
        };

    cancelEdit = () => {
        this.setState({
            editingId: null
        });
    };
    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);

        ax.put(`${id}`, {
            isDone: !newTodos[editIndex].isDone
        }).then(res => {
            newTodos[editIndex] = res.data;
            console.log(res);
            this.setState({
                todos: newTodos
            });
        });
    };
    toggleAll = () => {

        const newDone = this.state.todos.some(v => !v.isDone);
        const axArray = this.state.todos.map(v =>
        ax.put(`/${v.id}`, {
            isDone: newDone
        }));

        axios.all(axArray).then(res => {
            console.log(res.map(v => v.data))
            console.log(res)
            this.setState({
                todos: res.map(v => v.data)
            });
        })


        // const allIsDone = this.state.todos.every(v => v.isDone);
      //전부체크 전부 해제 , 그외 모두 선택, 일반적으로 some이 좀더 빠르다.
    };
    clearCompleted = () => {
        const axArray = this.state.todos
        .filter(v => v.isDone)
        .map(v => ax.delete(`/${v.id}`));

        axios.all(axArray).then(() => {
            const newTodos =
            this.state.todos.filter(v =>
            !v.isDone);
            console.log(axArray);
            this.setState({
                todos: newTodos
            });
        });
    }
    render() {
        const  {
                todos,
                editingId,
                filterName
        } = this.state;
        const activeLength = todos.filter(v => !v.isDone).length;
        const hasCompleted = todos.findIndex(v => v.isDone) >= 0;
        const filteredTodos = filterName === 'All' ? todos
        :todos.filter(v => {
            (filterName === 'Completed' && v.isDone)
            || (filterName === 'Active' && !v.isDone)
        });

        return(
            <div className="todo-app">
                <Header addTodo={this.addTodo}
                        toggleAll={this.toggleAll}
                        isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList
                            todos={filteredTodos}
                            editingId={editingId}
                            deleteTodo={this.deleteTodo}
                            saveTodo={this.saveTodo}
                            editTodo={this.editTodo}
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

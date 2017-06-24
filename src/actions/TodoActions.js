import actionTypes from '../actionTypes';
import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos'
});

const TodoActions = {
    getTodos: () => dispatch =>
        ax.get('/')
        .then(res => dispatch({
            type: actionTypes.getTodos,
            todos: res.data
        })),
    addTodo: text => dispatch =>
        ax.post('/', { text })
        .then(res => dispatch({
            type: actionTypes.addTodo,
            newTodo: res.data
        })),
    deleteTodo: id => dispatch =>
        ax.delete(`/${id}`)
        .then(() => dispatch({
            type: actionTypes.deleteTodo,
            id
        })),
    editTodo: id => ({
        type: actionTypes.editTodo,
        id
    }),
    saveTodo: (id, newText) => dispatch =>
        ax.put(`/${id}`, { text: newText })
        .then(res => dispatch({
            type: actionTypes.saveTodo,
            id,
            editedTodo: res.data
        })),
    cancelEdit: () => ({
        type: actionTypes.cancelEdit
    }),
    toggleTodo: id => (dispatch, getState) => {
        const newDone = !getState().todos.find(v => v.id === id).isDone;
        ax.put(`/${id}`, { isDone: newDone })
        .then(res => dispatch({
            type: actionTypes.toggleTodo,
            id,
            editedTodo: res.data
        }));
    },
    toggleAll: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const newDone = prevTodos.some(v => !v.isDone);
        const axArray = prevTodos.map(v =>
            ax.put(`/${v.id}`, { isDone: newDone })
        );
        axios.all(axArray)
        .then(res => dispatch({
            type: actionTypes.toggleAll,
            todos: res.map(v => v.data)
        }));
    },
    clearCompleted: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const axArray = prevTodos.filter(v => v.isDone)
        .map(v => ax.delete(`/${v.id}`));
        axios.all(axArray)
        .then(() => dispatch({
            type: actionTypes.clearCompleted
        }));
    }
};

export default TodoActions;

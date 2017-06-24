import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos'
});

const TodoActions = {
    getTodos: () => dispatch =>
        ax.get('/')
        .then(res => dispatch({
            type: 'GET_TODOS',
            todos: res.data
        })),
    addTodo: text => dispatch =>
        ax.post('/', { text })
        .then(res => dispatch({
            type: 'ADD_TODO',
            newTodo: res.data
        })),
    deleteTodo: id => dispatch =>
        ax.delete(`/${id}`)
        .then(() => dispatch({
            type: 'DELETE_TODO',
            id
        })),
    editTodo: id => ({
        type: 'EDIT_TODO',
        id
    }),
    saveTodo: (id, newText) => dispatch =>
        ax.put(`/${id}`, { text: newText })
        .then(res => dispatch({
            type: 'SAVE_TODO',
            id,
            editedTodo: res.data
        })),
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    /*
    toggleTodo: id => dispatch =>
        ax.put(`/${id}`, { isDone: newDone })
    toggleAll:
    clearCompleted:
    */
};

export default TodoActions;

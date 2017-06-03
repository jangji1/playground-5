import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos : [
				{
					id : 1,
					text : '1번 할일',
					isDone : false
				},
				{
					id : 2,
					text : '2번 할일',
					isDone : false
				},
				{
					id : 3,
					text : '3번 할일',
					isDone : false
				}
			],
			editingId : null,
			filterName : 'All'
		};
		this.addTodo = this.addTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.saveTodo = this.saveTodo.bind(this);
		this.editTodo = this.editTodo.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.toggleTodo = this.toggleTodo.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.clearCompleted = this.clearCompleted.bind(this);
		this.selectFilter = this.selectFilter.bind(this);
	}
	/* todoList에서 넘어왔다... editingId를 바꾸기 위해*/
	editTodo(id){
		this.setState({
			editingId:id
		});
	}
	addTodo(text){
		this.setState({
			todos : [...this.state.todos, {
				id : this.state.todos.length+1,
				text,
				isDone : false
			}]
		})
	}
	deleteTodo(id){
		const newTodos = [...this.state.todos];
		const deleteIndex = newTodos.findIndex(elem => elem.id == id);
		newTodos.splice(deleteIndex,1);
		this.setState({
			todos : newTodos
		});
	}
	saveTodo(id, newText){
		const newTodos = [...this.state.todos];
		const editIndex = newTodos.findIndex(elem => elem.id == id);
		// newTodos[editIndex].text = newText; 둘 다 바뀐다...
		newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
			text : newText
		});
		this.setState({
			todos : newTodos,
			editingId : null
		});
	}
	cancelEdit(){
		this.setState({
			editingId : null
		})
	}
	toggleTodo(id){
		const newTodos = [...this.state.todos];
		const editIndex = newTodos.findIndex(elem => elem.id == id);
		// newTodos[editIndex].text = newText; 둘 다 바뀐다...
		newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
			isDone : !newTodos[editIndex].isDone
		});
		this.setState({
			todos : newTodos
		});
	}
	/* 전부체크일 때만 전부 해제, 그 외에엔 모두 체크 */
	toggleAll(){
		//const allIsDone = this.state.todos.every(elem => elem.isDone);

		const newDone = this.state.todos.some(elem => !elem.isDone); //하나라도 true면 모두 true..
		const newTodos = this.state.todos.map(elem=>
			Object.assign({}, elem, {
				isDone : newDone
			})
		);
		this.setState({
			todos: newTodos
		});
	}
	/* 완료되지 않는 녀석들만 남겨두기 */
	clearCompleted(){
		const newTodos = this.state.todos.filter(elem => !elem.isDone);
		this.setState({
			todos : newTodos
		});
	}
	selectFilter(filterName){
		this.setState({
			filterName : filterName
		});
	}

	render() {

		/*switch(this.state.filterName){
			case 'All' :
				var todos = this.state.todos;
			break;
			case 'Active' :
				var todos = this.state.todos.filter(elem => !elem.isDone);
			break;
			case 'Completed' :
				var todos = this.state.todos.filter(elem => elem.isDone);
			break;
		}*/
		//console.log(todos);


		const filterTodos = this.state.filterName === 'All' ? this.state.todos
				: this.state.todos.filter(elem=>(
						(this.state.filterName == 'Completed' && elem.isDone) ||
						(this.state.filterName == 'Active' && !elem.isDone)
					));

		const activeLength = filterTodos.filter(elem => !elem.isDone).length;
		const hasCompleted = filterTodos.some(elem => elem.isDone);

		return(
			<div className = "todo-app">
				<Header
					isAllDone ={filterTodos.every(elem => elem.isDone)}
					addTodo={this.addTodo}
					toggleAll={this.toggleAll}
				/>
				<TodoList
					todos={filterTodos}
					editingId = {this.state.editingId}
					deleteTodo={this.deleteTodo}
					saveTodo = {this.saveTodo}
					editTodo = {this.editTodo}
					cancelEdit={this.cancelEdit}
					toggleTodo ={this.toggleTodo}
				/>
				<Footer
					clearCompleted={this.clearCompleted}
					activeLength={activeLength}
					hasCompleted={hasCompleted}
					selectFilter = {this.selectFilter}
					filterName = {this.state.filterName}
				/>
			</div>
		);
	}
}

export default App;
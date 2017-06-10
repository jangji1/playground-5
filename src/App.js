import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const ax = axios.create({
	baseURL :'http://localhost:2403/todos'
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos : [],
			editingId : null
			/* router를 통해 들어올 것
				filterName : 'All'
			*/
		};
		this.addTodo = this.addTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.saveTodo = this.saveTodo.bind(this);
		this.editTodo = this.editTodo.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.toggleTodo = this.toggleTodo.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.clearCompleted = this.clearCompleted.bind(this);
		/*this.selectFilter = this.selectFilter.bind(this);*/
	}
	componentWillMount(){ // 최초 렌더링 직전
		ax.get('/') //axios.get('http://localhost:2403/todos')
			.then(res => {
				this.setState({
					todos : res.data
				});
			})
	}

	componentDidMount(){  // 최초 렌더링 직후

	}

	/* todoList에서 넘어왔다... editingId를 바꾸기 위해*/
	editTodo(id){
		this.setState({
			editingId:id
		});
	}
	addTodo(text){
		ax.post('/', {text})
			.then(res => {
				// 추가된 data가 return 된다.
				this.setState(
					update(this.state, {
						todos :{
							$push : [res.data]
						}
					})
				/*{
					todos : [...this.state.todos, res.data]
				}*/)
			});
		/*this.setState({
			todos : [...this.state.todos, {
				id : this.state.todos.length+1,
				text,
				isDone : false
			}]
		})*/
	}
	deleteTodo(id){

		// for 낙관적 업데이트
		const prevTodos = [...this,state.todos];
		const deleteIndex = this.state.todos.findIndex(elem => elem.id == id);
		const newTodos = update(this.state.todos, {
			$splice : [
				[deleteIndex,1]
			]
		});
		this.setState({
			todos : newTodos
		});
		ax.delete(`/${id}`)
			.then(()=>{ // res return이 오지 않는다.
				/*const newTodos = [...this.state.todos];
				const deleteIndex = newTodos.findIndex(elem => elem.id == id);
				newTodos.splice(deleteIndex,1);*/

				/* immutable helper
				const deleteIndex = this.state.todos.findIndex(elem => elem.id == id);
				const newTodos = update(this.state.todos, {
					$splice : [
						[deleteIndex,1]
					]
				});
				this.setState({
					todos : newTodos
				});*/
			})
			.catch(()=>{
				this.setState({
					todos : prevTodos
				});
			});
		/*const newTodos = [...this.state.todos];
		const deleteIndex = newTodos.findIndex(elem => elem.id == id);
		newTodos.splice(deleteIndex,1);
		this.setState({
			todos : newTodos
		});*/
	}
	saveTodo(id, newText){
		// for 낙관적 업데이트
		const prevTodos = [...this,state.todos];
		const editIndex = prevTodos.findIndex(elem => elem.id == id);
		const newTodos = update(prevTodos,{
			[editIndex] : {
				text:{
					$set: newText
				}
			}
		});
		this.setState({
			todos : newTodos,
			editingId : null
		})

		ax.put(`/${id}`, { text : newText}) //바꿀 key만 입력
			.then(res => {
				/*newTodos[editIndex] = res.data;
				this.setState({
					todos : newTodos,
					editingId : null
				})*/
			})
			.catch(()=>{
				this.setState({
					todos : prevTodos
				})
			});
		// newTodos[editIndex].text = newText; 둘 다 바뀐다...
		/*newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
			text : newText
		});
		this.setState({
			todos : newTodos,
			editingId : null
		});*/
	}
	cancelEdit(){
		this.setState({
			editingId : null
		})
	}
	toggleTodo(id){
		const newTodos = [...this.state.todos];
		const editIndex = newTodos.findIndex(elem => elem.id == id);

		ax.put(`/${id}`, { isDone : !newTodos[editIndex].isDone}) //바꿀 key만 입력
			.then(res => {
				newTodos[editIndex] = res.data;
				this.setState({
					todos : newTodos
				})
			});
		// newTodos[editIndex].text = newText; 둘 다 바뀐다...
		/*newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
			isDone : !newTodos[editIndex].isDone
		});
		this.setState({
			todos : newTodos
		});*/
	}
	/* 전부체크일 때만 전부 해제, 그 외에엔 모두 체크 */
	toggleAll(){
		//const allIsDone = this.state.todos.every(elem => elem.isDone);

		const newDone = this.state.todos.some(elem => !elem.isDone); //하나라도 true면 모두 true..
		const axArr = this.state.todos.map(elem=>{
			return ax.put(`/${elem.id}`, {isDone : newDone})
		}); //axArr = [ax.put(...) , ax.put(...), ...]

		axios.all(axArr).then(res=>{
			// res는 [res, res, res, ...] 의 형태
			const newTodos = res.map(elem=>elem.data);
			this.setState({
				todos : newTodos
			});
		})

		/*const newTodos = this.state.todos.map(elem=>
			Object.assign({}, elem, {
				isDone : newDone
			})
		);
		this.setState({
			todos: newTodos
		});*/
	}
	/* 완료되지 않는 녀석들만 남겨두기 */
	clearCompleted(){
		const axArr = this.state.todos
				.filter(elem=>elem.isDone)
				.map(elem=>ax.delete(`/${elem.id}`));
		axios.all(axArr).then(()=>{ // delete는 res가 오지않
			const newTodos = this.state.todos.filter(elem => !elem.isDone);
			this.setState({
				todos : newTodos
			});
		})

		/*const newTodos = this.state.todos.filter(elem => !elem.isDone);
		this.setState({
			todos : newTodos
		});*/
	}
	/*
	selectFilter(filterName){
		this.setState({
			filterName : filterName
		});
	}
	*/

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

		const {
			match : {
				params
			}
		} = this.props;
		const filterName = params.filterName || '';

		const filterTodos = !filterName ? this.state.todos
				: this.state.todos.filter(elem=>(
						(filterName == 'completed' && elem.isDone) ||
						(filterName == 'active' && !elem.isDone)
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
					filterName = {filterName}
				/>
			</div>
		);
	}
}

export default App;
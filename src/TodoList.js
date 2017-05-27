import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

const propTypes = {
};
const defaultProps = {
};
class TodoList extends Component {
	constructor(props) {
		super(props);
		/*this.state ={
			editingId : null
		}*/
	}
	/*editTodo(id){
		this.setState({
			editingId:id
		});
	}*/
	render() {
		/*const {
			todos,
			deleteTodo,
			saveTodo
		} = this.props;*/
		//반복을 줄이고, 추가 삭제 시 업데이트를 하기 위해
		const todos = this.props.todos.map(({id,text,isDone}, idx) => {

			return <Todo
					key={id}
					text={text}
					isEditing={this.props.editingId == id} /* 중요 ..*/
					editTodo = {()=>this.props.editTodo(id)}
					isDone={isDone}
					deleteTodo={()=>this.props.deleteTodo(id)}
					saveTodo={(text)=>this.props.saveTodo(id, text)} //text는 Todo에서 넘어온다.
					cancelEdit = {this.props.cancelEdit}
					toggleTodo ={()=>this.props.toggleTodo(id)}
				/>
		});

		return(
			<div className='todo-app__main'>
				<ul className="todo-list">
					{todos}
				</ul>
			</div>
		);
	}
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;

export default TodoList;
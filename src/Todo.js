import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames'

const propTypes = {
};
const defaultProps = {
};
class ToDo extends Component {
	constructor(props) {
		super(props);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	/* 렌더링이 완료된 뒤 호출된다 */
	componentDidUpdate(prevProps){
		//이전 값이 isEditing = false; 이고 현재 isEditing 값이 true일 만 동작해라.
		if(!prevProps.isEditing && this.props.isEditing){
			this._inputDom.focus();
			this._inputDom.value = this.props.text;
		}

	}
	handleDoubleClick(e){
		this.props.editTodo();
		/*setTimeout(
			()=>this._inputDom.focus()
		);*/
	}
	handleKeyDown(e){
		const id = e.target.id;
		const text = e.target.value;
		if(!text || e.keyCode != 13) return;

		this.props.saveTodo(text);
		e.target.value = '';
	}

	render() {
		return(

			<li className={
				ClassNames( 'todo-item',
					{'editing' : this.props.isEditing ,'completed' : this.props.isDone})
			}>
				<button className='toggle'
					onClick = {this.props.toggleTodo}
				/>
				<div className='todo-item__view'>
					<div
						className='todo-item__view__text'
						onDoubleClick={this.handleDoubleClick}
					>{this.props.text}</div>
					<button
						className='todo-item__destroy'
						onClick={this.props.deleteTodo}
					/>
				</div>
				<input
					ref={ref => this._inputDom = ref}
					type='text'
					className='todo-item__edit'
					onKeyDown={this.handleKeyDown}
					onBlur={this.props.cancelEdit}
				/>
			</li>
		);
	}
}

ToDo.propTypes = propTypes;
ToDo.defaultProps = defaultProps;

export default ToDo;
/*
1. 선언될 때마다 this binding (render가 호출될때마다 bind되서 성능상으로 좋지 않음)
	onKeyDown = {this.handler.bind(this)}

2. 생성자에서 덮어씌우기 (성능엔 좋지만 많아지면 관리가 힘들다... 또한 instanace가 불필요하게 메서드를 가지게 된다.) proto에도 있
	construcotr(){
		this.handler = this.handler.bind(this);
	}

3. 애로우 펑션으로 호출 (새로운 scope를 생성한다.)
	onKeyDown={e => this.handler(e)}

4. 애로우 펑션으로 정의 (2번이랑 동일한 결과...(proto가 아니라 instanace에 할당된다.) proto에는 없음 )
	handler = e => {}; {class property 선언방식 (propsal2)}
*/


import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';

const propTypes = {
};
const defaultProps = {
};
class Header extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this)
	}
	handleKeyDown(e){
		const text = e.target.value;
		if(!text || e.keyCode != 13) return;

		this.props.addTodo(text);
		e.target.value = '';
	}
	/*
		editTodo


	*/
	render() {
		return(
			<header>
				<h1 className ='todo-app__header'>todos</h1>
				<input
					type='text'
					className='todo-app__new-todo'
					placeholder='What needs to be done?'
					onKeyDown={this.handleKeyDown}
				/>
				<button className={ClassNames('toggle-all',
					{ checked : this.props.isAllDone})}
					onClick={this.props.toggleAll}
				/>
			</header>

		);
	}
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
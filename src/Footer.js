import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames'

const propTypes = {
};
const defaultProps = {
};
class Footer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props.hasCompleted)
		return(
			<footer className='footer'>
				<span className='todo-count'>
					<strong>{this.props.activeLength}</strong>
					{' '}item{this.props.activeLength == 1 ? '' : 's'}
					{' '}left
				</span>
				<ul className='todo-filters'>
					<li><a>All</a></li>
					<li><a>Active</a></li>
					<li><a>Completed</a></li>
				</ul>
				<button
					className={
						ClassNames('todo-delete-completed',
						{hidden : !this.props.hasCompleted})
					}
					onClick={this.props.clearCompleted}
				>
					Clear Completed
				</button>
			</footer>
		);
	}
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
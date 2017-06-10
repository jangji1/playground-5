import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';


const propTypes = {
};
const defaultProps = {
};
class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterNames : ['', 'active', 'completed']
		}

	}

	render() {

		const filterButtons = this.state.filterNames.map(elem => (
				<li key={`filter#${elem}`}>
					<Link
						className={
							ClassNames({'selected' : this.props.filterName == elem})
						}
						to={`/${elem}`}
					>
						{elem ? elem.replace(/^\w/, elem => elem.toUpperCase()) : 'All'}
					</Link>
				</li>

			));
		return(
			<footer className='footer'>
				<span className='todo-count'>
					<strong>{this.props.activeLength}</strong>
					{' '}item{this.props.activeLength == 1 ? '' : 's'}
					{' '}left
				</span>
				<ul className='todo-filters'
					onClick={this.handleClick}
				>
					{filterButtons}
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
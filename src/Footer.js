import React from 'react';
import ClassNames from 'classnames';

class Footer extends React.Component{
    render(){
        const {
            activeLength,
            hasCompleted
        } = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{activeLength}</strong> {''}
                    item{activeLength === 1 ? '' : 's'} {''}
                    left
                </span>
                <ul className="todo-filters">
                    <li><a>All</a></li>
                    <li><a>Active</a></li>
                    <li><a>Completed</a></li>
                </ul>
                <button className={ClassNames('todo-delete-completed',{
                        hidden: !hasCompleted
                    })}
                        onClick={this.props.clearCompleted}
                >Clear completed</button>
            </footer>
        )
    }
}

export default Footer;

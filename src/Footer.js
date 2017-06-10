import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';

class Footer extends React.Component {

    filterNames = ['', 'active', 'completed'];

    render(){
        const {
            filterName,
            activeLength,
            hasCompleted,
            clearCompleted
        } = this.props;

        const links = this.filterNames.map(v => (
            <li key={`filter#${v}`}>
                <Link
                    className={ClassNames({
                        selected : filterName == v
                    })}
                    to={`/${v}`}
                >{v ? v.replace(/^\w/, v => v.toUpperCase()) : 'All'}</Link>
            </li>
        ));

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{activeLength}</strong>{' '}
                    item{activeLength == 1 ? ' ' : 's '}
                    left
                </span>
                <ul className="todo-filters">
                    {links}
                </ul>
                <button
                    className={ClassNames("todo-delete-completed", {
                        hidden : !hasCompleted
                    })}
                    onClick={clearCompleted}
                >
                    Clear Completed
                </button>
            </footer>
        );
    }
}

export default Footer;

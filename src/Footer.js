import React from 'react';
import ClassNames from 'classnames';

class Footer extends React.Component {
    filterNames = ['All', 'Active', 'Completed'];

    render() {
        const {
            activeLength,
            hasCompleted,
            filterName,
            selectFilter
        } = this.props;

        const filterButtons = this.filterNames.map(v => (
            <li key={`filter#${v}`}>
                <a
                    className={ClassNames({
                        selected: filterName === v
                    })}
                    onClick={()=> selectFilter(v)}
                >{v}</a>
            </li>
        ));

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{activeLength}</strong>{' '}
                    item{activeLength === 1 ? ' ' : 's '}
                    left
                </span>
                <ul className="todo-filters">
                    {filterButtons}
                </ul>
                <button
                    className={ClassNames('todo-delete-completed', {
                        hidden: !hasCompleted
                    })}
                    onClick={this.props.clearCompleted}
                >
                    Clear Completed
                </button>
            </footer>
        );
    }
}

export default Footer;

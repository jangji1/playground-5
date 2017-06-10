import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
//key : 맵핑을 돌릴때는 key를 부여해야한다.

class Footer extends React.Component{
    filterNames = ['','active','completed'];
    render(){
        const {
            clearCompleted,
            activeLength,
            hasCompleted,
            filterName,
        } = this.props;
        const links = this.filterNames.map(v => (
            <li key={`filter#${v}`}>
                <Link
                    className={ClassNames({selected : filterName === v})}
                    to = {`/${v}`}> {v ? v.replace(/^\w/, v=> v.toUpperCase()) : 'All'}
                </Link>
            </li>
        ));
        return(
            <footer className="footer">
                <span className="todo-count"><strong>{activeLength}</strong> item{activeLength === 1 ? '' : 's'} left</span>
                <ul className="todo-filters">
                    {links}
                </ul>
                <button className={ClassNames('todo-delete-completed',{hidden : !hasCompleted})} onClick={clearCompleted}>
                    Clear Completed
                </button>
            </footer>
        )
    }
}

export default Footer;
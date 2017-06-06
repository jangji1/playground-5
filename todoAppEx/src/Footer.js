import React from 'react';
import ClassNames from 'classnames';
//key : 맵핑을 돌릴때는 key를 부여해야한다.

class Footer extends React.Component{
    filterNames = ['All','Active','Completed'];
    render(){
        const {
            clearCompleted,
            activeLength,
            hasCompleted,
            filterName,
            setlectFilter
        } = this.props;
        const links = this.filterNames.map(v => (
            <li key={`filter#${v}`}>
                <a
                    className={ClassNames({selected : filterName === v})}
                    onClick={() => setlectFilter(v)}>{v}
                </a>
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
import React from 'react';
import Child from './Child';

class Parent extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [{
                name: 'a',
                phone: 'b'
            }, {
                name: 'aa',
                phone: 'bb'
            }, {
                name: 'aaa',
                phone: 'bbb'
            }, {
                name: 'aaaa',
                phone: 'bbbb'
            }]
        };
        this.addChild = this.addChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
    }
    addChild() {
        const nextList = [...this.state.list];
        nextList.push(nextList.length);
        this.setState({list: nextList});
    }
    removeChild() {
        const nextList = [...this.state.list];
        nextList.pop();
        this.setState({list: nextList});
    }
    render() {
        return (
            <ul>
                {this.state.list.map((v, i) => (<Child key={i} {...v} />))}
            </ul>
        );
    }
}

export default Parent;

import React from 'react';

class Child extends React.Component{
    render(){
        return (
            <li>
                {this.props.quantity} x {this.props.name}
            </li>
        )
    }
}

export default Child;
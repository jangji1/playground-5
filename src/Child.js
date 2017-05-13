import React from 'react';

/*class Child extends React.Component {
    render() {
        return (
            <li>{this.props.val}</li>
        );
    }
}*/

const Child = ({ name, phone }) => (
    <li>{name} {phone}</li>
);

export default Child;

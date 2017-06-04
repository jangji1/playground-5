import React from 'react';

class View extends React.Component {


    render() {
        const {
            number,
            mnumber,
            sum
        } = this.props
        return (
                <tr>
                    <th>{number}</th>
                    <th>{mnumber}</th>
                    <th>{sum}</th>
                </tr>
        )


    }


}

export default View;

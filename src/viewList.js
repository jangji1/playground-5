import React from 'react';
import View from './View';


class ViewList extends React.Component {
    render() {
        const {
            money,
            sum
        } = this.props
        const ViewList = money.map(({id, number, mnumber}) => (
            <View
            key= {id}
            number = {number}
            mnumber = {mnumber}
            sum = {sum}
            />
        ))

        return(
                    <table>
                        <tbody>
                            <tr>
                                <th>입금</th>
                                <th>출금</th>
                                <th>잔액</th>
                            </tr>
                                {ViewList}
                        </tbody>
                    </table>
        )
    }
}

export default ViewList;

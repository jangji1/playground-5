import React, { Component, PropTypes } from 'react';


class AccountBook extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const tableData = this.props.accountList.map(({type, money, result}, idx)=>(
			<tr key={idx}>
				<td>{type == 'save' ? money : ''}</td>
				<td>{type == 'withdraw' ? money : ''}</td>
				<td>{result}</td>
			</tr>
		));

		return(
			<table>
				<thead>
					<tr>
						<td>입금</td>
						<td>출금</td>
						<td>계</td>
					</tr>
				</thead>
				<tbody>
					{tableData}
				</tbody>
			</table>
		);
	}
}
export default AccountBook;
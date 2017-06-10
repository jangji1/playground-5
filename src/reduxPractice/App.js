import React, { Component, PropTypes } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';


class App extends Component {
	constructor(props) {
		super(props);
		this.state ={
			accountList : []
		};
		this.calculate = this.calculate.bind(this);
	}
	calculate(type, money){
		money = money * 1;
		if(typeof money !== 'number') return;
		const prevAccount = this.state.accountList;
		const lastResult = prevAccount.length
			? prevAccount[prevAccount.length-1].result
			: 0;
		this.setState({
			accountList : [
				...prevAccount , {
					type,
					money,
					result : lastResult + (type == 'save' ? 1 : -1) * money
				}
			]
		});
	}
	render() {
		return(
			<div>
				<InputBox
					calculate = {this.calculate}
				/>
				<AccountBook
					accountList = {this.state.accountList}
				/>
			</div>
		);
	}
}
export default App;
import React, { Component, PropTypes } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import Tabs from './Tabs';

import { connect } from 'react-redux';
import bankActions from '../actions/bankActions';
import tabActions from '../actions/tabActions';

/* 중요! */
const mapStateToProps = state =>({ // 스토어에 있는 상태들(parameter)을 props로 전환하여 전달
	accountList : state.bank.accountList,
	focused : state.tab.focused
});
const mapDispatchToProps = dispatch=>({ // action에 대한 dispatch명령(메소드(parameter))를 props로 전달
	calculate : (type,money) => dispatch(bankActions[type](money)), // dispatch의 parameter는 action객체이다.
	changeTab : (index) => dispatch(tabActions.changeTab(index))
});
/*
=> App 컴포넌트에는
	const {
		accountList ,
		calculate
	} = this.props 형태로 접근할 수 있다.
*/

class App extends Component {
	constructor(props) {
		super(props);
		/*
			데이터와 관련된 state는 스토어에서 저장할 것이다.
			state는 UI와 관련된 녀석들만 사용할 것이다.
			this.state ={
				accountList : []
			};
		*/

		/*
			메서드는 스토어에 있는 action으로 처리할 것이다.
			this.calculate = this.calculate.bind(this);
		*/
	}

	/*
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
	*/
	render() {
		const {
			focused,
			changeTab,
			accountList,
			calculate
		} = this.props;
		return(
			<div>
				<Tabs
					focused={focused}
					changeTab={changeTab}
				/>
				<InputBox
					calculate = {calculate}
				/>
				<AccountBook
					accountList = {accountList}
				/>
			</div>
		);
	}
}
/*export default App;*/
/* connect는 함수이다. return 값으로 함수가 반환된다. */
export default connect(mapStateToProps, mapDispatchToProps)(App);



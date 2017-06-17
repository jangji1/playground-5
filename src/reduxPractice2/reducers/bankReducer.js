/* reducer들을 모아둔 폴더 */

// 스토어로부터 상태(현재상태)와 액션을 받아 새로운 상태를 반환한다.
// 액션의 타입에 따라 새로운 상태를 만들어 주면 된다.

//초기 스테이트 설정
const initialState = {
	accountList : []
};
const bankReducer = (state = initialState, action) => {

	switch(action.type){
		case 'SAVE_MONEY' : { // const 변수를 아래에서 중복 사용하기 문에 block scope 추가
			/* action
				{
					type : 'SAVE_MONEY',
					money
				}
			*/
			//새로운 상태 반환
			const money = action.money *1;
			const prevAccount = state.accountList;
			const lastResult = prevAccount.length
				? prevAccount[prevAccount.length -1].result
				: 0;


			return {
				accountList : [
					...prevAccount, {
						type: 'save',
						money,
						result: lastResult + money
					}
				]
			}
			//break를 써도 작동을 안한다. return으로 끝나기 때문
		}
		case 'WITHDRAW_MONEY' : {
			//새로운 상태 반환
			const money = action.money *1;
			const prevAccount = state.accountList;
			const lastResult = prevAccount.length
				? prevAccount[prevAccount.length -1].result
				: 0;

			return {
				accountList : [
					...prevAccount, {
						type: 'withdraw',
						money,
						result: lastResult - money
					}
				],
			}
		}

		default : return state

	}

	return newState
}

export default bankReducer;
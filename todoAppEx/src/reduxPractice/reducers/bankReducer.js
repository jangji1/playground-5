/*
 reducer들을 모아둔 폴더
 */
const initalState = {
  accountList : []
};
const bankReducer = (state = initalState, action) => { // state = 현재상태
  switch (action.type) {
    case "SAVE_MONEY" : { // const를 위한 block scope
      const money = action.money * 1;
      const prevAccount = state.accountList;
      const lastResult = prevAccount.length ? prevAccount[prevAccount.length - 1].result : 0;
      return {
        accountList: [
          ...prevAccount, {
            type: 'save',
            money,
            result: lastResult + money
          }
        ]
      }
    }
    case "WITHDRAW_MONEY" : {
      const money = action.money * 1;
      const prevAccount = state.accountList;
      const lastResult = prevAccount.length ? prevAccount[prevAccount.length - 1].result : 0;
      return {
        accountList: [
          ...prevAccount, {
            type: 'withdraw',
            money,
            result: lastResult - money
          }
        ]
      }
    }
    default : return state;
  }
};

export default bankReducer;

const initialState = {
    accountList: []
}

const bankReducer = (state = initialState, action) => {
    switch(action.type) {
    case 'SAVE_MONEY' : {
        const money = action.money * 1;
        const prevAccount = state.accountList;
        const lastResult = prevAccount.length
            ? prevAccount[prevAccount.length - 1].result
            : 0;
        return {
            accountList : [
                ...prevAccout, {
                    type: 'save',
                    money,
                    result: lastResult + money
                }
            ]
        }
    }
    case 'WITHDRAW_MOENY' : {
        const money = action.moeny * 1;
        const prevAccoutn = state.accountList;
        const lastResult = prevAccount.length
            ? prevAccount[prevAccount.length - 1].result
            : 0;
        return {
            accountList : [
                ...prevAccount, {
                    type: 'withdraw',
                    money,
                    result: lastResult - money
                }
            ]
        }
    }
    default: return state;
    }
}

export default bankReducer;

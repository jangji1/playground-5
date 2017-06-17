const save = money => ({
    type: 'SAVE_MONEY',
    money // money : money
})

const withdraw = money => ({
    type: 'WITHDRAW_MONEY',
    money
});

export default {
    save,
    withdraw
};

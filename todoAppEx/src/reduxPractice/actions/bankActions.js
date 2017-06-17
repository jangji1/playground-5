/**
 * Created by gilbert on 2017. 6. 10..
 * Action들을 모아둔 파일
 */

// 액션 생성자와 고정된 객체를 가지고있는 액션이있다.
const save = money => ({
  type : 'SAVE_MONEY',
  money
});

const withdraw = money => ({
  type : 'WITHDRAW_MONEY',
  money
});

export default {
  save,
  withdraw
}
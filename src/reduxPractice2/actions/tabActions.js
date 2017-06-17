/* action들을 모아둔 파일 */

//액션은 반드시 어떤 형태의 액션이 실행될지 나타내는 type 속성을 가져야 한다.

const changeTab = index =>({
	type : 'CHANGE_TAB',
	focused : index
})

export default {
	changeTab
};
import React from 'react';

const tabList = [
	'유인어뢰로 최강 함대를 침몰시킨 잠수특공대',
	'네이버 지식·교양판 서비스 종료 안내문',
	'안경환 도덕성 논란으로 낙마, 文 개혁 드라이브 급제동'
];

const Tabs =({
	focused,
	changeTab
}) => (
	<ul>
		{
			tabList.map((elem, i) => (
				<li
						key={i}
						onClick={() => changeTab(i)}
					>
						<p>#{i}</p>
						<p style={{
							display : i == focused ? 'block' : 'none'
						}}>{elem}</p>
					</li>
				)
			)
	}
	</ul>
);

export default Tabs;
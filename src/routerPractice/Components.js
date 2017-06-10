import React from 'react';

/*
export class Home extends React.Component {
	render() {
		return(
			<div>Home</div>
		);
	}
}
*/

// stateless component
export const Home = () => (
	<h2>Home</h2>
);

export const About = ({children}) => (
	<div>
		<h2>About</h2>
		{children
			? <div>{children}</div>
			: null
		}
	</div>

);

export const Name = () => (
	<h2>Yongkwan</h2>
);
const portfolioList = [
	{id : 0, text : 'Portfolio #0'},
	{id : 1, text : 'Portfolio #1'},
	{id : 2, text : 'Portfolio #2'}
];

export const Portfolio = ({match}) => {
	const filteredList = (match.params && match.params.id)
		? portfolioList.filter(v=> v.id == match.params.id)
		: portfolioList;

	const renderList = filteredList.map(v=>(
			<li key={v.id}>{v.text}</li>
		));
	return (
		<div>
			<h2>Portfolio</h2>
			<ul>{renderList}</ul>
		</div>
	);
};


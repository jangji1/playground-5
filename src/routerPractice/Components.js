import React from 'react';

/*
// export class Home extends React.Component {
const { children } = this.props;
return (
    <div>
        <h2>About</h2>
        {children ? <div>{children}</div> : null }
    </div>

}과 밑에 쓴것들이 같다.

)
*/
export const Home = () => (
    <h2>Home</h2>

);
export const About = ({children}) => (
    <div>
        <h2>About</h2>
        {children ? <div>{children}</div> : null }
    </div>
);
export const Name = () => (
    <h3>sangcheol</h3>
);
export const portfolioList = [
    {id:0, text: 'pror 1'},
    {id:1, text: 'pror 31'},
    {id:2, text: 'pror 12'}
];

export const Portfolio = ({match}) => {
    const filteredList = (match.params && match.params.id)
    ? portfolioList.filter(v => v.id == match.params.id)
    : portfolioList;
    const renderList = filteredList.map(v => (
        <li key = {v.id}>{v.text}</li>
    ));
    return (
        <div>
            <h2></h2>
            <ul>{renderList}</ul>
        </div>

    )
};

import React from 'react';
import Child from './Child';
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [{
                name: 'gomugom',
                phone: '010-1111-2222',
                show: false
            }, {
                name: 'iu',
                phone: '010-2222-3333',
                show: false
            }, {
                name: 'akmu',
                phone: '010-1133-3245',
                show: false
            }]
        };
    }
    handleClick(i) {
        console.log(this.state);
        const newPeople = this.state.people;
        newPeople[i].show = !newPeople[i].show;
        this.setState({
            people: newPeople
        });
    }
    render() {
        const people = this.state.people;
        const children = people.map((val, index) => (<Child
            name={val.name}
            phone ={val.phone}
            show={val.show}
            handleClick={this.handleClick.bind(this.index)}
        />
        ));
        // map으로 val없애기 해보기.
        return (
            <ul>
                <Child
                    name={ people[0].name }
                    phone={ people[0].phone }
                    show={ people[0].show }
                    handleClick={this.handleClick.bind(this, 0)}
                />
                <Child
                    name={ people[1].name }
                    phone={ people[1].phone }
                    show={ people[1].show }
                    handleClick={this.handleClick.bind(this, 1)}
                />
                <Child
                    name={ people[2].name }
                    phone={ people[2].phone }
                    show={ people[2].show }
                    handleClick={this.handleClick.bind(this, 2)}
                />
            </ul>
        );
    }
}







//         <div className ="a">
//             {/* 클래스는 클래스네임으로 이유는 자바스크립트 문법 안에 있기 때문에 자바스크립트로 해석한다. */}
//             <label htmlFor= "a">라벨</label>
//         {/* label for도 for문으로해석한다 그렇기에 htmlfor로 이유는 자바스크립트 문법 안에 있기 때문에 자바스크립트로 해석한다. */}
//         <input type="text" id = "a" />
//     <Child />
// {/* <Child title = />
// <Child /> */}


export default Parent;
//CHild의 렌더내용이 그려지는거구나~

//JSX문법
//nested Element : 최상단에는 반드시 하나의 엘리먼트만 존재해야 한다. 즉, 여러 형제요소들은 반드시 부모요소로 감싸야 한다.
// '/'표시가 꼭 있어야함.
//<div /> 모든 태그 단일 태그로 표현 가능

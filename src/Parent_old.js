//----- Parent.js -----
import React from 'react';
import Child from './Child';
/*
class Parent extends React.Component {
	render() {
		return (
			<div>
				<Child title="HELLO" desc="ABCD"/>
				<Child title="HELLO TWO" desc="EFG"/>
			</div>
		)
	}
}*/
//----- Parent.js -----
/*class Parent extends React.Component {
  render() {
	return (
	  <div>
		<Child name="gomugom" gender="male" />
		<Child name="iu" gender="female" />
		<Child />
	  </div>
	)
  }
}*/
//----- Parent.js -----
class Parent extends React.Component {
	state = {
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
	  },{name : true}]
	};
  constructor(props) {
	super(props);

	this.handleClick = this.handleClick.bind(this);
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
	/*const children = people.map((val,idx)=>(
		 <Child
			name = {val.name}
			phone={ val.phone }
			show={ val.show }
			handleClick={()=>{this.handleClick(idx)}}
		/>
	));
	*/
	const children = people.map(({name,phone,show},idx)=>( //해채할당
		 <Child
			key = {idx}
			name = { name}
			phone={ phone }
			show={ show }
			handleClick={()=>{this.handleClick(idx)}}
		/>
	));

	return (
	  <ul>
		{/*<Child
		  name={ people[0].name }
		  phone={ people[0].phone }
		  show={ people[0].show }
		  handleClick={()=>{this.handleClick(0)}}
		/>
		<Child
		  name={ people[1].name }
		  phone={ people[1].phone }
		  show={ people[1].show }
		  handleClick={()=>{this.handleClick(1)}}
		/>
		<Child
		  name={ people[2].name }
		  phone={ people[2].phone }
		  show={ people[2].show }
		  handleClick={()=>{this.handleClick(2)}}
		/>*/}
		{children}
	  </ul>
	);
  }
}
export default Parent;
//----- Child.js -----
import React from 'react';
import PropTypes from 'prop-types';
/*class Child extends React.Component {
	constructor() {
		super();
		this.state = {
			isToggle: false
		}
	}
	handleClick() {
		this.setState({
		  isToggle: !this.state.isToggle
		});
	}
	render () {
		const { isToggle } = this.state;
		return (
			<h1
				style={{ color: isToggle ? '#f00' : '#00f' }}
				onClick={this.handleClick.bind(this)}
			>
				{this.props.title}
				{this.props.desc}
			</h1>
		);
	}
}*/
/*class Child extends React.Component {
	constructor(props){
		super(props);
		console.log(this.props);
	}
  render() {
	const { name, gender } = this.props;
	return (
	  <div>
		<h2>{name}</h2>
		<strong>{gender}</strong>
	  </div>
	)
  }
}
Child.defaultProps = {
  name: '이름없음',
  gender: '성별없음'
};*/
class Child extends React.Component {

  render() {
	const { name, phone, show, handleClick } = this.props;
	return (
	  <li onClick={handleClick}>
		<p>name: {name}</p>
		<p style={{
		  display: show ? 'inline' : 'none'
		}}>
		  {phone}
		</p>
	  </li>
	);
  }
}
Child.defaultProps = {
	'name' : '이름없음',
	'phone' : '전화없음',
	'show' : true
}
Child.propTypes ={
	name : PropTypes.string,
	phone : PropTypes.number,
	show : PropTypes.bool
}
export default Child;


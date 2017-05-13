import React from 'react';
class Child extends React.Component {
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
    const { title , name , bools } = this.props
      
    return (
    <div>
      <h1
        style={{ color: isToggle ? '#f00' : '#00f' }}
        onClick={this.handleClick.bind(this)}
      >
        {title}
        
      </h1>
      <h2 style={{color : !bools ? 'red' : 'green'}}
    >{name}</h2>
    </div>
    );
  }
}
export default Child;
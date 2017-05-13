import React from 'react';
import Child from './Child';
class Parent extends React.Component {
  render() {
    return (
    <div>
        <Child title={"hellp"} name={'hey'} bools={true} />
        <Child title={"world"} name={'this'} bools={true} />
        <Child title={"this"} name={'hi'} />
    </div>
    )
  }
}
export default Parent;
import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.balance !== prevProps.balance) {
        this._inputDom.value = '';
        this._inputDom.focus();
      }
    }
    handleChange(e) {
      const value = e.target.value;
      this.props.changeValue(value);
    }
    render() {
      const {
        balance,
        deposit,
        withdraw
      } = this.props;
      return (
        <header>
            <h1 className="cashier-app__header">Account Book</h1>
            <div>
              <input
                  type="number"
                  ref={ref=>this._inputDom=ref}
                  placeholder="숫자를 입력하세요"
                  onChange={this.handleChange.bind(this)}
              />
              <button
                  className="btn-deposit"
                  onClick={deposit}
              >입금</button>
              <button
                  className="btn-deposit"
                  onClick={withdraw}
              >출금</button>
            </div>
        </header>
      );
    }
}

export default Header;


/*
1. 선언될 때마다 this 바인딩
onKeyDown={this.handler.bind(this)}

2. 생성자메소드 내부에서 덮어씌우기
constructor() {
    this.handler = this.handler.bind(this);
}

3. 애로우펑션으로 호출
onKeyDown={e => this.handler(e) }

4. 애로우펑션으로 정의 (class property 선언방식(proposal-2))
handler = e => { };
*/

import React from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';

import { connect } from 'react-redux';
import bankActions from '../actions/bankActions';

const mapStateToProps = state => ({
    accountList: state.accountList
});
const mapDispatchToProps = dispatch => ({
    calculate: (type, money) => dispatch(bankActions[type](money))
});

class App extends React.Component {
    render() {
        const {
            accountList,
            calculate
        } = this.props;

        return (
            <div>
                <InputBox calculate={calculate} />
                <AccountBook accountList={accountList} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

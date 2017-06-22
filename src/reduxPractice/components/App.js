import React from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import Tabs from './Tabs';

import {connect} from 'react-redux';
import bankActions from '../actions/bankActions';
import tabActions from '../actions/tabActions';


const mapStateToProps = state => ({
    accountList: state.accountList,
    focused: state.tab.focused
});

const mapDispatchToProps = dispatch => ({
    changeTab: index => dispatch(tabAcions.changeTab(index)),
    caculate: (type, money) => displatch(bankActions[type](money))
});

class App extends React.Component {
    render() {
        const {
            focused,
            changeTab,
            accountList,
            calculate
        } = this.props;
        return(
            <div>
                <Tabs
                    focused = {focused}
                    changeTab = {changeTab}
                />
                <InputBox calculate = {this.calculate} />
                <AccountBook accountList = {this.state.accountList} />
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);

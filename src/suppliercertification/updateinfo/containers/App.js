import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneUrlParams } from '../../../util/baseTool';

import UpdateInfo from '../components/UpdateInfo';
import { Form } from 'antd';

import { connect_srm } from '../../../util/connectConfig';
import actions from '../actions'

@connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch)
)


class App extends Component {
    componentWillMount() {
        var supplierId = getOneUrlParams("supplierId");
        this.props.fetchTable2Info(supplierId);
    }
    render() {
        return (
            <div>
                <h3 className="page-title">更新资料</h3>
                <UpdateInfo />
            </div>
        );
    }
}

export default App

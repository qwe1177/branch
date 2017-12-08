import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneUrlParams } from '../../../util/baseTool';

import SubmitFrom from '../components/SubmitFrom';
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
        this.props.fetchCategory();
    }
    render() {
        return (
            <div>
                <h3 className="page-title">重新申请品控</h3>
                <SubmitFrom />
            </div>
        );
    }
}

export default App

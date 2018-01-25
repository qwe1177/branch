import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneUrlParams } from '../../../util/baseTool';
import { Form } from 'antd';
import actions from '../actions'

import SubmitFrom from '../components/SubmitFrom';


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
                <h3 className="page-title">申请品控</h3>
                <SubmitFrom />
            </div>
        );
    }
}

export default App

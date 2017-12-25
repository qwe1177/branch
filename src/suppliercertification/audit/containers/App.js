import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneUrlParams } from '../../../util/baseTool';
import { Form } from 'antd';
import actions from '../actions'

import AuditForm from '../components/AuditForm';

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
                <h3 className="page-title">审核供应商</h3>
                <AuditForm />
            </div>
        );
    }
}

export default App

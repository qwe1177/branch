import React, { Component } from 'react'
import './layout.css';
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    notification,
} from 'antd'
import { getLoginInfo, getUrlParams } from '../../../util/baseTool';
import { connect_srm } from '../../../util/connectConfig';
import axios from '../../../util/axios'
import { connect } from 'react-redux'

import QueryFrom from './QueryFrom';
import { bindActionCreators } from 'redux';

export default class BrandSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            checkedList: [], //形式为{key:1,label:xx}
            isFetching: false,
        }
    }

    componentWillMount() {
        this.setVisible(this.props.visible ? true : false);
        if (this.props.choosedKeys && this.props.choosedKeys.length > 0) {
            this.setState({ checkedList: this.props.choosedKeys });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setVisible(nextProps.visible ? true : false);
        if (this.props.choosedKeys && this.props.choosedKeys.length > 0) {
            this.setState({ checkedList: this.props.choosedKeys });
        }
    }

    restDefault = () => {
        this.setState({ visible: false }); //重置数据
    }

    setVisible = (visible) => {
        this.setState({ visible: visible });
    }

    handleOk = (e) => {
        this.restDefault();
    }

    handleCancel = (e) => {
        this.restDefault();
    }

    handleChoosed= (bool,msg) => {
        this.props.onChoosed(bool,msg);
    }
    handclosefrom =(e)=>{
        this.restDefault();
    }
    render() {
        var { dataSource, checkedList, visible, pagination, isFetching } = this.state;
        
        const WrappedQueryFrom = Form.create()(QueryFrom);
        return (
            <Modal title='修改报价单' visible={visible} onCancel={this.handleCancel}  footer={null}>

                <WrappedQueryFrom  onCancel={this.handleChoosed.bind(this)} onclose={this.handclosefrom.bind(this)}/>

            </Modal>
        );
    }
}
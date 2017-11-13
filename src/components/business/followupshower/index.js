import React from 'react';
import PropTypes from 'prop-types'

import './layout.css';

import { connect_url } from '../../../util/connectConfig';
import axios from 'axios';
import QueryForm from './QueryForm';
import MainList from './MainList';
import { Form } from 'antd';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow, doModifiyFollowInfo } from './redux';

@connect(
    state => ({ followupShower: state.followupShower }),
    dispatch => bindActionCreators({ doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow, doModifiyFollowInfo }, dispatch)
)

/**
 * 
 * visible：boolean  内容是否显示，切换tab的时候使用
 * query:object { 'name': '张三1', phone: '12324523123' } 查询的条件
 * pagination 分页的信息,见antd中的prop
 * list: array [ { 'key': 2, 'name': '张三1', phone: '12324523123' }] //查询的结果集合
 * isFetching boolean  //查询进行中
 * 
 */
class FollowUpShower extends React.Component {
    static propTypes = { //声明prop中属性变量

    }
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.doFirstQueryFollow();
    }

    render() {
        const WrappedQueryForm = Form.create()(QueryForm);
        return (
            <div className='followup-shower'>
                <div className="query-wrap">
                    <WrappedQueryForm />
                </div>
                <div className="tabel-wrap">
                    <MainList />
                </div>
            </div>
        );
    }
}

export default FollowUpShower;
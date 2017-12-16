import React from 'react';
import PropTypes from 'prop-types'

import './layout.css';

import QueryForm from './QueryForm2';
import MainList from './MainList';
import { Form ,Spin} from 'antd';
import _ from 'lodash';


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
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        var queryParams =  this.props.followupShower;
        queryParams = _.pick(queryParams,['query','pagination']);
        this.props.doFirstQueryFollow(queryParams);
    }

    render() {
        const WrappedQueryFrom = Form.create()(QueryForm);
        return (
            <Spin spinning={this.props.followupShower.isFetching} >
            <div className='followup-shower'>
                <div className="query-wrap">
                    <WrappedQueryFrom />
                </div>
                <div className="tabel-wrap">
                    <MainList />
                </div>
            </div>
            </Spin>
        );
    }
}

export default FollowUpShower;
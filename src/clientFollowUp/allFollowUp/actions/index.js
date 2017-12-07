import axios from 'axios';
// import { combineReducers } from 'redux';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool.js';
import { connect_url } from '../../../util/connectConfig.js';
import {connect_cas} from '../../../util/connectConfig'
import _ from 'lodash';


const ALLFOLLOWUP_INIT_LIST = 'ALLFOLLOWUP/INIT_LIST';//初始化部门列表
const ALLFOLLOWUP_REQUEST_DATA = 'ALLFOLLOWUP/REQUEST_DATA'; //发送查询请求中
const ALLFOLLOWUP_RECEIVE_DATA = 'ALLFOLLOWUP/RECEIVE_DATA'; //获取查询信息
const ALLFOLLOWUP_RESET_QUERY = 'ALLFOLLOWUP/RESET_QUERY' //重置查询条件
const ALLFOLLOWUP_RECEIVE_DATA_FAIL = 'ALLFOLLOWUP/RECEIVE_DATA_FAIL'; //查选失败
const ALLFOLLOWUP_CHANGE_QUERY = 'ALLFOLLOWUP/CHANGE_QUERY'; //改变查询条件
const ALLFOLLOWUP_ANNOTATE = 'ALLFOLLOWUP_ANNOTATE'; //添加批注
const ALLFOLLOWUP_DELETE_FOLLOW_MESSAGE = 'ALLFOLLOWUP_FOLLOW_MESSAGE'; //删除更进记录
const initList = data =>( {
    type: ALLFOLLOWUP_INIT_LIST,
    data
})

const requestData = data => ({
    type: ALLFOLLOWUP_REQUEST_DATA,
    data
})
const receiveData = data => ({
    type: ALLFOLLOWUP_RECEIVE_DATA,
    data
})

const receiveDataFail = data => ({
    type: ALLFOLLOWUP_RECEIVE_DATA_FAIL,
    data
})
 const resetQuery = data => ({
    type: ALLFOLLOWUP_RESET_QUERY,
    data
})

const changeQuery = data => ({
    type: ALLFOLLOWUP_CHANGE_QUERY,
    data
})

const annotate = data => ({
    type: ALLFOLLOWUP_ANNOTATE,
    data
})

const deleteFollowMessage = data => ({
    type: ALLFOLLOWUP_DELETE_FOLLOW_MESSAGE,
    data
})

export const doInitList = (data) => async (dispatch, getState) => {
    try {
        var token = getLoginInfo()['token'];  //获取token　登录用
        var params = {token};
        params = _.omitBy(params, _.isUndefined); //删除undefined参数
        let res = await axios.get(connect_cas+'/api/user/getAllDepartmentUser', { params: params })
        console.log(res.data.data)
        return await dispatch(initList({departmentList:res.data.data}));
    } catch (error) {
        console.log('error: ', error)
    }
}
export const doDeleteFollowMessage = (id) => async (dispatch, getState) => {
    try {
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
        var params = {id,token, moduleId};
        params = _.omitBy(params, _.isUndefined); //删除undefined参数
        let res = await axios.get('http://10.10.10.29:9407/v1/supplier/deleteSupplierFollowupPostil.do', { params: params });
        return await dispatch(deleteFollowMessage());
    } catch (error) {
        console.log('error: ', error)
    }
}

export const doAnnotate= (recordsId,value) => async (dispatch, getState) => {
    try {
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
        var postilContent = value;
        var params = {recordsId,postilContent,token, moduleId};
        params = _.omitBy(params, _.isUndefined); //删除undefined参数
        let res = await axios.get('http://10.10.10.29:9407/v1/supplier/saveSupplierFollowupPostil.do', { params: params });
        return await dispatch(annotate());
    } catch (error) {
        console.log('error: ', error)
    }
   
}
export const doResetQuery= data => (dispatch, getState) => {
    return dispatch(resetQuery(data));
}
/**
 * 点击查询或者分页进行查询
 * @param {*} data 
 */
export const doQueryFollow = (data,userList) => async (dispatch, getState) => {
    try {
        await dispatch(requestData(data));
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
        var query = data.query;
        var pagination = data.pagination;
        console.log(userList)
        var paramPagination = {pageNo :pagination.current,pageSize:pagination.pageSize};
        if (query.finishData && query.finishData.length > 0) {
            query.startTime = query.finishData[0].format("YYYY-MM-DD");
            query.endTime = query.finishData[1].format("YYYY-MM-DD");
        } 
        if( query.followupType && typeof query.followupType != 'string') {
            query.followupType = query.followupType.join(',');
        }
        var params = {...query,...paramPagination,token, moduleId};
        params.finishData = undefined
        params = _.omitBy(params, _.isUndefined); //删除undefined参数
        let res = await axios.get('http://10.10.10.29:9407/v1/supplier/querySupplierFollowupAll.do', { params: params });
        var pageSize=parseInt(res.data.data.pageSize);
        return await dispatch(receiveData({ list: res.data.data.data,pagination: { ...pagination,pageSize:pageSize,total:res.data.data.rowCount}}));
    } catch (error) {
        console.log('error: ', error)
        return await dispatch(receiveDataFail());
    }
}

const defaultState = {
    visible: true,
    query: {
        companyName: '',
        contactWay: '',
        finishData: [],
        followupType: [],
    },
    pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        current: 1,
        pageSize: 10,
        showTotal: total => `共 ${total} 条`
    },
    list: [],
    isFetching: false,
    departmentList: []
}
const AllFollowUP = function (state = defaultState, action = {}) {
    switch (action.type) {
        case ALLFOLLOWUP_INIT_LIST:
            let {departmentList} = action.data;
            return { ...state, departmentList: departmentList }
        case ALLFOLLOWUP_REQUEST_DATA:
            let {query} = action.data;
            return { ...state, query: query,isFetching: true }
        case ALLFOLLOWUP_RECEIVE_DATA:
            let {list} = action.data;
            let Pagination = {...state.pagination,...action.data.pagination};
            return { ...state, list,pagination:Pagination, isFetching: false };
        case ALLFOLLOWUP_RECEIVE_DATA_FAIL:
            return { ...state, isFetching: false };
        case ALLFOLLOWUP_CHANGE_QUERY:
            var {query,pagination} = action.data;
            return { ...state, query: query, pagination: pagination };
        case ALLFOLLOWUP_DELETE_FOLLOW_MESSAGE:
            return { ...state};
        case ALLFOLLOWUP_ANNOTATE:
            return { ...state};
        default:
            return state
    }
}

export default AllFollowUP
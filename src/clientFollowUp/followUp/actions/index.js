import axios from 'axios';
// import { combineReducers } from 'redux';
import { getLoginInfo } from '../../../util/baseTool.js';
import { connect_srm } from '../../../util/connectConfig.js';
import {connect_cas} from '../../../util/connectConfig'
import _ from 'lodash';


const FOLLOWUP_INIT_LIST = 'FOLLOWUP/INIT_LIST';//初始化部门列表
const FOLLOWUP_REQUEST_DATA = 'FOLLOWUP/REQUEST_DATA'; //发送查询请求中
const FOLLOWUP_RECEIVE_DATA = 'FOLLOWUP/RECEIVE_DATA'; //获取查询信息
const FOLLOWUP_RESET_QUERY = 'FOLLOWUP/RESET_QUERY' //重置查询条件
const FOLLOWUP_RECEIVE_DATA_FAIL = 'FOLLOWUP/RECEIVE_DATA_FAIL'; //查选失败
const FOLLOWUP_CHANGE_QUERY = 'FOLLOWUP/CHANGE_QUERY'; //改变查询条件
const FOLLOWUP_SHOW_COMMENT_FORM = 'FOLLOWUP/SHOW_COMMENT_FORM'; //显示添加批注
const initList = data =>( {
    type: FOLLOWUP_INIT_LIST,
    data
})

const requestData = data => ({
    type: FOLLOWUP_REQUEST_DATA,
    data
})
const receiveData = data => ({
    type: FOLLOWUP_RECEIVE_DATA,
    data
})

const receiveDataFail = data => ({
    type: FOLLOWUP_RECEIVE_DATA_FAIL,
    data
})
 const resetQuery = data => ({
    type: FOLLOWUP_RESET_QUERY,
    data
})

const changeQuery = data => ({
    type: FOLLOWUP_CHANGE_QUERY,
    data
})


const showCommentForm = data => ({
    type: FOLLOWUP_SHOW_COMMENT_FORM,
    data
})


export const doInitList = (data) => async (dispatch, getState) => {
    try {
        var token = getLoginInfo()['token'];  //获取token　登录用
        var params = {token};
        params = _.omitBy(params, _.isUndefined); //删除undefined参数
        let res = await axios.get(connect_cas+'/api/user/getFollowUser', { params: params });
        return await dispatch(initList({departmentList:res.data.data}));
    } catch (error) {
        console.log('error: ', error)
    }
}

export const showOneCommentForm= (list,id) => async (dispatch, getState) => {
    var newList = list.map((o)=>{
        if(o.id ==id){
            o['showCommentForm'] = true;
        }
        return o;
    })
    dispatch(showCommentForm(newList));
}
export const doResetQuery= data => (dispatch, getState) => {
    return dispatch(resetQuery(data));
}
/**
 * 点击查询或者分页进行查询
 * @param {*} data 
 */
export const doQueryFollow = (queryParams) => async (dispatch, getState) => {
    try {
        await dispatch(requestData(queryParams));
        var token = getLoginInfo()['token'];  //获取token　登录用
         /**直接修改prop中的值，会导致修改redux值，拷贝一份 */
        var {query,pagination,userList} = _.cloneDeep(queryParams);
        var paramPagination = {pageNo :pagination.current,pageSize:pagination.pageSize};
        if (query.finishData && query.finishData.length > 0) {
            query.startTime = query.finishData[0].format("YYYY-MM-DD");
            query.endTime = query.finishData[1].format("YYYY-MM-DD");
        } 
        if(query.followupType &&  query.followupType .length>0) {
            query.followupType = query.followupType.toString();
        }
        var params = {...query,...paramPagination,userList,token};
        params.finishData = undefined;
        params = _.omitBy(params, _.isUndefined); //删除undefined参数
        let res = await axios.get(connect_srm+'/supplier/viewSupplierBySubordinate.do', { params: params });
        if(res.data.code =='1') {
            var list = res.data.data.data;
            pagination.total = res.data.data.rowCount;
            return await dispatch(receiveData({list,pagination}));
        }else{
            return await dispatch(receiveDataFail());
        }
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
    departmentList: [],
    userList:''  
}
const FollowUP = function (state = defaultState, action = {}) {
    switch (action.type) {
        case FOLLOWUP_INIT_LIST:
            let {departmentList} = action.data;
            return { ...state, departmentList: departmentList}
        case FOLLOWUP_REQUEST_DATA:
            let {query,userList} = action.data;
            return { ...state, query: query,userList:userList,isFetching: true }
        case FOLLOWUP_RECEIVE_DATA:
            let {list} = action.data;
            let Pagination = {...state.pagination,...action.data.pagination};
            return { ...state, list,pagination:Pagination, isFetching: false };
        case FOLLOWUP_RECEIVE_DATA_FAIL:
            return { ...state, isFetching: false };
        case FOLLOWUP_SHOW_COMMENT_FORM:
            return {...state, list:action.data};
        case FOLLOWUP_CHANGE_QUERY:
            var {query,pagination} = action.data;
            return { ...state, query: query, pagination: pagination };
        default:
            return state
    }
}

export default FollowUP
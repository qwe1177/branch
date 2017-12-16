import axios from 'axios';
import moment from 'moment'
import { getLoginInfo} from '../../../util/baseTool.js';
import {connect_srm} from '../../../util/connectConfig.js';
import _ from 'lodash';
export const INIT_QUERY = 'INIT_QUERY' //初始化查询条件 重置查询条件的时候也用这个
export const RESET_QUERY = 'RESET_QUERY' //重置查询条件
export const SET_QUERY = 'SET_QUERY' //设置查询条件

export const INIT_SUPPLIER = 'INIT_SUPPLIER' //初始化table数据
export const REQUEST_SUPPLIER = 'REQUEST_SUPPLIER' //发送查询请求 为了防止重复查询
export const RECEIVE_SUPPLIER = 'RECEIVE_SUPPLIER' //查询供应商得到结果数据
export const RECEIVE_SUPPLIER_FAIL = 'RECEIVE_SUPPLIER_FAIL' //查询供应商失败

export const CHANGE_MAIN_CHECK = 'CHANGE_MAIN_CHECK' //修改默认的选择


export const initQuery = data => ({
    type: INIT_QUERY,
    data
})

export const setQuery = data => ({
    type: SET_QUERY,
    data
})

export const resetQuery = data => ({
    type: RESET_QUERY,
    data
})


export const initSupplier = data => ({
    type: INIT_SUPPLIER,
    data
})

export const requestSupplier = data => ({
    type: REQUEST_SUPPLIER,
    data
})

export const receiveSupplier = (data) => ({
    type: RECEIVE_SUPPLIER,
    data,
})

export const receiveSupplierFail = (data) => ({
    type: RECEIVE_SUPPLIER_FAIL,
    data,
})

export const changeMainCheck = (data) => ({
    type: CHANGE_MAIN_CHECK,
    data,
})

//actionObj 表示actions所有数据
export const fetchTableDataIfNeeded = data => (dispatch, getState) => {
    if (shouldFetchTableData(getState(), data)) {
        return dispatch(fetchTableData(data))
    }
}

export const initQueryFrom = data => (dispatch, getState) => {
    return dispatch(initQuery(data))
}

export const resetQueryFrom = data => (dispatch, getState) => {
    return dispatch(resetQuery(data))
}

export const setQueryFrom = data => (dispatch, getState) => {
    return dispatch(setQuery(data))
}


//使用async/await方式
export const queryTableData = (data) => async(dispatch, getState) => {
    try {
        // await dispatch(requestSupplier());
        var token = getLoginInfo()['token'];  //获取token　登录用
        var queryform = data.queryform;
        var pagination = data.pagination;
        var paramPagination = {pageNo :pagination.current,pageSize:pagination.pageSize};
        if (queryform.finishData && queryform.finishData.length > 0) {
            queryform.startTime = queryform.finishData[0].format("YYYY-MM-DD");
            queryform.endTime = queryform.finishData[1].format("YYYY-MM-DD");
        }
        var params = { ...queryform, ...paramPagination,token};
        params.finishData = undefined
        params = _.omitBy(params, _.isUndefined); //删除undefined参数
        let res = await axios.get(connect_srm+'/supplier/viewFollowupPlanList.do', { params: params });
        var pageSize=parseInt(res.data.data.pageSize);
        return await dispatch(receiveSupplier({
            tableData: res.data.data.supplierFollowupPlanList,
            pagination: { ...pagination,pageSize:pageSize,total:res.data.data.rowCount}
        }));
    } catch (error) {
        console.log('error: ', error)
        return await dispatch(receiveSupplierFail());
    }
}

export const initSupplierTable = data => (dispatch, getState) => {
    return dispatch(initSupplier(data))
}

export const doChangeMainCheck = data => (dispatch, getState) => {
    return dispatch(changeMainCheck(data))
}

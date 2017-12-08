import axios from 'axios';
// import { combineReducers } from 'redux';
import { getLoginInfo ,getUrlParams} from '../../../../util/baseTool.js';
import { connect_url } from '../../../../util/connectConfig.js';
import { connect_srm } from '../../../../util/connectConfig.js';
import _ from 'lodash';

import moment from 'moment';
const ADDFOLLOWUP_ADD = 'ADDFOLLOWUP/ADD'; //添加初始化默认值
const ADDFOLLOWUP_CANCEL_FORM = 'ADDFOLLOWUP/CANCEL_FORM'; //关闭弹窗
const ADDFOLLOWUP_REQUEST_EFFECT_ITEM = 'ADDFOLLOWUP/REQUEST_EFFECT_ITEM'; //发送查询请求
const ADDFOLLOWUP_RECEIVE_SUCCESS = 'ADDFOLLOWUP/RECEIVE_SUCCESS'; //接收提交内容结果成功
const ADDFOLLOWUP_RECEIVE_FAIL = 'ADDFOLLOWUP/RECEIVE_FAIL'; //接收提交内容结果失败


const add = data => ({
  type: ADDFOLLOWUP_ADD,
  data
})

const cancelForm = data => ({
  type: ADDFOLLOWUP_CANCEL_FORM,
  data
}) 
const requestEffectItem = data => ({
  type: ADDFOLLOWUP_REQUEST_EFFECT_ITEM,
  data
})

const receiveSuccess = data => ({
  type: ADDFOLLOWUP_RECEIVE_SUCCESS,
  data
})

const receiveFail = data => ({
  type: ADDFOLLOWUP_RECEIVE_FAIL,
  data
})

export const doAdd = data => (dispatch, getState) => {
  return dispatch(add());
}

export const doCancelForm = data => (dispatch, getState) => {
  return dispatch(cancelForm());
}


export const doRequest = data => async (dispatch, getState) => {
  try {
    await dispatch(requestEffectItem(data));
    var token = getLoginInfo()['token'];  //获取token　登录用
    var urlParams = getUrlParams();
    var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
    var query = data.query;
    var pagination = data.pagination;
    var paramPagination = {pageNo :pagination.current,pageSize:pagination.pageSize};
    var params = {...query, ...paramPagination,token, moduleId};
    query = _.omitBy(query, _.isUndefined);  //删除undefined参数
    let res = await axios.get('http://10.10.10.29:9407/v1/clue/viewCompanyList.do',{ params: params }); //提交请求
    var pageSize=parseInt(res.data.data.pageSize);
    return await dispatch(receiveSuccess({  tableData: res.data.data, pagination: {...pagination,pageSize:pageSize,total:res.data.data.rowCount}})); 
  } catch (error) {
    console.log('error: ', error)
    return await dispatch(receiveFail(false));
  }
}

const defaultState={
  visible:false,
  isFetching:false,
  query:{
    companyName:'',
  },
  pagination: {
    showQuickJumper: true,
    showSizeChanger: true,
    total: 1,
    current: 1,
    pageSize: 10,
    showTotal: total => `共 ${total} 条`
},
  tableData:[]
}
const AddModal = function (state = defaultState, action = {}) {
  switch (action.type) {
    case ADDFOLLOWUP_ADD:
    return { ...state, query:defaultState.query, visible:true};
    case ADDFOLLOWUP_REQUEST_EFFECT_ITEM:
    let { query} = action.data
    return { ...state, query:query, isFetching:true };
    case ADDFOLLOWUP_RECEIVE_SUCCESS:
      let { tableData,pagination } = action.data
      let newPagination = {...state.pagination,...action.data.pagination};
      return { ...state,tableData, pagination:newPagination,isFetching:false };
    case ADDFOLLOWUP_CANCEL_FORM:
      return { ...state, visible: false,isFetching: false };
    case ADDFOLLOWUP_RECEIVE_FAIL:
      return { ...state, isFetching: false,visible: false };
    default:
      return state
  }
}

export default AddModal
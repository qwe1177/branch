import axios from 'axios';
// import { combineReducers } from 'redux';
import { getLoginInfo} from '../../util/baseTool.js';
import { connect_url } from '../../util/connectConfig.js';
import _ from 'lodash';

import moment from 'moment';
const EDITFOLLOWUP_FORM_ADD = 'EDITFOLLOWUP/FORM_ADD';//添加初始化默认值
const EDITFOLLOWUP_FORM_EDIT = 'EDITFOLLOWUP/FORM_EDIT'; //编辑初始化默认值
const EDITFOLLOWUP_CANCEL_FORM = 'EDITFOLLOWUP/CANCEL_FORM'; //关闭弹窗
const EDITFOLLOWUP_REQUEST_EFFECT_ITEM = 'EDITFOLLOWUP/REQUEST_EFFECT_ITEM'; //提交内容中
const EDITFOLLOWUP_RECEIVE_SUCCESS = 'EDITFOLLOWUP/RECEIVE_SUCCESS'; //接收提交内容结果成功
const EDITFOLLOWUP_RECEIVE_FAIL = 'EDITFOLLOWUP/RECEIVE_FAIL'; //接收提交内容结果失败

const formEdit = data => ({
  type: EDITFOLLOWUP_FORM_EDIT,
  data
})
 
const formAdd = data => ({
  type: EDITFOLLOWUP_FORM_ADD,
  data
})
const cancelForm = data => ({
  type: EDITFOLLOWUP_CANCEL_FORM,
  data
}) 

const requestEffectItem = data => ({
  type: EDITFOLLOWUP_REQUEST_EFFECT_ITEM,
  data
})

const receiveSuccess = data => ({
  type: EDITFOLLOWUP_RECEIVE_SUCCESS,
  data
})

const receiveFail = data => ({
  type: EDITFOLLOWUP_RECEIVE_FAIL,
  data
})


/**
 * 初始化编辑form
 * @param {*} data 
 */
export const doFormEdit = (supplierId,id) => async(dispatch, getState) => {
  try {
    var token = getLoginInfo()['token'];  //获取token　登录用
    var params = {supplierId,id,token};
    params = _.omitBy(params, _.isUndefined); //删除undefined参数
      let res = await axios.get('http://10.10.10.29:9407/v1/supplier/querySupplierFollowupRecordsInfo.do',{ params: params }); //添加提交请求
      if(res.data.data.planNextContactTime&&res.data.data.planNextContactTime != "") {
        res.data.data.planNextContactTime=moment(res.data.data.planNextContactTime)
      }  
      if(res.data.data.thisContactTime&&res.data.data.thisContactTime != "") {
        res.data.data.thisContactTime=moment(res.data.data.thisContactTime)
      }  
      if(res.data.data.followUpFlag) {
        res.data.data.followUpFlag = res.data.data.followUpFlag.split(",");
      }
 
      return await dispatch(formEdit(res.data.data));   
  } catch (error) {
    console.log('error: ', error)
    return await dispatch(receiveFail(false));
    return false;
  }
 
}
export const doFormAdd = (data) => (dispatch, getState) => {
  var initForm = {
    contactPersonnel: '',
    activeContact: '',
    contactWay: '',
    thisContactTime: '',
    followUpTheContent: '',
    planNextContactTime: '',
    planNextContent: '',

  }
  return dispatch(formAdd(initForm));
} 
export const doCancelForm = (data) => (dispatch, getState) => {
  return dispatch(cancelForm());
}

export const doReceiveSuccess = (data) => (dispatch, getState) => {
  return dispatch(receiveSuccess());
}
export const doReceiveFail = (data) => (dispatch, getState) => {
  return dispatch(receiveFail());
}
export const doEffectFlow = (url,data) => async (dispatch, getState) => {
  try {
    var token = getLoginInfo()['token'];  //获取token　登录用
    var pform = data.pform;
    if(pform.thisContactTime) {
      pform.thisContactTime = pform.thisContactTime.format('YYYY-MM-DD');
    }
    if(pform.planNextContactTime) {
      pform.planNextContactTime = pform.planNextContactTime.format('YYYY-MM-DD');
    }
    var params = {...pform,token};
    params = _.omitBy(params, _.isUndefined); //删除undefined参数
      let res = await axios.get(url, { params: params }); //添加提交请求
     if(res.data.code =='1') {
        await dispatch(receiveSuccess());
        return res;
     }else {
      await dispatch(receiveSuccess());
      return res;
     }
  } catch (error) {
    console.log('error: ', error)
    return await dispatch(receiveFail(false));
    return false;
  }
}
const defaultState={
  visible:false,
  isFetching:false,
  pform:{},
  modalType:1,
}
const EditModal = function (state = defaultState, action = {}) {
  switch (action.type) {
    case EDITFOLLOWUP_FORM_ADD:
    let pform = {...state.pform,...action.data}
      return { ...state, pform: pform, visible: true};
    case EDITFOLLOWUP_FORM_EDIT:
      let p = _.pick(action.data,['supplierId','followupType','id','companyName','contactPersonnel','activeContact','contactWay','thisContactTime','followUpFlag','followUpNode','followUpTheContent','planNextContactTime','planNextContent']);
      return { ...state, pform: p, visible: true};
    case EDITFOLLOWUP_CANCEL_FORM:
      return { ...state, visible: false };
    case EDITFOLLOWUP_REQUEST_EFFECT_ITEM:
      return { ...state, isFetching: true};
    case EDITFOLLOWUP_RECEIVE_SUCCESS:
      return { ...state, isFetching: false,visible: false };
    case EDITFOLLOWUP_RECEIVE_FAIL:
      return { ...state, isFetching: false,visible: false };
    default:
      return state
  }
}

export default EditModal
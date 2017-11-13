import axios from 'axios';
// import { combineReducers } from 'redux';

import { connect_url } from '../../util/connectConfig.js';
import _ from 'lodash';

import moment from 'moment';
const EDITFOLLOWUP_FORM_EDIT = 'EDITFOLLOWUP/FORM_EDIT'; //添加初始化默认值
const EDITFOLLOWUP_FORM_ADD = 'EDITFOLLOWUP/FORM_ADD'; //添加初始化默认值
const EDITFOLLOWUP_CANCEL_FORM = 'EDITFOLLOWUP/CANCEL_FORM'; //关闭弹窗
const EDITFOLLOWUP_SET_FORM = 'EDITFOLLOWUP/SET_FORM'; //修改from内容
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

const setForm = data => ({
  type: EDITFOLLOWUP_SET_FORM,
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
export const doFormEdit = data => (dispatch, getState) => {
  //此处以后改为从后台取数据  
  //axios.get(connect_url + '/buyer/allbuyer/query', { params: params }).then().catch();
  var mockData = 
  {
    type: "add",
    title: "添加跟进",
    key: '1',
    clientName: '深圳市华南城网',
    contacts: '张小姐',
    initiative: '客户',
    contactWay: '电话',
    thisTime: '2017/11/2',
    followUpFlag: [
      {key:'1',label:'暂无兴趣',status:'past'},
      {key:'2',label:'待联系',status:'past'},
      {key:'3',label:'电话介绍',status:'now'},
      {key:'4',label:'确定KP',status:'future'},
      {key:'5',label:'上门介绍',status:'future'},
    ],
    followUpContent: '这次跟进',
    nextTime: '2017/12/2',
    nextContent: '预计下次跟进',
  }
  // {
  //   type: "edit",
  //   title: "编辑跟进",
  //   key: '2',
  //   clientName: '深圳市华南城网',
  //   contacts: '张小姐',
  //   initiative: '客户',
  //   contactWay: '电话',
  //   thisTime: '2017/11/2',
  //   followUpFlag: [
  //     {key:'1',label:'日常联系',checked:'false'},
  //     {key:'2',label:'寄送样品',checked:'false'},
  //     {key:'3',label:'询报价',checked:'true'},
  //     {key:'4',label:'签订合同',checked:'false'},
  //     {key:'5',label:'配送交货',checked:'false'},
  //   ],
  //   followUpContent: '这次跟进',
  //   nextTime: '2017/12/2',
  //   nextContent: '预计下次跟进',
  // }
  
  return dispatch(formEdit(mockData));
}

/**
 * 初始化添加form
 * @param {*} data 
 */
export const doFormAdd = data => (dispatch, getState) => {
  //此处以后改为从后台取数据  
  //axios.get(connect_url + '/buyer/allbuyer/query', { params: params }).then().catch();
  var formAddData = 
  {
    
  }
  
  return dispatch(formAdd(formAddData));
}

export const doCancelForm = data => (dispatch, getState) => {
  return dispatch(cancelForm());
}


export const doEffectFlow = data => async (dispatch, getState) => {
  try {
    var params = _.omitBy(data, _.isUndefined); //删除undefined参数
    let res = await axios.get(connect_url + '/mockeffectSuccess', { params: params }); //提交请求
    if (res.data.result) { //提交成功
      await dispatch(setForm(data));
      await dispatch(receiveSuccess());
      return res;
    } else {
      return await dispatch(receiveSuccess());
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
  effectResult:true,
  followUpFlag:[],
  type:'',
  title:''
}
const EditModal = function (state = defaultState, action = {}) {
  switch (action.type) {
    case EDITFOLLOWUP_FORM_EDIT:
    case EDITFOLLOWUP_FORM_ADD:
    case EDITFOLLOWUP_SET_FORM:
      return { ...state, pform: action.data, visible: true };
    case EDITFOLLOWUP_CANCEL_FORM:
      return { ...state, visible: false };
    case EDITFOLLOWUP_REQUEST_EFFECT_ITEM:
      return { ...state, isFetching: true };
    case EDITFOLLOWUP_RECEIVE_SUCCESS:
      return { ...state, isFetching: false,visible: false };
    case EDITFOLLOWUP_RECEIVE_FAIL:
      return { ...state, isFetching: false };
    default:
      return state
  }
}

export default EditModal
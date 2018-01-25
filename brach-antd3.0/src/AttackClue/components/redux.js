import axios from 'axios';
// import { combineReducers } from 'redux';

import { connect_url } from '../../util/connectConfig';
import _ from 'lodash';

import moment from 'moment';

// const PERSONLISTSHOWER_REQUEST_LIST = 'PERSONLISTSHOWER/REQUEST_LIST'; //获取list
const PERSONLISTSHOWER_RECEIVE_LIST = 'PERSONLISTSHOWER/RECEIVE_LIST'; //获取接收list
// const PERSONLISTSHOWER_RECEIVE_LIST_FAIL = 'PERSONLISTSHOWER/RECEIVE_LIST_FAIL'; //获取接收list失败
const PERSONLISTSHOWER_PRE_ADD = 'PERSONLISTSHOWER/PRE_ADD'; //初始化|添加的默认值
const PERSONLISTSHOWER_PRE_EDIT = 'PERSONLISTSHOWER/PRE_EDIT'; //初始化修改|添加的默认值

const PERSONLISTSHOWER_CANCEL_FORM = 'PERSONLISTSHOWER/CANCEL_FORM'; //关闭弹窗

const PERSONLISTSHOWER_SET_FORM = 'PERSONLISTSHOWER/SET_FORM'; //提交添加和修改是时候修改from内容
const PERSONLISTSHOWER_REQUEST_EFFECT_ITEM = 'PERSONLISTSHOWER/REQUEST_EFFECT_ITEM'; //提交添加或者修改内容中
const PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_SUCCESS = 'PERSONLISTSHOWER/RECEIVE_EFFECT_ITEM_SUCCESS'; //接收提交内容结果
const PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_FAIL = 'PERSONLISTSHOWER/RECEIVE_EFFECT_ITEM_FAIL'; //接收提交内容结果



const receiveList = data => ({
  type: PERSONLISTSHOWER_RECEIVE_LIST,
  data
})

const preAdd = data => ({
  type: PERSONLISTSHOWER_PRE_ADD,
  data
})

const preEdit = data => ({
  type: PERSONLISTSHOWER_PRE_EDIT,
  data
})

const cancelForm = data => ({
  type: PERSONLISTSHOWER_CANCEL_FORM,
  data
})

const setForm = data => ({
  type: PERSONLISTSHOWER_SET_FORM,
  data
})
const requestEffectItem = data => ({
  type: PERSONLISTSHOWER_REQUEST_EFFECT_ITEM,
  data
})

const receiveEffectItemSuccess = data => ({
  type: PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_SUCCESS,
  data
})

const receiveEffectItemFail = data => ({
  type: PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_FAIL,
  data
})


/**
 * 获取列表数据
 * @param {*} data 
 */
export const doReceiveList = (data=[{ 'key': 1, 'name': '张三1', telephone: '111' },
  { 'key': 2, 'name': '张三2', telephone: '222' },
  { 'key': 3, 'name': '张三3', telephone: '333' },
  { 'key': 4, 'name': '张三4', telephone: '444' },
  { 'key': 5, 'name': '张三5', telephone: '555' },
]) => (dispatch, getState) => {

  //此处以后改为从后台取数据  
  // let res = await axios.get(connect_url + '/buyer/allbuyer/query', { params: params });
  // return await dispatch(receiveList({ tableData: res.data.data, pagination: { total: res.data.total } }));

  dispatch(receiveList(data));
}

/**
 * 添加的时候初始化form
 * @param {*} data 
 */
export const doPreAdd = data => (dispatch, getState) => {
  return dispatch(preAdd());
}

export const doCancelForm = data => (dispatch, getState) => {
  return dispatch(cancelForm());
}


/**
 * 添加的时候初始化form
 * @param {*} data 
 */
export const doPreEdit = (data) => (dispatch, getState) => {
  //此处以后改为从后台取数据  
  //axios.get(connect_url + '/buyer/allbuyer/query', { params: params }).then().catch();

const old ={
  key: 1,
  gender: 'men',
  birthday: moment(),
  email: 'sfe@132.com',
  fax: '12312312',
  job: 'fa',
  name: '张三',
  qq: '123123',
  remarks: '首发得分',
  telephone: '12324523123',
  wangwang: '323',
  wechart: '2312312'
}
  return dispatch(preEdit({...old,...data}));
}


export const doEffectFlow = data => async (dispatch, getState) => {
  try {
    var params = _.omitBy(data, _.isUndefined); //删除undefined参数
    let res = await axios.get(connect_url + '/mockeffectSuccess', { params: params }); //提交请求
    if (res.data.result) { //提交成功
      await dispatch(setForm(data));
      await dispatch(receiveEffectItemSuccess());
      await doReceiveList();
      return res;
    } else {
      return await dispatch(receiveEffectItemSuccess());
      return res;
    }
  } catch (error) {
    console.log('error: ', error)
    return await dispatch(receiveEffectItemFail(false));
    return false;
  }
}

const initForm = {
  key: '',
  gender: 'men',
  birthday: '',
  email: '',
  fax: '',
  job: '',
  name: '',
  qq: '',
  remarks: '',
  telephone: '',
  wangwang: '',
  wechart: ''
}

const defaultState={
  personList:[],
  visible:false,
  isFetching:false,
  pform:initForm,
  effectResult:true
}

const personListShower = function (state = defaultState, action = {}) {
  switch (action.type) {
    case PERSONLISTSHOWER_RECEIVE_LIST:
      return { ...state, personList: action.data }
    case PERSONLISTSHOWER_PRE_ADD:
      return {
        ...state,
        pform: initForm,
        visible: true
      };
    case PERSONLISTSHOWER_PRE_EDIT:
    case PERSONLISTSHOWER_SET_FORM:
      console.log(999,state);
      console.log(9999,action.data);
      const newpersonList = state.personList.filter(o=>o.key!=action.data.key)
      newpersonList.push(action.data)
      newpersonList.sort((a,b)=>a.key-b.key)
      console.log(99999,newpersonList);
      return { ...state, personList: newpersonList,pform: action.data, visible: true };
    case PERSONLISTSHOWER_CANCEL_FORM:
      return { ...state, visible: false };
    case PERSONLISTSHOWER_REQUEST_EFFECT_ITEM:
      return { ...state, isFetching: true };
    case PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_SUCCESS:
      return { ...state, isFetching: false,visible: false };
    case PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_FAIL:
      return { ...state, isFetching: false };

    default:
      return state
  }
}

export default personListShower
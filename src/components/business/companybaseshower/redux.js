import axios from 'axios';
// import { combineReducers } from 'redux';

import { connect_url } from '../../../util/connectConfig';
import _ from 'lodash';

const COMPANYBASESHOWER_RECEIVE_DATA = 'COMPANYBASESHOWER/RECEIVE_DATA'; //获取公司信息

const COMPANYBASESHOWER_PRE_MODIFIY = 'COMPANYBASESHOWER/PRE_MODIFIY'; //打开修改框
const COMPANYBASESHOWER_PRE_MODIFIY_CANCEL = 'COMPANYBASESHOWER/PRE_MODIFIY_CANCEL'; //直接关闭修改框
const COMPANYBASESHOWER_MODIFIY_RELATION = 'COMPANYBASESHOWER/RECEIVE_RELATION'; //提交修改框子


const receiveData = data => ({
  type: COMPANYBASESHOWER_RECEIVE_DATA,
  data
})

const preModifiy = data => ({
  type: COMPANYBASESHOWER_PRE_MODIFIY,
  data
})

const preModifiyCanel = data => ({
  type: COMPANYBASESHOWER_PRE_MODIFIY_CANCEL,
  data
})


const modifiyRelation = data => ({
  type: COMPANYBASESHOWER_MODIFIY_RELATION,
  data
})


export const doReceiveData = data => (dispatch, getState) => {
  var mockData ={
    name:'深圳华南城网科技有限公司',
    address:'深圳龙岗区华南城1号交易广场',
    relation:'战略合作'
  }
  return dispatch(receiveData(mockData));
}

/**
 * 添加的时候初始化form
 * @param {*} data 
 */
export const doPreModifiy = data => (dispatch, getState) => {
  return dispatch(preModifiy());
}

export const doPreModifiyCanel = data => (dispatch, getState) => {
  return dispatch(preModifiyCanel());
}

export const doModifiyRelation = data => (dispatch, getState) => {
  return dispatch(modifiyRelation(data));
}


const defaultState = {
  data: {
    name:'',
    address:'',
    relation:''
  },
  visible:false
}


const companyBaseShower = function (state = defaultState, action = {}) {
  switch (action.type) {
    case COMPANYBASESHOWER_RECEIVE_DATA:
      return { ...state, data: action.data }
    case COMPANYBASESHOWER_PRE_MODIFIY:
      return { ...state, visible: true };
    case COMPANYBASESHOWER_PRE_MODIFIY_CANCEL:
      return { ...state, visible: false };
    case COMPANYBASESHOWER_MODIFIY_RELATION:
      var {data} = state;
      data = {...data,...action.data}; //覆盖relation
      return { ...state, data: data,visible: false };
    default:
      return state
  }
}

export default companyBaseShower
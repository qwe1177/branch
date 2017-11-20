//用户操作权限

import axios from 'axios';

import { connect_cas } from '../../../util/connectConfig';

const RECEIVE_OPERATE_DATA = 'POWER/RECEIVE_OPERATE_DATA'; //获取用户操作权限
const RECEIVE_CURRENT_DATA = 'POWER/RECEIVE_CURRENT_DATA'; //获取用户数据权限
const RECEIVE_FIELD_DATA = 'POWER/RECEIVE_FIELD_DATA'; //获取用户字段权限


const receiveOperateData = (data,namespace) => ({
  type: RECEIVE_OPERATE_DATA,
  data,
  namespace
})

const receiveCurrentData = (data,namespace) => ({
  type: RECEIVE_CURRENT_DATA,
  data,
  namespace
})


const receiveFieldData = (data,namespace) => ({
  type: RECEIVE_FIELD_DATA,
  data,
  namespace
})



export const getOperateData = (token,moduleId) => async (dispatch, getState) => {
  try {
    let res = await axios.get(connect_cas + '/api/right/getOperateData', { params: {token:token,moduleId:moduleId} });
    return dispatch(receiveOperateData(res.data.data,'operate'));
  } catch (error) {
    console.log('error: ', error)
  }
}


export const getCurrentData = (token,moduleId) => async (dispatch, getState) => {
  try {
    let res = await axios.get(connect_cas + '/api/right/getRightData', { params: {token:token,moduleId:moduleId} });
    return dispatch(receiveCurrentData(res.data.data,'data'));
  } catch (error) {
    console.log('error: ', error)
  }
}


export const getFieldData = (token,moduleId) => async (dispatch, getState) => {
  try {
    let res = await axios.get(connect_cas + '/api/right/getFieldData', { params: {token:token,moduleId:moduleId} });
    return dispatch(receiveFieldData(res.data.data,'field'));
  } catch (error) {
    console.log('error: ', error)
  }
}




const defaultState = {operate:[],data:[],field:[]};

const power = function (state = defaultState, action = {}) {
  switch (action.type) {
    case RECEIVE_OPERATE_DATA:
    case RECEIVE_CURRENT_DATA:
    case RECEIVE_FIELD_DATA:
      var op = {[action.namespace]:action.data};
      return action.data?{ ...state, ...op }:{...state}
    default:
      return state
  }
}

export default power
//用户操作权限

import axios from '../../../util/axios';
import { connect_cas } from '../../../util/connectConfig';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';

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

const getPowerPublicParams = ()=>{
  var urlParams = getUrlParams();
  var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
  var moduleUrl = location.pathname;
  return {moduleUrl,moduleId};
}


export const getOperateData = () => async (dispatch, getState) => {
  try {
    var {moduleUrl,moduleId} = getPowerPublicParams();
    var params = moduleId!=''?{moduleId}:{moduleUrl} //优先使用moduleUrl获取权限
    let res = await axios.get(connect_cas + '/api/right/getOperateData', { params: params });
    if(res.data.code=='0'){
      var d ={};
      res.data.data.forEach((o)=>{
        d[encodeURI(o['name'])]= o['sign'];
      })
      return dispatch(receiveOperateData(d,'operate'));
    }
  } catch (error) {
    console.log('error: ', error)
  }
}


export const getCurrentData = () => async (dispatch, getState) => {
  try {
    var {moduleUrl,moduleId} = getPowerPublicParams();
    var params = moduleId!=''?{moduleId}:{moduleUrl} //优先使用moduleUrl获取权限
    let res = await axios.get(connect_cas + '/api/right/getRightData', { params: params} );
    if(res.data.code=='0'){
      return dispatch(receiveCurrentData(res.data.data,'data'));
    }
  } catch (error) {
    console.log('error: ', error)
  }
}


export const getFieldData = () => async (dispatch, getState) => {
  try {
    var {moduleUrl,moduleId} = getPowerPublicParams();
    var params = moduleId!=''?{moduleId}:{moduleUrl} //优先使用moduleUrl获取权限
    let res = await axios.get(connect_cas + '/api/right/getFieldData',{ params: params});
    if(res.data.code=='0'){
      return dispatch(receiveFieldData(res.data.data,'field'));
    }
  } catch (error) {
    console.log('error: ', error)
  }
}



const defaultState = {operate:{},data:[],field:[]};

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
import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo, getUrlParams } from '../../../util/baseTool';
import axios from '../../../util/axios';
import _ from 'lodash';
import {message} from 'antd';


const SUPPLIER_DETAILS_REQUEST_MAIN_DATA = 'SUPPLIER_DETAILS/REQUEST_MAIN_DATA'; //发送供应商主信息请求
const SUPPLIER_DETAILS_RECEIVE_MAIN_DATA = 'SUPPLIER_DETAILS/RECEIVE_MAIN_DATA'; //成功接收供应商主信息请求
const SUPPLIER_DETAILS_RECEIVE_MAIN_DATA_FAIL = 'SUPPLIER_DETAILS/RECEIVE_MAIN_DATA_FAIL'; //失败接收供应商主信息请求

const SUPPLIER_DETAILS_CHANGE_CHARGE_MEN ='SUPPLIER_DETAILS/CHANGE_CHARGE_MEN'; //成功分配负责人后不能显示跟进供应商和分配负责人


const SUPPLIER_DETAILS_EXTEND_ORNOT = 'SUPPLIER_DETAILS/EXTEND_ORNOT'; //修改右侧的展开和收起状态

const SUPPLIER_DETAILS_OPEN_UPDATE_TAG = 'SUPPLIER_DETAILS/OPEN_UPDATE_TAG'; //打开修改供应商合作关系标签弹框
const SUPPLIER_DETAILS_UPDATE_TAG = 'SUPPLIER_DETAILS/UPDATE_TAG'; //修改供应商合作关系标签
const SUPPLIER_DETAILS_CLOSE_UPDATE_TAG = 'SUPPLIER_DETAILS/CLOSE_UPDATE_TAG'; //关闭供应商合作关系标签弹层

const ALL_DETAILS_OPEN_UPDATE_XSJB = 'SALL_DETAILS_OPEN_UPDATE_XSJB'; //打开线索级别弹框
const ALL_DETAILS_UPDATE_XSJB = 'ALL_DETAILS_UPDATE_XSJB'; //修改线索级别标签
const ALL_DETAILS_CLOSE_UPDATE_XSJB = 'ALL_DETAILS_CLOSE_UPDATE_XSJB'; //关闭线索级别弹层

const ALL_DETAILS_QXPK='ALL_DETAILS_QXPK'
const ALL_DETAILS_QRTJ='ALL_DETAILS_QRTJ'

const ALL_DETAILS_QXADDMY = 'ALL_DETAILS_QXADDMY '
const ALL_DETAILS_QRADDMY = 'ALL_DETAILS_QRADDMY '
const ALL_DETAILS_PKRESET = 'ALL_DETAILS_PKRESET '
const ALL_DETAILS_QRADDMYHANDLE = 'ALL_DETAILS_QRADDMYHANDLE '


const requestMainData = () => ({
  type: SUPPLIER_DETAILS_REQUEST_MAIN_DATA
})

const receiveMainData = (data) => ({
  type: SUPPLIER_DETAILS_RECEIVE_MAIN_DATA,
  data
})

const receiveMainDataFail = () => ({
  type: SUPPLIER_DETAILS_RECEIVE_MAIN_DATA_FAIL
})

const switchExtend = () => ({
  type: SUPPLIER_DETAILS_EXTEND_ORNOT
})

const openUpdateTag = () => ({
  type: SUPPLIER_DETAILS_OPEN_UPDATE_TAG
})

const updateTag = (data) => ({
  type: SUPPLIER_DETAILS_UPDATE_TAG,
  data
})

const updateXSJB = (data) => ({
  type: ALL_DETAILS_UPDATE_XSJB,
  data
})

const openUpdateXSJB = () => ({
  type: ALL_DETAILS_OPEN_UPDATE_XSJB
})

const closeUpdateXSJB = () => ({
  type: ALL_DETAILS_CLOSE_UPDATE_XSJB,
})

const closeUpdateTag = () => ({
  type: SUPPLIER_DETAILS_CLOSE_UPDATE_TAG,
})

const changeChargeMen = () => ({
  type: SUPPLIER_DETAILS_CHANGE_CHARGE_MEN,
})


export const doChangeChargeMen =() => (dispatch, getState) => {
  return dispatch(changeChargeMen());
}

export  const QXPK = () => ({
  type: ALL_DETAILS_QXPK,
})

export  const QRTJ = () => ({
  type: ALL_DETAILS_QRTJ,
})

export  const QXADDMY = () => ({
  type: ALL_DETAILS_QXADDMY,
})

export  const QRADDMY = () => ({
  type: ALL_DETAILS_QRADDMY,
})

export  const QRADDMYHANDLE = () => ({
  type: ALL_DETAILS_QRADDMYHANDLE,
})

export  const PKreset = () => ({
  type: ALL_DETAILS_PKRESET,
})


export const fetchMainData = (supplierId) => async (dispatch, getState) => {
  try {
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : ''; //使用moduleUrl验证权限
    await dispatch(requestMainData());
    let res = await axios.get(connect_srm + '/management/viewSupplierDetails.do', { params: { supplierId, moduleUrl }});
    if (res.data.code == '1') {
      return dispatch(receiveMainData(res.data.data.data));
    } else {
      return dispatch(receiveMainDataFail());
    }
  } catch (error) {
    console.log('error: ', error)
    return dispatch(receiveMainDataFail());
  }
}

export const fetchMainData2 = (supplierId) => async (dispatch, getState) => {
  try {
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : ''; //使用moduleUrl验证权限
    await dispatch(requestMainData());
    let res = await axios.get(connect_srm + '/clue/viewSupplierClueDetails.do', { params: { supplierId, moduleUrl }});
    if (res.data.code == '1') {
      return dispatch(receiveMainData(res.data.data));
    } else {
      return dispatch(receiveMainDataFail());
    }
  } catch (error) {
    console.log('error: ', error)
    return dispatch(receiveMainDataFail());
  }
}

export const toSwitchExtend = () => (dispatch, getState) => {
  return dispatch(switchExtend());
}

export const toOpenUpdateXSJB = () => (dispatch, getState) => {
  return dispatch(openUpdateXSJB());
}

export const toCloseUpdateXSJB = () => (dispatch, getState) => {
  return dispatch(closeUpdateXSJB());
}

export const toOpenUpdateTag = () => (dispatch, getState) => {
  return dispatch(openUpdateTag());
}



export const toCloseUpdateTag = () => (dispatch, getState) => {
  return dispatch(closeUpdateTag());
}

export const fetchUpdatePartnership = (supplierId, partnership) => async (dispatch, getState) => {
  try {
    var token = getLoginInfo()['token'];  //获取token　登录用
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : ''; //使用moduleUrl验证权限
    let res = await axios.get(connect_srm + '/management/editSupplierPartnership.do', { params: { supplierId,partnership, token, moduleUrl }, timeout: 20000 });
    if (res.data.code == '1') {
      return dispatch(updateTag(partnership));
    } else {
      return toCloseUpdateTag();
    }
  } catch (error) {
    console.log('error: ', error)
    return dispatch(updateTagFail());
  }
}

export const fetchUpdatePartnership2 = (supplierId, partnership) => async (dispatch, getState) => {
  try {
    var token = getLoginInfo()['token'];  //获取token　登录用
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : ''; //使用moduleUrl验证权限
    let res = await axios.get(connect_srm + '/clue/editSupplierClueLevel.do', { params: { supplierId,clueLevel:partnership, token, moduleUrl }, timeout: 20000 });
    if (res.data.code == '1') {
      message.success(`${res.data.msg}`);
      return dispatch(updateXSJB(partnership));
    } else {
      message.error(`${res.data.msg}`);
      return toCloseUpdateXSJB();
    }
  } catch (error) {
    console.log('error: ', error)
    return dispatch(updateTagFail());
  }
}


const defaultState = {
  isfetching: false, //是否获取基础数据中
  isExpand: false,  //右侧企业档案是否展开
  editTagVisible: false, //是否打开标签修改
  editXSJBVisible:false, //是否打开标签修改
  PKVisible:false,//取消品控
  addmyVisible:false,
  PKcontent:'',
  data: {
    supplierId:'',
    partnership:'等待合作', //默认为等待合作
    supplier: {
      cscAccount: '',
      buy5jAccount: '',
      enterpriseType: '',
      clueLevel: '',
      source: '',
      varietyName: '',
      manage: '',
      address: '',
      website: '',
      shopsite: '',
      mainBusiness: '',
      remark: '',
      oem: '',
      manage: '',
      model: '',
      regmoney: '',
      employees: '',
      turnover: '',
      introduce: '',
      userId:''
    },
    supplierBusiness: {
      creditNumber: '',
      province: '',
      city: '',
      deadline: '',
      organization: '',
      corporation: '',
      idcard: '',
      idcards: '',
      license: ''
    }
  }  //主数据
};

const supplierDetailMain = function (state = defaultState, action = {}) {
  switch (action.type) {
    case SUPPLIER_DETAILS_REQUEST_MAIN_DATA:
      return { ...state, isfetching: true };
    case SUPPLIER_DETAILS_RECEIVE_MAIN_DATA:
      return { ...state, isfetching: false, data: action.data }
    case SUPPLIER_DETAILS_RECEIVE_MAIN_DATA_FAIL:
      return { ...state, isfetching: false };
    case SUPPLIER_DETAILS_EXTEND_ORNOT:
      var isExpand = !state.isExpand;
      return { ...state, isExpand: isExpand };
    case SUPPLIER_DETAILS_OPEN_UPDATE_TAG:
      return { ...state, editTagVisible: true };
    case SUPPLIER_DETAILS_UPDATE_TAG:
      var udata = {...state.data,partnership:action.data}
      return { ...state, editTagVisible: false, data:udata};
    case SUPPLIER_DETAILS_CLOSE_UPDATE_TAG:
      return { ...state, editTagVisible: false };
    case ALL_DETAILS_OPEN_UPDATE_XSJB:
      return { ...state, editXSJBVisible: true };
    case ALL_DETAILS_UPDATE_XSJB:
      var udata = {...state.data,clueLevel:action.data}
      return { ...state, editXSJBVisible: false, data:udata};
    case ALL_DETAILS_CLOSE_UPDATE_XSJB:
      return { ...state, editXSJBVisible: false };
    case ALL_DETAILS_QXPK:
      return { ...state, PKVisible: false,PKcontent:''};
    case ALL_DETAILS_QRTJ:
      return { ...state, PKVisible: true,PKcontent:'确认取消品控？' };
    case ALL_DETAILS_QXADDMY:
      return { ...state, addmyVisible: false,ADDMYcontent:''};
    case ALL_DETAILS_PKRESET:
      var newdata = {...state.data,self:'my',qualityControlId:'0'}
      return {...state,  data:newdata};
    case ALL_DETAILS_QRADDMY:
      return { ...state, addmyVisible: true,ADDMYcontent:'确认加入我的线索？' };
    case ALL_DETAILS_QRADDMYHANDLE:
      var newdata = {...state.data,self:'my',}
      return { ...state,data:newdata, addmyVisible: false,ADDMYcontent:'确认加入我的线索？', };
    case SUPPLIER_DETAILS_CHANGE_CHARGE_MEN:
      var data = state.data;
      data['self'] ='N';
      return {...state,data};
    default:
      return state
  }
}

export default supplierDetailMain
import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo, getUrlParams } from '../../../util/baseTool';
import axios from '../../../util/axios';
import _ from 'lodash';
// const xiaowenwu_url = 'http://10.10.10.114:8080/v1';

// const xiaowenwu_url = 'http://10.10.10.214:9503/v1';

const SUPPLIER_DETAILS_REQUEST_MAIN_DATA = 'SUPPLIER_DETAILS/REQUEST_MAIN_DATA'; //发送供应商主信息请求
const SUPPLIER_DETAILS_RECEIVE_MAIN_DATA = 'SUPPLIER_DETAILS/RECEIVE_MAIN_DATA'; //成功接收供应商主信息请求
const SUPPLIER_DETAILS_RECEIVE_MAIN_DATA_FAIL = 'SUPPLIER_DETAILS/RECEIVE_MAIN_DATA_FAIL'; //失败接收供应商主信息请求


const SUPPLIER_DETAILS_EXTEND_ORNOT = 'SUPPLIER_DETAILS/EXTEND_ORNOT'; //修改右侧的展开和收起状态

const SUPPLIER_DETAILS_OPEN_UPDATE_TAG = 'SUPPLIER_DETAILS/OPEN_UPDATE_TAG'; //打开修改供应商合作关系标签弹框
const SUPPLIER_DETAILS_UPDATE_TAG = 'SUPPLIER_DETAILS/UPDATE_TAG'; //修改供应商合作关系标签
const SUPPLIER_DETAILS_CLOSE_UPDATE_TAG = 'SUPPLIER_DETAILS/CLOSE_UPDATE_TAG'; //关闭供应商合作关系标签弹层

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

const closeUpdateTag = () => ({
  type: SUPPLIER_DETAILS_CLOSE_UPDATE_TAG,
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

export const toSwitchExtend = () => (dispatch, getState) => {
  return dispatch(switchExtend());
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


const defaultState = {
  isfetching: false, //是否获取基础数据中
  isExpand: false,  //右侧企业档案是否展开
  editTagVisible: false, //是否打开标签修改
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
    default:
      return state
  }
}

export default supplierDetailMain
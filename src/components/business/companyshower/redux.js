import axios from 'axios';
// import { combineReducers } from 'redux';

import { connect_url } from '../../../util/connectConfig';
import _ from 'lodash';

const COMPANYSHOWER_RECEIVE_DATA = 'COMPANYSHOWER/RECEIVE_DATA'; //获取公司信息
const COMPANYSHOWER_INIT = 'COMPANYSHOWER/INIT'; //初始化默认值
const COMPANYSHOWER_CHANGE_EXTEND = 'COMPANYSHOWER/CHANGE_EXTEND'; //改变展开和收缩状态




const receiveData = data => ({
  type: COMPANYSHOWER_RECEIVE_DATA,
  data
})

const init = data => ({
  type: COMPANYSHOWER_INIT,
  data
})

const changeExtend = data => ({
  type: COMPANYSHOWER_CHANGE_EXTEND,
  data
})




/**
 * 获取列表数据
 * @param {*} data 
 */
export const doReceiveData = data => (dispatch, getState) => {

  //此处以后改为从后台取数据  
  // let res = await axios.get(connect_url + '/buyer/allbuyer/query', { params: params });
  // return await dispatch(receiveList({ tableData: res.data.data, pagination: { total: res.data.total } }));
  var mockData = {
    csc86acount: 1232,
    buywujincont: 12312,
    guimo: '大客户',
    caigousxingzhi: '其他/零售商',
    jibei: '即将签约',
    laiyuan: '自行开发',
    caigouleimu: '',
    caigouleimubuchong: '',
    suoshuhangye: '',
    lianxifangshi: '广东省深圳市华南城',
    zzwenjian: '<a href="www.baidu.com">def.pdf</a>',
    qiyewangzhi: 'www.baidu.com',
    wangpudizhi: 'www.baidu.com',
    zhuyinyewu: '',
    beizhu: '',

    yingyezhizhaobeizhuhao: '2312312412318',
    yingyezhizhaodizhi: '广东省深圳市机场大道18号深圳机场海关',
    yingyezhiqixian: '2019-08-23',
    dengjijigou: '',
    qiyefaren: '',
    shengfenzheng: '',
    fanrenshengfenzheng: '<a href="www.baidu.com">header.jpg</a>',
    yingyezhizhao: '<a href="www.baidu.com">yingyezhizhao.jpg</a>',


    yibanlaishui: '',
    fanrenshouquan: '',
    lianjiechengnuo: '',
    shengchengchejian: '',
    shouquanpingpa: '',
    pingpaishouquan: '',
    ziyoupingpai: '',
    chanpinshuoming: '',
    baojiandan: '',
    chengchenggongyi: '',
    guojiabiaozhun: '',
    disanfang: '',
    chanpingxiaoshou: '',
    shouhoufuwu: '',
    hetong: '<a href="www.baidu.com">hetong.jpg</a>',

    shifouzhichi: '',
    guanlitixi: '',
    jinyingmoshi: '',
    zhucheshijiannianfen: '',
    zhuchezhiben: '',
    yuangongrenshu: '',
    mianyingyee: '',
    gongsijieshao: '华南城网，中国领先的实体市场电子商务平台，由香港上市集团华南城控股有限公司（股份代号：1668HK）投入巨资倾力打造的一个“网上华南城'
  };
  return dispatch(receiveData(mockData));
}

/**
 * 添加的时候初始化form
 * @param {*} data 
 */
export const doInit = data => (dispatch, getState) => {
  return dispatch(init());
}

export const doChangeExtend = data => (dispatch, getState) => {
  return dispatch(changeExtend(data));
}


const defaultState = {
  data: {
    csc86acount: '',
    buywujincont: '',
    guimo: '',
    caigousxingzhi: '',
    jibei: '',
    laiyuan: '',
    caigouleimu: '',
    caigouleimubuchong: '',
    suoshuhangye: '',
    lianxifangshi: '',
    zzwenjian: '',
    qiyewangzhi: '',
    wangpudizhi: '',
    zhuyinyewu: '',
    beizhu: '',

    yingyezhizhaobeizhuhao: '',
    yingyezhizhaodizhi: '',
    yingyezhiqixian: '',
    dengjijigou: '',
    qiyefaren: '',
    shengfenzheng: '',
    fanrenshengfenzheng: '',
    yingyezhizhao: '',


    yibanlaishui: '',
    fanrenshouquan: '',
    lianjiechengnuo: '',
    shengchengchejian: '',
    shouquanpingpa: '',
    pingpaishouquan: '',
    ziyoupingpai: '',
    chanpinshuoming: '',
    baojiandan: '',
    chengchenggongyi: '',
    guojiabiaozhun: '',
    disanfang: '',
    chanpingxiaoshou: '',
    shouhoufuwu: '',
    hetong: '',

    shifouzhichi: '',
    guanlitixi: '',
    jinyingmoshi: '',
    zhucheshijiannianfen: '',
    zhuchezhiben: '',
    yuangongrenshu: '',
    mianyingyee: '',
    gongsijieshao: ''
  },
  isExpand: false
}
const companyShower = function (state = defaultState, action = {}) {
  switch (action.type) {
    case COMPANYSHOWER_RECEIVE_DATA:
      return { ...state, data: action.data }
    case COMPANYSHOWER_CHANGE_EXTEND:
      return { ...state, isExpand: action.data };
    default:
      return state
  }
}

export default companyShower
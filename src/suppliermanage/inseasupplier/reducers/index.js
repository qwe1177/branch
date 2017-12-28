import { combineReducers } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import {
  GET_HEAD_FIRST, GET_HEAD_SECOND, GET_LEFT_MENU, INIT_QUERY,
  SET_QUERY, RESET_QUERY, REQUEST_SUPPLIER, RECEIVE_SUPPLIER,RECEIVE_SUPPLIER_FAIL,CHANGE_MAIN_CHECK
} from '../actions' // 引入action类型常量名

// 初始化state数据

const initQueryform = {
  compNameOrAddressOrMobile:'companyName',
  compNameOrAddressOrMobileValue: '',
  level:'',
  source:'',
  enterpriseType: "",
  varietyNameId: "",
  varietyNameNames: "",
  mainBrand:'',
  mainBrandNames:'',
  areaType:'',
  partnership:'',
  createdate:[],
  other: []
}

const defaultStateOne = { queryform: initQueryform };
//改变查询条件
const mainQueryData = (state = defaultStateOne, action) => {
  switch (action.type) {
    case SET_QUERY:
      return action.data
    case RESET_QUERY:
      return { queryform: initQueryform }
    case INIT_QUERY:
      return defaultStateOne
    default:
      return state       //INIT_QUERY   都取默认值
  }
}

const initTableData = {
  isFetching: false, //是否发送请求中
  tableData: [],  //table数据
  selectedList: [], //选中的值
  pagination:{
    showQuickJumper: true,
    showSizeChanger: true,
    total: 1,
    current: 1,
    pageSize: 10,
    showTotal: total => `共 ${total} 条`
  }
}
const mainTableData = (state = initTableData, action) => {
  switch (action.type) {
    case REQUEST_SUPPLIER:
      return { ...state, isFetching: true }
    case RECEIVE_SUPPLIER:
      let { tableData, pagination } = action.data
      let newPagination = {...state.pagination,...pagination};
      return { ...state, tableData, pagination:newPagination, isFetching: false }
    case RECEIVE_SUPPLIER_FAIL:
      return { ...state, isFetching: false }
    case CHANGE_MAIN_CHECK:
      let { selectedList} = action.data
      return { ...state, selectedList }
    default:
      return state  //INIT_SUPPLIER的时候取默认值
  }
}

//使用combineReducers把store内容分到不同作用域
const rootReducer = combineReducers({
  mainQueryData,
  mainTableData
})

export default rootReducer

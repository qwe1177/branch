import { combineReducers } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import {
  tablemodelInfo,modalmodelInfo
} from '../actions' // 引入action类型常量名

// 初始化state数据

function tablemodel(state = {
  data: [],
}, action) {

  switch (action.type) {
      case tablemodelInfo:
          return {
              ...state,
              ...action.payload,
          };
      default:
          return state;
  }
}


//使用combineReducers把store内容分到不同作用域
const rootReducer = combineReducers({
  tablemodel
})

export default rootReducer

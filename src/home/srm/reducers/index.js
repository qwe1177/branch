import { combineReducers } from 'redux';
import emptyreducer from '../../../common/reducers/emptyreducer';

//使用combineReducers把store内容分到不同作用域
const rootReducer = combineReducers({
    emptyreducer
})

export default rootReducer

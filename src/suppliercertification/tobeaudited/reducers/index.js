import { combineReducers } from 'redux';
// import emptyreducer from '../../../common/reducers/emptyreducer';
import power from '../../../components/common/power/redux';

//使用combineReducers把store内容分到不同作用域
const rootReducer = combineReducers({
    power
})

export default rootReducer

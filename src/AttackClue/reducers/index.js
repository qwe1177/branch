import { combineReducers } from 'redux';
import commonReducer from '../../common/reducers';

//使用combineReducers把store内容分到不同作用域
const rootReducer = combineReducers({
    ...commonReducer,
})

export default rootReducer

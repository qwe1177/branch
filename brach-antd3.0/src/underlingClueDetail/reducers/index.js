import { combineReducers } from 'redux';
import commonReducer from '../../common/reducers/commonreducer';
import EditModal from '../../components/publicFollowUp/redux'

//使用combineReducers把store内容分到不同作用域
const rootReducer = combineReducers({
    ...commonReducer,EditModal
})

export default rootReducer

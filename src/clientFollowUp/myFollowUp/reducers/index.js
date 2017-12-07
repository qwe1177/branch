import { combineReducers } from 'redux';
import EditModal from '../../../components/publicFollowUp/redux';
import MyFollowUP from '../actions/index.js';
import AddModal from '../components/AddModal/redux'
//使用combineReducers把store内容分到不同作用域
const rootReducer = combineReducers({
    EditModal,
    MyFollowUP,
    AddModal
})

export default rootReducer

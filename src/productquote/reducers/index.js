
import {combineReducers} from 'redux'
import commonReducer from '../../common/reducers/commonreducer'
import {
    tablemodelInfo,modalmodelInfo
} from '../action' // 引入action类型常量名

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

function modalmodel(state = {
    title: "提示", ModalText: '内容',
    visible: false, previewVisible: false, visible2: false, jsbuttionVisible: false,
}
    , action) {
    switch (action.type) {
        case modalmodelInfo:
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
    tablemodel,modalmodel
})

export default rootReducer

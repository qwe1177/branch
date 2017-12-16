import {combineReducers} from 'redux'
import {
    BASEINFO, MODALMODEL_INFO,INIT_INFO, TABLEMODEL1_INFO, TABLEMODEL2_INFO,RESETTABLEMODEL1_INFO
} from '../actions'

/**上传图标相关 */
function Infos(state = {orOut: {name: 'orOut', value: '2'}}, action) {
    switch (action.type) {
        case BASEINFO:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

/**提示弹层相关 */
function modalmodel(state = {
    title: "提示", ModalText: '内容',
    visible: false, previewVisible: false, visible2: false, jsbuttionVisible: false, submitVisible: false,
}
    , action) {
    switch (action.type) {
        case MODALMODEL_INFO:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


/**产品报价 */
const defaultState = {
    data1: [{
        key: '1',
        No: '1',
        brankName: {name: 'brankName1', message: '请输入品牌名称', placeholder: '品牌名称',},
        brankType: {name: 'brankType1', message: '请输入品牌类型', placeholder: '品牌类型',},
        authorization: {name: 'authorization1', message: '请上传授权书', placeholder: '授权书',},
        registration: {name: 'registration1', message: '请输入注册证', placeholder: '注册证',},
        certification: {name: 'certification1', message: '请输入认证报告', placeholder: '认证报告',},
        otherAptitude: {name: 'otherAptitude1', message: '请输入其他资料', placeholder: '其他资料', num: 3,},
        Operation: '删除'
    }],
    count: 1,
}

function tablemodel1(state = defaultState, action) {
    switch (action.type) {
        case TABLEMODEL1_INFO:
            return {
                ...state,
                ...action.payload,
            };
        case RESETTABLEMODEL1_INFO:
            return {...defaultState};
        default:
            return state;
    }
}


function tablemodel2(state = {
    data2: [],
    count:0
}
    , action) {
    switch (action.type) {
        case TABLEMODEL2_INFO:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    Infos,modalmodel,tablemodel1, tablemodel2
})

export default rootReducer

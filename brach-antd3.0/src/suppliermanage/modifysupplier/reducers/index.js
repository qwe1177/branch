import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer'
import {
    SELECT_REDDIT,
    INVALIDATE_REDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    baseInfo,
    modalmodelInfo,
    tablemodelInfo,
    tablemodelInfo2,
    tablemodelInfo3,
    tablemodelInfo4
} from '../actions'

function Infos(state = {orOut: {name: 'orOut', value: '2'}}, action) {
    switch (action.type) {
        case baseInfo:
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
    visible: false, previewVisible: false, visible2: false, jsbuttionVisible: false, submitVisible: false,
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

function tablemodel(state = {
    data: [{
        key: '1',
        fullname: {name: 'fullname1', message: '请输入姓名', placeholder: '姓名', required: true,},
        gender: {name: 'gender1', message: '请输入性别', placeholder: '性别',},
        mobile: {name: 'mobile1', message: '请输入手机', placeholder: '手机', required: true,},
        telephone: {name: 'telephone1', message: '请输入固话', placeholder: '固话',},
        position: {name: 'position1', message: '请输入职位', placeholder: '职位',},
        birthday: {name: 'birthday1', message: '请输入生日', placeholder: '生日',},
        email: {name: 'email1', message: '请输入邮箱', placeholder: '邮箱', required: false, type: 'email',},
        fax: {name: 'fax1', message: '请输入传真', placeholder: '传真',},
        wangwang: {name: 'wangwang1', message: '请输入旺旺', placeholder: '旺旺',},
        qq: {name: 'qq1', message: '请输入QQ', placeholder: 'QQ',},
        weixin: {name: 'weixin1', message: '请输入微信', placeholder: '微信',},
        remark: {name: 'remark1', message: '请输入备注', placeholder: '备注',},
        del: '删除',
    }],
    count: 2,
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

function tablemodel2(state = {
    data2: [{
        key: '1',
        No: '1',
        brankName: {name: 'brankName1', message: '请输入品牌名称', placeholder: '品牌名称',},
        brankType: {name: 'brankType1', message: '请输入品牌类型', placeholder: '品牌类型',},
        authorization: {name: 'authorization1', message: '请上传授权书', placeholder: '授权书',},
        registration: {name: 'registration1', message: '请输入注册证', placeholder: '注册证',},
        certification: {name: 'certification1', message: '请输入认证报告', placeholder: '认证报告',},
        otherAptitude: {name: 'otherAptitude1', message: '请输入其他资料', placeholder: '其他资料', num: 3,},
        Operation: '删除',
    }],
    count: 2,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo2:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function tablemodel3(state = {
    data3: [],
    count: 0,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo3:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function tablemodel4(state = {
    data4: [],
    count: 0,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo4:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    ...commonReducer, Infos, modalmodel, tablemodel, tablemodel2, tablemodel3, tablemodel4
})

export default rootReducer

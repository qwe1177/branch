import {combineReducers} from 'redux'
import {
    SELECT_REDDIT, INVALIDATE_REDDIT,
    REQUEST_POSTS, RECEIVE_POSTS, baseInfo, modalmodelInfo, tablemodelInfo, tablemodelInfo2, tablemodelInfo3
} from '../actions'

function Infos(state = {}, action) {
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

function tablemodel(state = {
    data: [{
        key: '1',
        name: {name: 'name1', message: '请输入姓名', placeholder: '姓名', required: true,},
        sex: {name: 'sex1', message: '请输入性别', placeholder: '性别',},
        phone: {name: 'phone1', message: '请输入手机', placeholder: '手机', required: true,},
        tel: {name: 'tel1', message: '请输入固话', placeholder: '固话',},
        profession: {name: 'profession1', message: '请输入职位', placeholder: '职位',},
        Birthday: {name: 'Birthday1', message: '请输入生日', placeholder: '生日',},
        email: {name: 'email1', message: '请输入邮箱', placeholder: '邮箱', required: false, type: 'email',},
        fax: {name: 'fax1', message: '请输入传真', placeholder: '传真',},
        wangwang: {name: 'wangwang1', message: '请输入旺旺', placeholder: '旺旺',},
        QQ: {name: 'QQ1', message: '请输入QQ', placeholder: 'QQ',},
        weixin: {name: 'weixin1', message: '请输入微信', placeholder: '微信',},
        mark: {name: 'mark1', message: '请输入备注', placeholder: '备注',},
        Operation: '删除',
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
        BrandName: '阿拉斯加皇后',
        BrandType: {name: 'BrandType1', message: '请输入品牌类型', placeholder: '品牌类型',},
        powerofAttorney: {name: 'powerofAttorney1', message: '请上传授权书', placeholder: '授权书',},
        registCard: {name: 'registCard1', message: '请输入注册证', placeholder: '注册证',},
        AuditReports: {name: 'AuditReports1', message: '请输入认证报告', placeholder: '认证报告',},
        OtherInformation: {name: 'OtherInformation1', message: '请输入其他资料', placeholder: '其他资料',},
        adduser:'张三',
        adddate:'2016/05/06',
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


const rootReducer = combineReducers({
    Infos, modalmodel, tablemodel, tablemodel2, tablemodel3
})

export default rootReducer

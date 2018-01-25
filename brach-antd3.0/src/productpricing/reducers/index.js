
import {combineReducers} from 'redux'
import commonReducer from '../../common/reducers/commonreducer'
import {
    tablemodelInfo,modalmodelList
} from '../actions' // 引入action类型常量名

function tablemodel(state = {
    data: [{
        id: '1',
        specCode: {name: 'specCode1', message: '请输入规格编码', placeholder: '请输入规格编码', required: true,},
        pName: {name: 'pName1', message: '请输入名称', placeholder: '请输入名称',required: true,},
        brand: {name: 'brand1', message: '请输入品牌', placeholder: '请输入品牌', required: true,},
        categoryName: {name: 'categoryName1', message: '请输入所属类目', placeholder: '请输入所属类目',required: false,},
        specParams: {name: 'specParams1', message: '请输入规格型号', placeholder: '请输入规格型号',required: false,},
        unit: {name: 'unit1', message: '请输入单位', placeholder: '请输入单位',required: false,},
        minQuantity: {name: 'minQuantity1' , message: '请输入最小起订量', placeholder: '请输入最小起订量', required: false,},
        price: {name: 'price1', message: '请输入进价(元)', placeholder: '请输入进价(元)', required: true,},
        taux: {name: 'taux1', message: '请输入税点', placeholder: '请输入税点',required: false,},
        invoice: {name: 'invoice1', message: '请输入发票', placeholder: '请输入发票',required: false,},
        deliveryTime: {name: 'deliveryTime1', message: '请输入付款交期', placeholder: '请输入付款交期',required: false,},
        payWay: {name: 'payWay1', message: '请输入付款方式', placeholder: '请输入付款方式',required: false,},
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

function modalmodelall(state = {
    title: "提示", ModalText: '内容',
    visible: false, previewVisible: false, visible2: false, jsbuttionVisible: false,
}
    , action) {
    switch (action.type) {
        case modalmodelList:
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
    tablemodel,modalmodelall
})

export default rootReducer

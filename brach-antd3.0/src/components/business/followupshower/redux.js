import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';
import axios from '../../../util/axios';
import _ from 'lodash';



const FOLLOWUPSHOWER_REQUEST_DATA = 'FOLLOWUPSHOWER/REQUEST_DATA'; //发送查询请求中
const FOLLOWUPSHOWER_RECEIVE_DATA = 'FOLLOWUPSHOWER/RECEIVE_DATA'; //获取查询信息
const FOLLOWUPSHOWER_RECEIVE_DATA_FAIL = 'FOLLOWUPSHOWER/RECEIVE_DATA_FAIL'; //查选失败
const FOLLOWUPSHOWER_SHOW_COMMENT_FORM = 'FOLLOWUPSHOWER/SHOW_COMMENT_FORM'; //显示添加批注

const COMPANYSHOWER_CHANGE_QUERY = 'COMPANYSHOWER/CHANGE_QUERY'; //改变查询条件

const COMPANYSHOWER_DELETE_FOLLOW_MESSAGE = 'COMPANYSHOWER/DELETE_FOLLOW_MESSAGE'; //删除更进记录

const COMPANYSHOWER_MODIFIY_FOLLOW_INFO = 'COMPANYSHOWER/MODIFIY_FOLLOW_INFO'; //修改跟进记录


const requestData = () => ({
    type: FOLLOWUPSHOWER_REQUEST_DATA
})
const receiveData = data => ({
    type: FOLLOWUPSHOWER_RECEIVE_DATA,
    data
})

const receiveDataFail = () => ({
    type: FOLLOWUPSHOWER_RECEIVE_DATA_FAIL
})

const changeQuery = data => ({
    type: COMPANYSHOWER_CHANGE_QUERY,
    data
})

const deleteFollowMessage = (followUpId, commentId) => ({
    type: COMPANYSHOWER_DELETE_FOLLOW_MESSAGE,
    followUpId,
    commentId
})

const modifiyFollowInfo = data => ({
    type: COMPANYSHOWER_MODIFIY_FOLLOW_INFO,
    data
})

const showCommentForm = data => ({
    type: FOLLOWUPSHOWER_SHOW_COMMENT_FORM,
    data
})





export const doDeleteFollowMessage = (followUpId, commentId) => (dispatch, getState) => {
    return dispatch(deleteFollowMessage(followUpId, commentId));
}

export const doModifiyFollowInfo = data => (dispatch, getState) => {
    return dispatch(modifiyFollowInfo(data));
}

/**
 * 点击查询或者分页进行查询
 * @param {*} data 
 */
export const doQueryFollow = (queryParams) => async (dispatch, getState) => {
    try {
        await dispatch(changeQuery(queryParams));
        var urlParams = getUrlParams();
        var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : '';
        var supplierId = urlParams['supplierId']?urlParams['supplierId']:'';

        /**直接修改prop中的值，会导致修改redux值，拷贝一份 */
        var {query, pagination} = _.cloneDeep(queryParams);

        if(query.followUpDate && query.followUpDate.length>0){ //时间段存在，拆分时间段参数
            query.followUpStartTime = query.followUpDate[0].format("YYYY-MM-DD");
            query.followUpEndTime  = query.followUpDate[1].format("YYYY-MM-DD");
        }
        delete query.followUpDate;
        if(query.followUpNodeOrFlagValues && query.followUpNodeOrFlagValues.length>0){
            query.followUpNodeOrFlagValues =query.followUpNodeOrFlagValues.toString();
        }
        
        //pageSize  offset 后台的名字意义是代表当前第几页和偏移
        var params ={...query,pageNo:pagination.current,offset:pagination.pageSize,supplierId,moduleUrl}
        await dispatch(requestData());
        var res = await axios.get(connect_srm + '/management/viewSupplierDetailsFollowupList.do', { params: params});
        if(res.data.code =='1'){
            var list = res.data.data.data;
            pagination.total = res.data.data.rowCount;
            return await dispatch(receiveData({list,pagination}));
        }else{
            return await dispatch(receiveDataFail());
        }
    } catch (error) {
        console.log('error: ', error)
        return await dispatch(receiveDataFail());
    }
}


// * @param supplierId 供应商id
// * @param contactWay 跟进方式
// * @param isPostil 是否有批注：all/yes/no
// * @param followupType 跟进类型： 1 线索跟进， 2 供应商跟进（非必参数）
// * @param followUpStartTime 跟进开始时间
// * @param followUpEndTime 跟进结束时间
// * @param followUpNodeOrFlag 跟进节点/标签：node 节点，flag 标签
// * @param followUpNodeOrFlagValues 跟进节点/标签的值，多个值以,隔开
// * @param pageSize 页码数
// * @param offset 当前显示条数
export const doFirstQueryFollow = (queryParams) => async (dispatch, getState) => {
    try {
        var urlParams = getUrlParams();
        var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : '';
        var supplierId = urlParams['supplierId']?urlParams['supplierId']:'';

        var {query, pagination} = queryParams

        var params ={...query,pageSize:pagination.pageSize,pageNo:pagination.current,supplierId,moduleUrl}
        await dispatch(requestData());
        var res = await axios.get(connect_srm + '/management/viewSupplierDetailsFollowupList.do', { params: params});
        if(res.data.code =='1'){
            var list = res.data.data.data;
            // list.map((o)=>{
            //     o['type']= 'xiashu'  //'xiashu' 'ziji' 'other'
            //     o['supplierFollowupPostilDTOs'].map((i)=>{
            //         i['isown'] =true;
            //     })
            // })
            pagination.total = res.data.data.rowCount;
            return await dispatch(receiveData({list,pagination}));
        }else{
            return await dispatch(receiveDataFail());
        }
    } catch (error) {
        console.log('error: ', error)
        return await dispatch(receiveDataFail());
    }
}

export const showOneCommentForm = (list,id) =>  (dispatch, getState) =>{
    var newList = list.map((o)=>{
        if(o.id ==id){
            o['showCommentForm'] = true;
        }
        return o;
    })
    dispatch(showCommentForm(newList));
}




const defaultState = {
    visible: true,
    query: {
        followUpWay: '',
        isPostil :'all',
        followUpDate: [],
        followUpNodeOrFlag:'',
        followUpNodeOrFlagValues : [],
    },
    pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        current: 1,
        pageSize: 10,
        showTotal: total => `共 ${total} 条`
    },
    list: [],
    isFetching: false
}
const followupShower = function (state = defaultState, action = {}) {
    switch (action.type) {
        case FOLLOWUPSHOWER_REQUEST_DATA:
            return { ...state, isFetching: true }
        case FOLLOWUPSHOWER_RECEIVE_DATA:
            let pagination = {...state.pagination,...action.data.pagination};
            return { ...state, list: action.data.list,pagination:pagination, isFetching: false };
        case FOLLOWUPSHOWER_RECEIVE_DATA_FAIL:
            return { ...state, isFetching: false };
        case FOLLOWUPSHOWER_SHOW_COMMENT_FORM:
            return {...state, list:action.data};
        case COMPANYSHOWER_CHANGE_QUERY:
            var {query,pagination} = action.data;
            return { ...state, query: query, pagination: pagination };
        case COMPANYSHOWER_DELETE_FOLLOW_MESSAGE:
            var {followUpId,commentId} =action;
            var {list} = state;
            var index1 = list.findIndex((o)=>{
                return o.id == followUpId;
            })
            if(index1!=-1){
                var comments = list[index1].supplierFollowupPostilDTOs;
                var index2 = comments.findIndex((o)=>{
                    return o.id == commentId;
                })
                if(index2!=-1){
                    comments.splice(index2,1);
                }
            }
            return { ...state ,list:list};
        case COMPANYSHOWER_MODIFIY_FOLLOW_INFO:
            //此处可以刷新列表数据，或者返回记录替换list的对应的数据，后台联调的时候再做
            return { ...state };
        default:
            return state
    }
}

export default followupShower
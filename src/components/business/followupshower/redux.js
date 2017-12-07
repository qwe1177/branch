import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';
import axios from 'axios';
import _ from 'lodash';
// const xiaowenwu_url = 'http://10.10.10.114:8080/v1';



const FOLLOWUPSHOWER_REQUEST_DATA = 'FOLLOWUPSHOWER/REQUEST_DATA'; //发送查询请求中
const FOLLOWUPSHOWER_RECEIVE_DATA = 'FOLLOWUPSHOWER/RECEIVE_DATA'; //获取查询信息
const FOLLOWUPSHOWER_RECEIVE_DATA_FAIL = 'FOLLOWUPSHOWER/RECEIVE_DATA_FAIL'; //查选失败


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

const deleteFollowMessage = data => ({
    type: COMPANYSHOWER_DELETE_FOLLOW_MESSAGE,
    data
})

const modifiyFollowInfo = data => ({
    type: COMPANYSHOWER_MODIFIY_FOLLOW_INFO,
    data
})






export const doDeleteFollowMessage = data => (dispatch, getState) => {
    return dispatch(deleteFollowMessage(data));
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
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var url = urlParams['url']?urlParams['url']:'';
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
        

        var params ={...query,pageSize:pagination.pageSize,offset:pagination.current,supplierId,token,moduleUrl,url}
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

        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var url = urlParams['url']?urlParams['url']:'';
        var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : '';
        var supplierId = urlParams['supplierId']?urlParams['supplierId']:'';

        var {query, pagination} = queryParams
        var params ={...query,pageSize:pagination.pageSize,offset:pagination.current,supplierId,token,moduleUrl,url}
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





const defaultState = {
    visible: true,
    query: {
        followUpWay: '全部',
        isPostil :'all',
        followUpDate: [],
        followUpNodeOrFlag:'flag',
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
        case COMPANYSHOWER_CHANGE_QUERY:
            var {query,pagination} = action.data;
            return { ...state, query: query, pagination: pagination };
        case COMPANYSHOWER_DELETE_FOLLOW_MESSAGE:
            var {listKey,messkey} = action.data; //要删除的
            var {list} = state;
            var index1 = list.findIndex((o)=>{
                return o.key == listKey;
            })
            
            if(index1!=-1){
                var index2 = list[index1].message.findIndex((o)=>{
                    return o.key == messkey;
                })

                if(index2!=-1){
                    list[index1].message.splice(index2,1);
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
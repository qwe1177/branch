import axios from 'axios';
// import { combineReducers } from 'redux';
import { getLoginInfo} from '../../../util/baseTool.js';
import { connect_srm } from '../../../util/connectConfig.js';
import _ from 'lodash';


const MYFOLLOWUP_REQUEST_DATA = 'MYFOLLOWUP/REQUEST_DATA'; //发送查询请求中
const MYFOLLOWUP_RECEIVE_DATA = 'MYFOLLOWUP/RECEIVE_DATA'; //获取查询信息
const MYFOLLOWUP_RECEIVE_DATA_FAIL = 'MYFOLLOWUP/RECEIVE_DATA_FAIL'; //查选失败
const MYFOLLOWUP_RESET_QUERY = 'MYFOLLOWUP/RESET_QUERY' //重置查询条件
const MYFOLLOWUP_EDIT_FOLLOW_INFO = 'MYFOLLOWUP_EDIT_FOLLOW_INFO'; //修改跟进记录

const requestData = data => ({
    type: MYFOLLOWUP_REQUEST_DATA,
    data
})
const receiveData = data => ({
    type: MYFOLLOWUP_RECEIVE_DATA,
    data
})

const receiveDataFail = data => ({
    type: MYFOLLOWUP_RECEIVE_DATA_FAIL,
    data
})

const resetQuery = data => ({
    type: MYFOLLOWUP_RESET_QUERY,
    data
})

const editFollowInfo = data => ({
    type: MYFOLLOWUP_EDIT_FOLLOW_INFO,
    data
})


export const doEditFollowInfo = data => (dispatch, getState) => {
    return dispatch(editFollowInfo(data));
}
export const doResetQuery= data => (dispatch, getState) => {
    return dispatch(resetQuery(data));
}


export const doQueryFollow = (queryParams) => async (dispatch, getState) => {
    try {
        await dispatch(requestData(queryParams));
        var token = getLoginInfo()['token'];  //获取token　登录用
         /**直接修改prop中的值，会导致修改redux值，拷贝一份 */
        var {query, pagination} = _.cloneDeep(queryParams);
        var paramPagination = {pageNo :pagination.current,pageSize:pagination.pageSize};
        if (query.finishData && query.finishData.length > 0) {
            query.startTime = query.finishData[0].format("YYYY-MM-DD");
            query.endTime = query.finishData[1].format("YYYY-MM-DD");
        } 
        if(query.followupType &&  query.followupType .length>0) {
            query.followupType = query.followupType.toString();
        }
        var params = {...query,...paramPagination,token};
        params.finishData = undefined
        query = _.omitBy(query, _.isUndefined); //删除undefined参数
        let res = await axios.get(connect_srm+'/supplier/viewFollowupListByName.do', { params: params });
        var pageSize=parseInt(res.data.data.pageSize);
        return await dispatch(receiveData({ cardData: res.data.data.data,   pagination: { ...pagination,pageSize:pageSize,total:res.data.data.rowCount}}));
    } catch (error) {
        console.log('error: ', error)
        return await dispatch(receiveDataFail());
    }
}

const defaultState = {
    // visible: true,
    query: {
        companyName: '',
        contactWay: '',
        finishData: [],
        followupType: [],
    },
    pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        current: 1,
        pageSize: 10,
        showTotal: total => `共 ${total} 条`
    },
    cardData: [],
    isFetching: false,
}
const MyFollowUP = function (state = defaultState, action = {}) {
    switch (action.type) {
        case MYFOLLOWUP_REQUEST_DATA:
        let { query} = action.data
            return { ...state, query: query, isFetching: true }
        case MYFOLLOWUP_RECEIVE_DATA:
            let { cardData} = action.data
            let Pagination = {...state.pagination,...action.data.pagination};
            return { ...state,cardData,pagination:Pagination, isFetching: false };
        case MYFOLLOWUP_RECEIVE_DATA_FAIL:
            return { ...state, isFetching: false };
        case MYFOLLOWUP_EDIT_FOLLOW_INFO:
            //此处可以刷新列表数据，或者返回记录替换list的对应的数据，后台联调的时候再做
            return { ...state};
        default:
            return state
    }
}
export default MyFollowUP
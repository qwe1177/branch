import axios from 'axios';
// import { combineReducers } from 'redux';

import { connect_url } from '../../../util/connectConfig';
import _ from 'lodash';



const FOLLOWUPSHOWER_REQUEST_DATA = 'FOLLOWUPSHOWER/REQUEST_DATA'; //发送查询请求中
const FOLLOWUPSHOWER_RECEIVE_DATA = 'FOLLOWUPSHOWER/RECEIVE_DATA'; //获取查询信息
const FOLLOWUPSHOWER_RECEIVE_DATA_FAIL = 'FOLLOWUPSHOWER/RECEIVE_DATA_FAIL'; //查选失败


const COMPANYSHOWER_CHANGE_QUERY = 'COMPANYSHOWER/CHANGE_QUERY'; //改变查询条件

const COMPANYSHOWER_DELETE_FOLLOW_MESSAGE = 'COMPANYSHOWER/DELETE_FOLLOW_MESSAGE'; //删除更进记录

const COMPANYSHOWER_MODIFIY_FOLLOW_INFO = 'COMPANYSHOWER/MODIFIY_FOLLOW_INFO'; //修改跟进记录


const requestData = data => ({
    type: FOLLOWUPSHOWER_REQUEST_DATA,
    data
})
const receiveData = data => ({
    type: FOLLOWUPSHOWER_RECEIVE_DATA,
    data
})

const receiveDataFail = data => ({
    type: FOLLOWUPSHOWER_RECEIVE_DATA_FAIL,
    data
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


const mockData = {
    list: [{
        key: '1',
        mainName: '深圳市华南城网科技有限公司',
        createDate: '2017/8/12',
        tags: [{ link: 'www.baidu.com', label: '售后服务' }, { link: 'www.baidu.com', label: '询报价' }, { link: 'www.baidu.com', label: '开具发票' }],
        doContact: '欧阳文杰',
        contactPerson: '李小姐',
        followType: '上门拜访',
        negotiationContent: '洽谈内容',
        planNext: '下周完成报价',
        followInfo: '2017/8/12跟进',
        message: [
            {
                key: '1',
                author: '欧阳文杰',
                message: '在数据发生变化的时候，React从概念上讲与点击了F5一样，实际上它仅仅是更新了变化的一部分而已。React是关于构造可重用组件的，实际上，使用React你做的仅仅是构建组建。通过封装，使得组件代码复用、测试以及关注点分离更加容易。',
                date: '2017/8/12 14:32'
            },
            {
                key: '2',
                author: '欧阳文杰',
                message: '传统的web应用，操作DOM一般是直接更新操作的，但是我们知道DOM更新通常是比较昂贵的。而React为了尽可能减少对DOM的操作，提供了一种不同的而又强大的方式来更新DOM，代替直接的DOM操作。就是Virtual DOM,一个轻量级的虚拟的DOM，就是React抽象出来的一个对象，描述dom应该什么样子的，应该如何呈现。通过这个Virtual DOM去更新真实的DOM，由这个Virtual DOM管理真实DOM的更新。',
                date: '2017/8/12 14:32'
            }
        ]
    },
    {
        key: '2',
        mainName: '深圳市华南城网科技有限公司2',
        createDate: '2017/8/12',
        tags: [{ link: 'www.baidu.com', label: '售后服务' }, { link: 'www.baidu.com', label: '询报价' }, { link: 'www.baidu.com', label: '开具发票' }],
        doContact: '欧阳文杰',
        contactPerson: '李小姐',
        followType: '上门拜访',
        negotiationContent: '洽谈内容',
        planNext: '下周完成报价',
        followInfo: '2017/8/12跟进',
        message: [
            {
                key: '1',
                author: '欧阳文杰',
                message: '在数据发生变化的时候，React从概念上讲与点击了F5一样，实际上它仅仅是更新了变化的一部分而已。React是关于构造可重用组件的，实际上，使用React你做的仅仅是构建组建。通过封装，使得组件代码复用、测试以及关注点分离更加容易。',
                date: '2017/8/12 14:32'
            }
        ]
    },
    {
        key: '3',
        mainName: '深圳市华南城网科技有限公司3',
        createDate: '2017/8/12',
        tags: [{ link: 'www.baidu.com', label: '售后服务' }, { link: 'www.baidu.com', label: '询报价' }, { link: 'www.baidu.com', label: '开具发票' }],
        doContact: '欧阳文杰',
        contactPerson: '李小姐',
        followType: '上门拜访',
        negotiationContent: '洽谈内容',
        planNext: '下周完成报价',
        followInfo: '2017/8/12跟进',
        message: []
    }
    ],
    pagination: {
        total: 25,
        current: 1
    }
};

/**
 * 获取列表数据
 * @param {*} data 
 */
export const doReceiveData = data => (dispatch, getState) => {

    //此处以后改为从后台取数据  
    // let res = await axios.get(connect_url + '/buyer/allbuyer/query', { params: params });
    // return await dispatch(receiveList({ tableData: res.data.data, pagination: { total: res.data.total } }));
    var data1 = mockData;
    return dispatch(receiveData(data1));
}




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
export const doQueryFollow = (data) => async (dispatch, getState) => {
    try {
        await dispatch(changeQuery(data));
        await dispatch(requestData(data));
        return await dispatch(receiveData(mockData));
    } catch (error) {
        console.log('error: ', error)
        return await dispatch(receiveDataFail());
    }
}

export const doFirstQueryFollow = (data) => async (dispatch, getState) => {
    try {
        await dispatch(requestData(data));
        return await dispatch(receiveData(mockData));
    } catch (error) {
        console.log('error: ', error)
        return await dispatch(receiveDataFail());
    }
}





const defaultState = {
    visible: true,
    query: {
        followUpWay: '全部',
        hasComment: '是',
        followUpDate: [],
        followUpNode: [],
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
import {connect_srm} from '../../../util/connectConfig';
import {getLoginInfo, getUrlParams, getOneUrlParams} from '../../../util/baseTool';
import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';


import moment from 'moment';

const PERSONLISTSHOWER_REQUEST_LIST = 'PERSONLISTSHOWER/REQUEST_LIST'; //获取list
const PERSONLISTSHOWER_RECEIVE_LIST = 'PERSONLISTSHOWER/RECEIVE_LIST'; //获取接收list
const PERSONLISTSHOWER_RECEIVE_LIST_FAIL = 'PERSONLISTSHOWER/RECEIVE_LIST_FAIL'; //获取接收list失败


const PERSONLISTSHOWER_PRE_ADD = 'PERSONLISTSHOWER/PRE_ADD'; //初始化|添加的默认值
const PERSONLISTSHOWER_PRE_EDIT = 'PERSONLISTSHOWER/PRE_EDIT'; //初始化修改|添加的默认值

const PERSONLISTSHOWER_CANCEL_FORM = 'PERSONLISTSHOWER/CANCEL_FORM'; //关闭弹窗

const PERSONLISTSHOWER_SET_FORM = 'PERSONLISTSHOWER/SET_FORM'; //提交添加和修改是时候修改from内容
const PERSONLISTSHOWER_REQUEST_EFFECT_ITEM = 'PERSONLISTSHOWER/REQUEST_EFFECT_ITEM'; //提交添加或者修改内容中
const PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_SUCCESS = 'PERSONLISTSHOWER/RECEIVE_EFFECT_ITEM_SUCCESS'; //接收提交内容结果
const PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_FAIL = 'PERSONLISTSHOWER/RECEIVE_EFFECT_ITEM_FAIL'; //接收提交内容结果

const requestList = () => ({
    type: PERSONLISTSHOWER_REQUEST_LIST
})

const receiveList = data => ({
    type: PERSONLISTSHOWER_RECEIVE_LIST,
    data
})

const receiveListFail = () => ({
    type: PERSONLISTSHOWER_RECEIVE_LIST_FAIL
})


const preAdd = data => ({
    type: PERSONLISTSHOWER_PRE_ADD,
    data
})

const preEdit = data => ({
    type: PERSONLISTSHOWER_PRE_EDIT,
    data
})

const cancelForm = data => ({
    type: PERSONLISTSHOWER_CANCEL_FORM,
    data
})

const setForm = data => ({
    type: PERSONLISTSHOWER_SET_FORM,
    data
})
const requestEffectItem = () => ({
    type: PERSONLISTSHOWER_REQUEST_EFFECT_ITEM
})

const receiveEffectItemSuccess = data => ({
    type: PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_SUCCESS,
    data
})

const receiveEffectItemFail = () => ({
    type: PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_FAIL
})


export const fetchListData = (supplierId) => async(dispatch, getState) => {
    try {
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : ''; //使用moduleUrl验证权限
        await dispatch(requestList());
        let res = await axios.get(connect_srm + '/supplier/viewContactList.do', {
            params: {
                supplierId,
                token,
                moduleUrl
            }
        });
        if (res.data.code == '1') {
            return dispatch(receiveList(res.data.data.contactsList));
        } else {
            return dispatch(receiveListFail());
        }
    } catch (error) {
        console.log('error: ', error)
        return dispatch(receiveListFail());
    }
}


/**
 * 添加的时候初始化form
 * @param {*} data
 */
export const doPreAdd = data => (dispatch, getState) => {
    return dispatch(preAdd());
}

export const doCancelForm = data => (dispatch, getState) => {
    return dispatch(cancelForm());
}


/**
 * 添加的时候初始化form
 * @param {*} data
 */
export const doPreEdit = contactId =>async(dispatch, getState) => {

    var token = getLoginInfo()['token'];  //获取token　登录用
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : ''; //使用moduleUrl验证权限
    let res = await axios.get(connect_srm + '/supplier/viewContactInfo.do', {params: {contactId, token, moduleUrl}});
    if (res.data.code == '1') {
        /**提取form中需要的数据 */
        var data = _.pick(res.data.data.contact, ['id', 'fullname', 'gender', 'birthday', 'position', 'mobile', 'email', 'wangwang', 'fax', 'weixin', 'qq', 'remark', 'telephone']);
        if (data.birthday && data.birthday != '') { //如果日期存在，转化为moment对象初始化日期对象
            data.birthday = moment(data.birthday);
        }
        return dispatch(preEdit(data));
    }
}


export const doEffectFlow = (prams) => async(dispatch, getState) => {
    try {
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var moduleUrl = urlParams['moduleUrl'] ? urlParams['moduleUrl'] : ''; //使用moduleUrl验证权限
        var supplierId = urlParams['supplierId'] ? urlParams['supplierId'] : '';

        var data = _.omitBy(prams, _.isUndefined); //删除undefined参数
        data = {...data, token, moduleUrl, supplierId};

        var effectUrl = data.id ? '/supplier/editContact.do' : '/supplier/addContact.do';
        if (data.birthday && data.birthday != '') {
            data.birthday = data.birthday.format("YYYY-MM-DD");
        } else if (data.birthday == null) { //设置为null时候置空生日
            data.birthday = '';
        }
        var resParams = qs.stringify(data);
        var res = await axios.post(connect_srm + effectUrl, resParams, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            timeout: 10000
        }); //提交请求
        if (res.data.code == '1') {
            await dispatch(setForm(prams));
            await dispatch(receiveEffectItemSuccess());
        } else {
            await dispatch(receiveEffectItemFail());
        }
        return res;
    } catch (error) {
        await dispatch(receiveEffectItemFail());
        return error;
    }
}

const initForm = {
    id: '',
    fullname: '',
    gender: '男',
    birthday: null,
    position: '',
    mobile: '',
    email: '',
    telephone: '',
    wangwang: '',
    fax: '',
    weixin: '',
    qq: '',
    remarks: ''
}

const defaultState = {
    personList: [], //返回的联系人列表数据
    visible: false,
    islistFetching: false, //用户列表请求中
    isFetching: false, //更新联系人请求中
    pform: initForm //更新的表单数据
}

const personListShower = function (state = defaultState, action = {}) {
    switch (action.type) {
        case PERSONLISTSHOWER_REQUEST_LIST:
            return {...state, islistFetching: true}
        case PERSONLISTSHOWER_RECEIVE_LIST:
            action.data.sort((a, b)=>b.updateTime - a.updateTime)
            return {...state, personList: action.data, islistFetching: false}
        case PERSONLISTSHOWER_RECEIVE_LIST_FAIL:
            return {...state, islistFetching: false}
        case PERSONLISTSHOWER_PRE_ADD:
            return {
                ...state,
                pform: initForm,
                visible: true
            };
        case PERSONLISTSHOWER_PRE_EDIT:
        case PERSONLISTSHOWER_SET_FORM:
            return {...state, pform: action.data, visible: true};
        case PERSONLISTSHOWER_CANCEL_FORM:
            return {...state, visible: false};
        case PERSONLISTSHOWER_REQUEST_EFFECT_ITEM:
            return {...state, isFetching: true};
        case PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_SUCCESS:
            return {...state, isFetching: false, visible: false};
        case PERSONLISTSHOWER_RECEIVE_EFFECT_ITEM_FAIL:
            return {...state, isFetching: false, visible: false};

        default:
            return state
    }
}

export default personListShower
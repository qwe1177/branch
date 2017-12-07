import {getLoginInfo,getUrlParams} from '../../../util/baseTool';
import axios from 'axios';
import { connect_srm } from '../../../util/connectConfig';

export const fetchSetContacts = (supplierIds,userId,RealName,responsibleSources) =>  {
    var token = getLoginInfo()['token'];  //获取token　登录用
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl']?urlParams['moduleUrl']:'';  //使用moduleUrl验证权限
    var moduleId = urlParams['moduleId']?urlParams['moduleId']:''; //使用moduleId验证权限
    var params = {supplierIds, userId,RealName,responsibleSources,token}; 
    if(moduleUrl && moduleUrl!=''){
        params ={...params,moduleUrl}
    }else{
        params ={...params,supplierIds}
    }
    return axios.get(connect_srm + '/clue/editPersonLiable.do', { params: params,timeout: 10000 });
}

export const fetchToHighSea = (supplierIds) =>  {
    var token = getLoginInfo()['token'];  //获取token　登录用
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl']?urlParams['moduleUrl']:'';  //使用moduleUrl验证权限
    var moduleId = urlParams['moduleId']?urlParams['moduleId']:''; //使用moduleId验证权限
    var params = {supplierIds,token}; 
    if(moduleUrl && moduleUrl!=''){
        params ={...params,moduleUrl}
    }else{
        params ={...params,supplierIds}
    }
    return axios.get(connect_srm + '/clue/editToPublic.do', { params: params,timeout: 10000 });
}

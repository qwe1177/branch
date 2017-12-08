import {getLoginInfo,getUrlParams} from '../../../util/baseTool';
import axios from '../../../util/axios';
import { connect_srm } from '../../../util/connectConfig';

export const fetchSetContacts = (supplierId,responsibleUserId,responsiblRealName,responsibleSources) =>  {
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl']?urlParams['moduleUrl']:'';  //使用moduleUrl验证权限
    var moduleId = urlParams['moduleId']?urlParams['moduleId']:''; //使用moduleId验证权限
    var params = {supplierId, responsibleUserId,responsiblRealName,responsibleSources}; 
    if(moduleUrl && moduleUrl!=''){
        params ={...params,moduleUrl}
    }else{
        params ={...params,moduleId}
    }
    return axios.get(connect_srm + '/clue/editPersonLiable.do', { params: params});
}

export const fetchToHighSea = (supplierId) =>  {
    var urlParams = getUrlParams();
    var moduleUrl = urlParams['moduleUrl']?urlParams['moduleUrl']:'';  //使用moduleUrl验证权限
    var moduleId = urlParams['moduleId']?urlParams['moduleId']:''; //使用moduleId验证权限
    var params = {supplierId}; 
    if(moduleUrl && moduleUrl!=''){
        params ={...params,moduleUrl}
    }else{
        params ={...params,moduleId}
    }
    return axios.get(connect_srm + '/clue/editToPublic.do', { params: params});
}

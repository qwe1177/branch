import {getLoginInfo,getUrlParams} from '../../../util/baseTool';
import axios from '../../../util/axios';
import { connect_srm,connect_cas } from '../../../util/connectConfig';

/**设置联系人 */
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

/**移入公海 */
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
/**通过moduleUrl得到moduleId systemId得好序列菜单 */
export const getModuleIdByUrl = (moduleUrl) =>  {
    return axios.get(connect_cas + '/api/menu/getModuleIdByUrl', { params: {moduleUrl}});
}
 
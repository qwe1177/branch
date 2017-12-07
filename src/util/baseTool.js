var querystring = require('querystring');
export const platformId = 1; //平台id ,定义srm 为1
import _ from 'lodash';

const createUUID = (len, radix) => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

/**
 *
 * @param {*} componentName  组件名称
 * @param {*} index //组件序号
 */
export const getRef = (componentName, index) => {
    var uuid = componentName + createUUID(8, index);//位数，基数 ，基数必须是数字
    // console.log(uuid);
    return uuid
}


export const getUrlParams = (url) => {
    if(!url){
        url = location.href;
    }
    var queryArr = url.split('?');
    var querys = queryArr.length > 1 ? querystring.parse(queryArr[1]) : {};
    return querys;
}

export const getOneUrlParams = (attrKey,url) => {
    var urlParams = getUrlParams(url);
    return urlParams[attrKey]?urlParams[attrKey]:'';
}

/**
 * token过期的时候跳转登录页面
 */
export const jumpToLoginPage = () => {
    location.href = 'http://admin.csc86.com/';
}

/**
 * 没权限的时候跳转没权限警告页面页面
 */
export const jumpToUnauthorizedPage = () => {
    location.href = 'http://admin.csc86.com/nopower.html';
}

//通过名字获取是否有操作权限
export const isEntryVisableByName = (name,operateData)=>{
    if(operateData[encodeURI(name)]){
      return true;
    }else{
      return false;
    }
 }


export const getLoginInfo = () => {
    var token = '', platformId = '';
    if (window.localStorage) {
        var loginToken = localStorage.getItem('loginToken'); //保存登录token
        var srmStore = localStorage.getItem('srm'); //保存登录token
        token = loginToken ? loginToken : '';
        platformId = srmStore ? JSON.parse(srmStore)['platformId'] : '';
    } else {
        //Cookie.get("menuTitle", arrDisplay);	
    }
    return { token: token, platformId: platformId };
}

export const getLoginAccount = () => {
    var loginAccount = '';
    if (window.localStorage) {
        var store = localStorage.getItem('loginAccount'); //保存登录token
        loginAccount = store ? JSON.parse(store) : {};
    } else {
        //Cookie.get("menuTitle", arrDisplay);	
    }
    return loginAccount;
}

export const setLoginAccount = (data) => {
    if (window.localStorage) {
        data = _.omitBy(data, _.isUndefined); //删除undefined参数
        localStorage.setItem("loginAccount", JSON.stringify(data));	 //保存platformId在crm的key值下面
    } else {
        //Cookie.write("menuTitle", arrDisplay);	
    }
}


export const setLoginInfo = () => {
    var params = getUrlParams(location.href);
    if (params.platformId && params.token) {
        if (window.localStorage) {
            localStorage.setItem("srm", JSON.stringify({ platformId: params.platformId }));	 //保存platformId在crm的key值下面
            localStorage.setItem("loginToken", params.token);  //保存登录token
        } else {
            //Cookie.write("menuTitle", arrDisplay);	
        }
    }
};

(function () {
    if (!('flex' in document.body.style)) {
        const root = document.getElementById('root');
        const first = document.body.firstChild;
        var html = document.createElement("div");
        html.innerHTML = `<div style='line-height: 50px;background: #ff0000; color: #ffffff;
position: absolute;top: 0px;left:0px; width: 100%;z-index: 99999;text-align: center;'
 onclick="javascript:this.style.display='none'">您的浏览器版本过低，为了更好的体验，请您升级浏览器！
 <a style="color:#108ee9" href="http://se.360.cn/" target="_blank" rel='nofollow'>点击更新</a> </div>`
        document.body.insertBefore(html, first);
        root.style.display = 'none'
    }
})();
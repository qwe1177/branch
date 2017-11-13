var querystring = require('querystring');
export const platformId = 1; //平台id ,定义srm 为1

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
export const getRef  = (componentName,index)=>{
    var uuid = componentName+createUUID(8,index);//位数，基数 ，基数必须是数字
    // console.log(uuid);
    return uuid
}


export const getUrlParams  = (url)=>{
    var queryArr = url.split('?');
    var querys  = queryArr.length>1?querystring.parse(queryArr[1]):{};
    return querys;
}

/**
 * token过期的时候跳转登录页面
 */
export const jumpToLoginPage  = ()=>{
    location.href='http://admin.csc86.com/';
}

/**
 * 没权限的时候跳转没权限警告页面页面
 */
export const  jumpToUnauthorizedPage = ()=>{
    location.href='http://admin.csc86.com/nopower.html';
}



export const  getLoginInfo = ()=>{
    var token ='',platformId='';
    if (window.localStorage) {
        var loginToken =localStorage.getItem('loginToken'); //保存登录token
        var srmStore =localStorage.getItem('srm'); //保存登录token
        token =loginToken?loginToken:token;
        platformId =srmStore?srmStore['platformId']:'';
    } else {
        //Cookie.get("menuTitle", arrDisplay);	
    }
    return {token:token,platformId:platformId};
}

import axios from 'axios'
import obj from './urlaccess'
import {getLoginInfo} from './baseTool'
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use(function (config) {
    const pathname = window.location.pathname;
    const dataarr = [`token=${getLoginInfo().token}`];
    if (obj[pathname]) {
        dataarr.push(obj[pathname])
    }
    if (config.method == 'post') {
        if (config.data) {
            const datastr = dataarr.filter(v=>!config.data.match(new RegExp(v))).join('&');
            config.data = `${config.data}&${datastr}`
        } else {
            config.data = dataarr.join('&')
        }
    } else {
        if (!config.params) {
            config.params = {}
        }
        const dataarrlen = dataarr.length;
        for (let i = 0; i < dataarrlen; i++) {
            const [key,value]=dataarr[i].split('=');
            if (!config.params[key]) {
                config.params[key] = value
            }
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    var sassApiReg = new RegExp("^http://admin.csc86.com/");
    var srmApiReg = new RegExp("^http://srmapi.csc86.com");
    var url = response.config.url;

    if (sassApiReg.test(url) && response.data.code == '901') {
        location.href = 'http://admin.csc86.com/login/index.html';
    }
    if (srmApiReg.test(url) && response.data.code == '10') {
        location.href = 'http://admin.csc86.com/login/index.html';
    }
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default axios
import axios from 'axios'
import obj from './urlaccess'
import {getLoginInfo} from './baseTool'
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use(function (config) {
    const pathname = window.location.pathname;
    const dataarr = [`token=${getLoginInfo().token}`];
    if(obj[pathname]){
        dataarr.push(obj[pathname])
    }
    if (config.method == 'post') {
        const datastr = dataarr.join('&');
        config.data = config.data ? `${config.data}&${datastr}` : `${datastr}`
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
export default axios
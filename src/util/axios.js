import axios from 'axios'
import {getLoginInfo} from './baseTool'
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use(function (config) {
    if(config.method=='post'){
        config.data= config.data?`${config.data}&token=${getLoginInfo().token}`:`token=${getLoginInfo().token}`
    }else{
        if (!config.params) {
            config.params = {}
        }
        if (!config.params.token) {
            config.params.token = getLoginInfo().token
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
export default axios
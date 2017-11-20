import axios from 'axios'
export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const tablemodelInfo2 = 'tablemodelInfo2'
export const tablemodelInfo3 = 'tablemodelInfo3'

axios.defaults.timeout = 30000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头


export const baseInfoForm = value=> ({
    type: baseInfo,
    payload: value
})

export const modalmodelaction = value=> ({
    type: modalmodelInfo,
    payload: value
})

export const tablemodelaction = value=> ({
    type: tablemodelInfo,
    payload: value
})

export const tablemodelaction2 = value=> ({
    type: tablemodelInfo2,
    payload: value
})

export const tablemodelaction3 = value=> ({
    type: tablemodelInfo3,
    payload: value
})

export const fetchPosts = value => (dispatch, getState) => {
    dispatch(baseInfoForm({[value]: []}))
    return axios(`//srm.csc86.com/v1/queryCategoryList.do`)
        .then(response => {
            console.log(response)
            if (response.status == 200) {
                dispatch(baseInfoForm({[value]: response.data.data,}))
            }
        })
}

export const fetchzonesPosts = ({url,name, value, returnName}) => (dispatch, getState) => {
    return axios(`${url}?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        })
}



const actions = {baseInfoForm,modalmodelaction,tablemodelaction,tablemodelaction2,tablemodelaction3,fetchPosts,fetchzonesPosts,}

export default actions
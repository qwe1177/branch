import axios from 'axios'
export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const tablemodelInfo2 = 'tablemodelInfo2'
export const tablemodelInfo3 = 'tablemodelInfo3'
export const tablemodelInfo4 = 'tablemodelInfo4'
import * as config  from '../../../util/connectConfig'


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

export const tablemodelaction4 = value=> ({
    type: tablemodelInfo4,
    payload: value
})

export const fetchPosts = value => (dispatch, getState) => {
    dispatch(baseInfoForm({[value]: []}))
    return axios(`${config.connect_srm}/queryCategoryList.do`)
        .then(response => {
            console.log(response)
            if (response.status == 200) {
                dispatch(baseInfoForm({[value]: response.data.data,}))
            }
        })
}

export const fetchzonesPosts = ({url, name, value, returnName}) => (dispatch, getState) => {
    return axios(`${url}?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        })
}

export const fetchCategory = ()=> async(dispatch, getState) => {
    try {
        var moduleUrl = location.pathname;
        let res = await axios.get(config.connect_srm + '/queryCategoryList.do', { params: {moduleUrl}});
        if(res.data.status){
            var original = res.data.data;
            return await  dispatch(baseInfoForm({'category':original}))
        }
    } catch (error) {
        console.log('error: ', error)
    }
}


const actions = {
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    tablemodelaction2,
    tablemodelaction3,
    tablemodelaction4,
    fetchPosts,
    fetchzonesPosts,
    fetchCategory
}

export default actions
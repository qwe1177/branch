import * as config  from '../../util/connectConfig'
import axios from '../../util/axios'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'


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

export const Paginationmodelaction = value=> ({
    type: PaginationmodelInfo,
    payload: value
})


export const fetchPosts2 = value => (dispatch, getState) => {

    return axios(`http://localhost:3333/testApi/bd`)
        .then(response => {
            if (response.status == 200) {
                dispatch(tablemodelaction({[value]: response.data.data,}))
            }
        }).catch(e=> {
            console.log(e);
        })
}

export const fetchcitysPosts = ({name, value, returnName}) => (dispatch, getState) => {
    return axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        }).catch(e=> {
            console.log(e);
        })
}


export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return axios.get(`${config.connect_srm}/clue/viewSupplierClueList.do`, {params: value})
        .then(response => {
            if (response.status == 200) {
                const total = response.data.data.rowCount
                console.log(response.data.data)
                dispatch(Paginationmodelaction({
                    current: value['pageSize'] || 1,
                    total: total,
                    pageSize: value['offset'] || 20
                }))
                dispatch(tablemodelaction({[key]: response.data.data.data, loading: false}))
            }
        }).catch(e=> {
            console.log(e);
        })
}

const actions = {
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts2,
    fetchcitysPosts,
    fetchPosts,
}

export default actions





import axios from 'axios'
export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
export const paramsInfo = 'paramsInfo'




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

export const paramsaction = value=> ({
    type: paramsInfo,
    payload: value
})



export const fetchPosts2 = value => (dispatch, getState) => {


    return axios(`http://localhost:3333/testApi/bd`)
        .then(response => {
            if (response.status == 200) {
                dispatch(tablemodelaction({[value]: response.data.data,}))
            }
        })
}

export const fetchcitysPosts = ({name, value, returnName}) => (dispatch, getState) => {
    return axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        })
}



export const fetchPosts = ({key,value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading:true}))
    return axios.get(`http://localhost:3333/testApi/bd`,{params:value})
        .then(response => {
            if (response.status == 200) {
                const total=response.data.count
                dispatch(Paginationmodelaction({current:value['current']||1,total:total,pageSize:value['pageSize']||10}))
                dispatch(paramsaction({...value,total:total,}))
                dispatch(tablemodelaction({[key]: response.data.data,loading:false}))
            }
        }).catch(err=>{
            console.log(err);
        })
}





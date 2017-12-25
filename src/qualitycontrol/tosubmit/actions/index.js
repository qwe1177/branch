import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';
import axios from '../../../util/axios';


export const BASEINFO = 'BASEINFO' //一些基本信息
export const MODALMODEL_INFO = 'MODALMODEL_INFO' //弹出模态框的信息
export const INIT_INFO = 'INIT_INFO' //初始数据
export const TABLEMODEL1_INFO = 'TABLEMODEL1_INFO' //Table1的信息
export const RESETTABLEMODEL1_INFO = 'RESETTABLEMODEL1_INFO' //Table1的信息
export const TABLEMODEL2_INFO = 'TABLEMODEL2_INFO' //Table2的信息



export const baseInfoForm= value=> ({
    type: BASEINFO,
    payload: value
})

export const modalmodelaction= value=> ({
    type: MODALMODEL_INFO,
    payload: value
})



export const tablemodelaction = value=> ({
    type: TABLEMODEL1_INFO,
    payload: value
})

export const resettablemodelaction = ()=> ({
    type: RESETTABLEMODEL1_INFO
})


export const tablemodelaction2 = value=> ({
    type: TABLEMODEL2_INFO,
    payload: value
})

export const fetchInitInfo = (supplierId) =>{
    var moduleUrl = location.pathname;
    var params = { supplierId, moduleUrl};
    return axios.get(connect_srm + '/qualityControl/viewToQualityControl.do', { params: params});
}

export const fetchTable2Info = (supplierId) => async (dispatch, getState) => {
    try {
        var moduleUrl = location.pathname;
        var params = { supplierId, moduleUrl};
        let res = await axios.get(connect_srm + '/ quotation/queryQuotationListQC.do', { params: params});
        if(res.data.code='1'){
            var data2  = res.data.data.map((o,index)=>{
                o["index"] = index+1;
                return o;
            })
            return await dispatch(tablemodelaction2({data2:data2,count:res.data.data.length}));
        }
    } catch (error) {
        console.log('error: ', error)
    }
}

export const fetchzonesPosts = ({url, name, value, returnName}) => (dispatch, getState) => {
    var moduleUrl = location.pathname;
    return axios(`${url}?${name}=${value}&moduleUrl=${moduleUrl}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        }).catch(e=> {
            console.log(e);
        })
}

// export const fetchCategory = ()=> async(dispatch, getState) => {
//     try {
//         var moduleUrl = location.pathname;
//         let res = await axios.get(connect_srm + '/queryCategoryList.do', { params: {moduleUrl}});
//         if(res.data.status){
//             var original = res.data.data;
//             return await  dispatch(baseInfoForm({'category':original}))
//         }
//     } catch (error) {
//         console.log('error: ', error)
//     }
// }


const actions = {
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    tablemodelaction2,
    fetchTable2Info,
    fetchzonesPosts,
    // fetchCategory,
    resettablemodelaction
}

export default actions

//e540da65-5d60-4bc3-af27-089d5aafdbc4


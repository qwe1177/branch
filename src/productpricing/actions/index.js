import axios from 'axios';

export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const modalmodelList = 'modalmodelList'
export const tablemodelaction = value=> ({
    type: tablemodelInfo,
    payload: value
})
export const modalmodelaction = value=> ({
    type: modalmodelInfo,
    payload: value
})
export const modalmodelallaction = value=> ({
    type: modalmodelList,
    payload: value
})

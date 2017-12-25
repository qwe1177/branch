import axios from 'axios';

export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
// export const selectmodelinit = 'selectmodelinit'
export const tablemodelaction = value=> ({
    type: tablemodelInfo,
    payload: value
})
export const modalmodelaction = value=> ({
    type: modalmodelInfo,
    payload: value
})
// export const selectmodelaction = value=> ({
//     type: selectmodelinit,
//     payload: value
// })


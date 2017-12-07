import personListShower from '../../components/business/personlistshower/redux';
import followupShower from '../../components/business/followupshower/redux';

import supplierDetailMain from  '../../components/common/supplierdetails/redux';

import power from '../../components/common/power/redux';

//使用combineReducers把store内容分到不同作用域
const rootReducer = {
    personListShower,
    followupShower,
    supplierDetailMain,
    power
}

export default rootReducer
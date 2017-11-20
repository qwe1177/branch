import personListShower from '../../components/business/personlistshower/redux';
import companyShower from '../../components/business/companyshower/redux';
import followupShower from '../../components/business/followupshower/redux';
import companyBaseShower from '../../components/business/companybaseshower/redux';

import power from '../../components/common/power/redux';

//使用combineReducers把store内容分到不同作用域
const rootReducer = {
    personListShower,
    companyShower,
    followupShower,
    companyBaseShower,
    power
}

export default rootReducer
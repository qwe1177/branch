import { combineReducers } from 'redux';
import personListShower from '../../../components/business/personlistshower/redux';
import companyShower from '../../../components/business/companyshower/redux';
import followupShower from '../../../components/business/followupshower/redux';
import companyBaseShower from '../../../components/business/companybaseshower/redux';

//使用combineReducers把store内容分到不同作用域
const rootReducer = combineReducers({
    personListShower,
    companyShower,
    followupShower,
    companyBaseShower
})

export default rootReducer

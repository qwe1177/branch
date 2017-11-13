import { combineReducers } from 'redux';



const defaultState={}

const emptyReducer = function (state = defaultState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}
const rootReducer = combineReducers({
    emptyReducer
})

export default rootReducer

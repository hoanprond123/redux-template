import { combineReducers } from "redux";
import testReducer from './Test/testReducer';
import loginReducer from './Login/loginReducer';
import listReducer from './List/listReducer';

const rootReducer = combineReducers({
    test: testReducer,
    login: loginReducer,
    list: listReducer
})

export default rootReducer
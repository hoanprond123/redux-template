import { combineReducers } from "redux";
import testReducer from './Test/testReducer';
import loginReducer from './Login/loginReducer';

const rootReducer = combineReducers({
    test: testReducer,
    login: loginReducer
})

export default rootReducer
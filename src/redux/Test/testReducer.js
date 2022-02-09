import { TEST_TYPE } from "./testType";

const initialState = {
    numberIncrement: 12
}

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST_TYPE: 
            return {
                ...state,
                numberIncrement: state.numberIncrement + action.payload
            }
        default:
            return state
    }
}

export default testReducer
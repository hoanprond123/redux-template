import {TEST_TYPE} from './testType'


export const increase = (number) => {
    return {
        type: TEST_TYPE,
        payload: number
    }
}
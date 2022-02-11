import {LIST_RESPONSE, LIST_ERROR, LIST_SUCCESS, ADD_SUCCESS , INPUT_NUMBER, INPUT_NAME, INPUT_DATE, INPUT_EMAIL, DELETE_ITEM, EDIT_ITEM, EDIT_SUCCESS, CHECK_EDIT} from './listTypes'

const initialState = {
    loading: false,
    lists: [],
    error: '',
    userInfor: null,
    name: '',
    email: '',
    number: '',
    date: '',
    checkedEdit: true,
}


const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_RESPONSE:
            return {
                ...state,
                loading: true,
            }
        case LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                lists: action.payload
            }
        case ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                name: '',
                email: '',
                number: '',
                date: '',
                checkedEdit: false,
            }
        case EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                name: '',
                email: '',
                number: '',
                date: '',
                userInfor: null
            }
        case EDIT_ITEM: 
            const user = state.lists.find(item => item.id === action.payload)
            return {
                ...state,
                userInfor: user,
                name: user.name,
                email: user.email,
                number: user.phone,
                // date: user.date,
            }
        case DELETE_ITEM:
            const newList = state.lists.filter(item => item.id !== action.payload)
            return {
                ...state,
                lists: newList,
            }
        case LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case INPUT_NAME:
            return {
                ...state,
                name: action.payload
            }
        case INPUT_NUMBER:
            return {
                ...state,
                number: action.payload
            }
        case INPUT_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case INPUT_DATE:
            return {
                ...state,
                date: action.payload
            }
        case CHECK_EDIT:
            return {
                ...state,
                checkedEdit: action.payload
            }
        default:
            return state
    }
}

export default listReducer
import {LIST_RESPONSE, LIST_ERROR, LIST_SUCCESS , ADD_SUCCESS, INPUT_NUMBER, INPUT_NAME, INPUT_DATE, INPUT_EMAIL, DELETE_ITEM, EDIT_ITEM, EDIT_SUCCESS, CHECK_EDIT} from './listTypes'
import api from '../../api/lists'

export const listResponse = () => {
    return {
        type: LIST_RESPONSE
    }
}

export const listSuccess = (lists) => {
    return {
        type: LIST_SUCCESS,
        payload: lists
    }
}

export const listError = (error) => {
    return {
        type: LIST_ERROR,
        payload: error
    }
}

export const fetchLists = () => {
    return (dispatch) => {
        dispatch(listResponse())
        api.get('/lists')
            .then((response) => {
                const lists = response.data
                dispatch(listSuccess(lists))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(listError(errorMessage))
            })

    }
}



export const addSuccess = () => {
    return {
        type: ADD_SUCCESS
    }
}



export const informationUser = (information) => {
    return (dispatch) => {
        api.post('/lists', information)
            .then((response) => {
                dispatch(addSuccess())
                dispatch(fetchLists())
            })
            .catch((error) => {
                console.log(error)
            })
    }
}


export const inputName = (name) => {
    return {
        type: INPUT_NAME,
        payload: name
    }
}

export const inputEmail = (email) => {
    return {
        type: INPUT_EMAIL,
        payload: email
    }
}

export const inputNumber = (number) => {
    return {
        type: INPUT_NUMBER,
        payload: number
    }
}

export const inputDate = (date) => {
    return {
        type: INPUT_DATE,
        payload: date
    }
}

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

export const informationUserDelete = (id) => {
    return (dispatch) => {
        api.delete(`/lists/${id}`, id)
            .then((response) => {
                dispatch(deleteItem())
                dispatch(fetchLists())
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const editItem = (id) => {
    return {
        type: EDIT_ITEM,
        payload: id
    }
}

export const editSuccess = () => {
    return {
        type: EDIT_SUCCESS,
    }
}

export const informationEdit = (id, userEdit) => {
    return (dispatch) => {
        api.put(`/lists/${id}`, userEdit)
            .then((response) => {
                dispatch(editSuccess())
                dispatch(fetchLists())
            })
            .catch((error) => {
                console.log(error)
            })
    } 
}

export const checkEdit = (check) => {
    return {
        type: CHECK_EDIT,
        payload: check
    }
}


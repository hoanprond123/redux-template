import React, {useContext, useEffect, useState} from 'react'
import {auth} from '../firebase'
import {v4 as uuidv4} from "uuid"
import api from '../api/lists'
const AuthContext = React.createContext()
function AuthProvider({children}) {



    const [currentUser, setCurrentUser] = useState()
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [startDate, setStartDate] = useState('');

    const [edit, setEdit] = useState(null)

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await api.get('/lists')
                setLists(response.data.reverse())
            } catch(error) {
                console.log(error.message)
            }
        }

        fetchLists()
    }, [])

    const handleDelete = async (id) => {
        try {
            await api.delete(`/lists/${id}`)
            const newLists = lists.filter(list => list.id !== id)
            setLists(newLists)
        } catch(error) {
            console.log(error.message)
        }
    }


    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })   

        return unsubscribe
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!edit) {
            const addNew = {id: uuidv4(), name: name, email: email, phone: number, date: startDate}
    
            try{
                await api.post('/lists', addNew)
                setLists([...lists, addNew].reverse())
                setName('')
                setNumber('')
                setEmail('')
            } catch(error) {
                console.log(error.message)
            }
        }else {
            updateInformation(edit)
        }
    }

    const updateInformation = async (edit) => {
        const updateList = {id: edit.id, name: name, email: email, phone: number, date: startDate}


        try {
            const response = await api.put(`/lists/${edit.id}`, updateList)
            setLists(lists.map(item => item.id === edit.id ? {...response.data} : item))
            setName('')
            setEmail('')
            setNumber('')
            setEdit('')
        } catch(err) {
            console.error(err.message)
        }

    }

    const handleEdit = (id) => {
        const findPerson = lists.find(item => item.id === id)
        setEdit(findPerson)
        
    }



    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        setLists,
        lists,
        handleDelete,
        handleSubmit,
        name,
        setName,
        number,
        setNumber,
        email,
        setEmail,
        handleEdit,
        edit,
        startDate,
        setStartDate,
    }


    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useGlobalContext = () => {
    return useContext(AuthContext)
}

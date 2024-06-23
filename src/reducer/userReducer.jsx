import { createSlice } from "@reduxjs/toolkit";
import quoteService from '../services/quotes';
import loginService from '../services/login';
import { newQuote } from "./quoteReducer";

const initialState = ""

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return ""
        }
    }
})

export const initializeUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password
        })
        window.localStorage.clear();
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        quoteService.setToken(user.token)
        console.log(user.token)
        dispatch(setUser(user))
    }
}

export const isValidUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            const isValidToken = await loginService.checkToken(user.token)
            if(!isValidToken) {
                quoteService.setToken(user.token)
                dispatch(setUser(user))
            } else {
                window.localStorage.clear();
                dispatch(removeUser())
            }
        } else {
            dispatch(removeUser())
        }
    }
}

export const { setUser, removeUser} = userSlice.actions
export default userSlice.reducer
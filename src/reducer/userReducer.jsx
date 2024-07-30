import { createSlice } from "@reduxjs/toolkit";
import quoteService from '../services/quotes';
import loginService from '../services/login';
import locationService from '../services/locationService';
import postService from "../services/postService";

const initialState = {
    user: null,
    location: null
  };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return ""
        },
        setLocation(state, action) {
            return action.payload
        },
        clearLocation(state) {
            return null
        }
    }
})

export const initializeUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({username, password});
        window.localStorage.clear();
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        quoteService.setToken(user.token);
        dispatch(setUser(user));
    }
}

export const isValidUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            const isTokenExpired = await loginService.checkToken(user.token)
            if(!isTokenExpired) {
                quoteService.setToken(user.token);
                postService.setToken(user.token);
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

export const requestLocation = () => {
    return async dispatch => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location = { latitude, longitude };
            locationService.setUserLocation(location);
            dispatch(setLocation(location));
          },
          (error) => console.error('Error getting location:', error)
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
  };

export const { setUser, removeUser, setLocation, clearLocation} = userSlice.actions
export default userSlice.reducer
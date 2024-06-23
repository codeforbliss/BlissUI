import { createSlice } from "@reduxjs/toolkit";
import quoteService from '../services/quotes';

const initialState = ""

const quoteSlice = createSlice({
    name: "quote",
    initialState,
    reducers: {
        setQuote(state, action) {
            return action.payload
        }
    }
})

export const newQuote = () => {
    return async dispatch => {
        const quote = await quoteService.getQuote()
        dispatch(setQuote(quote))
    }
}

export const {setQuote} = quoteSlice.actions
export default quoteSlice.reducer
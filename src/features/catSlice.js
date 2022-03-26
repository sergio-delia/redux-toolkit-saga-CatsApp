import { createSlice } from '@reduxjs/toolkit'


const catSlice = createSlice({

    name:'cats',
    initialState:{
        cats:[],
        isLoading: false,
    },

    reducers: {

        getCatsFetched: (state, action) => {
            state.isLoading = true;
        },

        getCatsSuccess: (state, action) => {
            state.cats = action.payload;
            state.isLoading = false;
        },

        getCatsFailed: (state) => {
            state.isLoading = false;
        }


    }


})

export const {getCatsFetched, getCatsFailed, getCatsSuccess} = catSlice.actions

export default catSlice.reducer
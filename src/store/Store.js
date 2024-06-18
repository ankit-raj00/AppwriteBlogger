import {configureStore} from '@reduxjs/toolkit' ; 
import authSlice from './Authslice';

const store = configureStore({
    reducer : {auth : authSlice}
})


export default store;
import {configureStore} from '@reduxjs/toolkit'
import weatherSlice from '../slice/weatherSlice'
const store = configureStore({
    reducer : {
        weather : weatherSlice,
    }
})
export default store;

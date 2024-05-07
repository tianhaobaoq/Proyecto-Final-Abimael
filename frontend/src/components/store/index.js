import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './storelogin'

//Crea el almacenamiento Redux y lo exporta
const store = configureStore({
reducer: {
    login:loginReducer
}
})

export default store
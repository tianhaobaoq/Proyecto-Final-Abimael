import { createSlice } from '@reduxjs/toolkit'

//Estado de autentificación en la web
const initialAuthState = {
    isAutenticated: false,
    email: '',
    userId: ''
}

//Slide y reductor
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            const userData = action.payload
            state.isAutenticated = true
            state.email = userData.email
            state.userId = userData.id
        },
        logout: (state) => {
            state.isAutenticated = false
            state.email = ''
            state.userId = ''
        }
    }
})

export const loginActions = authSlice.actions
export default authSlice.reducer
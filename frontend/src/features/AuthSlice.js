import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isLoggedIn: false,
  isLoading: false,
  name: '',
  email: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading =true
    },
    setUser: (state,action) => {
      console.log(action)
      console.log(action.payload.data.token)
      localStorage.setItem("access", action.payload.data.token);
      state.access = action.payload.data.token
      state.isLoggedIn = true
      state.isLoading = false
      state.name = action.payload.name
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoading, setUser } = authSlice.actions

export default authSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  isLoading: false,
  userCreado: false,
  usersCargados: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    cargarUsuarios: (state) => {
      state.isLoading =true
    },
    setLoading: (state,action) => {
      state.isLoading = action.payload
    },
    userCreado: (state,action) => {
      state.userCreado =action.payload
    },
    recibirUsuarios: (state,action) => {
      state.users =action.payload
      state.usersCargados = true
    },
    usuariosCargados: (state, action) =>{
      state.usersCargados = action.payload.data
    }
  },
})

// Action creators are generated for each case reducer function
export const { cargarUsuarios, setLoading, userCreado, recibirUsuarios, usuariosCargados } = userSlice.actions

export default userSlice.reducer
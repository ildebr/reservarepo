import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reservas: [],
  isLoading: false,
  reservaCreado: false,
  reservasCargados: false,
  detalle: {}
}

export const reservaSlice = createSlice({
  name: 'reserva',
  initialState,
  reducers: {
    cargarReservas: (state) => {
      state.isLoading =true
    },
    setLoading: (state,action) => {
      state.isLoading = action.payload
    },
    reservaCreado: (state,action) => {
      state.reservaCreado =action.payload
    },
    recibirReservas: (state,action) => {
      state.reservas =action.payload
      state.reservasCargados = true
    },
    reservasCargados: (state, action) =>{
      state.reservasCargados = action.payload.data
    },
    setResDetalle:(state,action) => {
      console.log('[',action)
      state.detalle = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { cargarReservas, setLoading, reservaCreado, recibirReservas, reservasCargados, setResDetalle } = reservaSlice.actions

export default reservaSlice.reducer
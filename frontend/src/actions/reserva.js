import { useSelector, useDispatch } from 'react-redux'
import { cargarReservas, setLoading, reservaCreado, recibirReservas, reservasCargados, setResDetalle} from '../features/ReservaSlice'
import { setAlert } from './alert'
import axios from 'axios';

export const crearReserva = (usuario,tipo_reserva,estado,fecha,cantidad_personas,descripcion) => async dispatch => {
    dispatch(setLoading(true))
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        usuario,
        tipo_reserva,
        estado,
        fecha,
        cantidad_personas,
        descripcion
    });
    console.log(body)


    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/reserva`, body, config);
        console.log('a', res)
        if (res.status === 200) {
            var data = res.data
            
            dispatch(setLoading(false));
            dispatch(reservaCreado(true))
            dispatch(setAlert('Usuario creado'));
            setTimeout(() => dispatch(reservaCreado(false)), 1000);
        } else {
            dispatch(setLoading(false));
            dispatch(setAlert('Error creando'));
        }
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setAlert('Error creando'));
    }
}

export const obtenerReservas = () => async dispatch => {
    dispatch(setLoading(true))
    dispatch(reservasCargados(false))
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
    });


    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/reserva/lista`, body, config);
        console.log('a', res)
        if (res.status === 200) {
            var data = res.data
            
            dispatch(setLoading(false));
            dispatch(recibirReservas(data))
            dispatch(reservasCargados(true))
        } else {
            dispatch(setLoading(false));
            dispatch(setAlert('Error creando'));
        }
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setAlert('Error creando'));
    }
}

export const obtenerReservaDetalle =(id)=> async dispatch => {
    dispatch(setLoading(true))
    dispatch(reservasCargados(false))
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(id)
    const body = JSON.stringify({
        id
    });
    console.log(body)
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/reserva/detalle`, body, config);
        console.log('a', res)
        if (res.status === 200) {
            var data = res.data
            console.log(data)
            
            dispatch(setLoading(false));
            dispatch(reservasCargados(true))
            return data
        } else {
            dispatch(setLoading(false));
            dispatch(setAlert('Error creando'));
        }
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setAlert('Error creando'));
    }
}

export const confirmarReserva =(id)=> async dispatch => {
    dispatch(setLoading(true))
    dispatch(reservasCargados(false))
    dispatch(reservaCreado(false))
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(id)
    const body = JSON.stringify({
        id
    });
    console.log(body)
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/reserva/confirmar`, body, config);
        console.log('a', res)
        if (res.status === 200) {
            var data = res.data
            console.log(data)
            
            dispatch(setLoading(false));
            dispatch(reservaCreado(true))
            setTimeout(() => dispatch(reservaCreado(false)), 1000);
            dispatch(reservasCargados(true))
            return data
        } else {
            dispatch(setLoading(false));
            dispatch(setAlert('Error creando'));
        }
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setAlert('Error creando'));
    }
}

export const setReservaDetalle = (det) => dispatch => {
    setResDetalle(det)
    return dispatch => {
        setResDetalle(det)
    }
}
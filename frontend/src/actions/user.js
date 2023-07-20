import { useSelector, useDispatch } from 'react-redux'
import {setLoading, userCreado, recibirUsuarios, usuariosCargados} from '../features/UserSlice'
import { setAlert } from './alert'
import axios from 'axios';

export const crearUser = (nombres, apellidos, tipo_documento, documento,email) => async dispatch => {
    dispatch(setLoading(true))
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        nombres,
        apellidos,
        tipo_documento,
        documento,
        email
    });


    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/usuario`, body, config);
        console.log('a', res)
        if (res.status === 200) {
            var data = res.data
            
            dispatch(setLoading(false));
            dispatch(userCreado(true))
            dispatch(setAlert('Usuario creado'));
            setTimeout(() => dispatch(userCreado(false)), 1000);
        } else {
            dispatch(setLoading(false));
            dispatch(setAlert('Error creando'));
        }
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setAlert('Error creando'));
    }
}

export const obtenerUsuarios = () => async dispatch => {
    dispatch(setLoading(true))
    dispatch(usuariosCargados(false))
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
    });


    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/usuario/lista`, body, config);
        console.log('a', res)
        if (res.status === 200) {
            var data = res.data
            
            dispatch(setLoading(false));
            dispatch(recibirUsuarios(data))
            dispatch(usuariosCargados(true))
        } else {
            dispatch(setLoading(false));
            dispatch(setAlert('Error creando'));
        }
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setAlert('Error creando'));
    }
}

import { useSelector, useDispatch } from 'react-redux'
import {setLoading, setUser} from '../features/AuthSlice'
import { setAlert } from './alert'
import axios from 'axios';

export const login = (email, contrasena) => async dispatch => {
    dispatch(setLoading(true))
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        contrasena
    });


    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        console.log('a', res)
        if (res.status === 200) {
            var data = res.data
            localStorage.setItem('access', res.access);
            
            dispatch(setLoading(false));
            console.log(res)
            dispatch(setUser({data}))
            dispatch(setAlert('Logged in successfully'));
        } else {
            dispatch(setLoading(false));
            dispatch(setAlert('Error authenticating'));
        }
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setAlert('Error authenticating'));
    }
}
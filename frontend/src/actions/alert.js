import { useSelector, useDispatch } from 'react-redux'
import {generateAlert, removeAlert} from '../features/AlertSlice'

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    dispatch(generateAlert(msg));

    setTimeout(() => dispatch(removeAlert()), timeout);
};

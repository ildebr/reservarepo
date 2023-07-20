import './Login.scss'
import { generateAlert } from '../../features/AlertSlice'
import { useSelector, useDispatch } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { login } from '../../actions/auth'
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
const Login=({setAlert, login, isAuthenticated,loading}) =>{

    const [formData, setFormData] = useState({
        email: "",
        contrasena: "",
    });

    const { email, contrasena } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    
    function handleSubmit(e){
        e.preventDefault();

        login(email, contrasena);
    }

    const alert = useSelector((state) => state.alert.alert)

    const dispatch = useDispatch()

    
    if (isAuthenticated) return <Navigate to="/dashboard" />;

    return (
        <form className="userform" onSubmit={handleSubmit}>
            <h2>Bienvenido</h2>
            {alert}
            <label for="username">
                
                <input type="email" name="email" value={email} onChange={(e) => onChange(e)} className="username__input" required />
                <span className="input-placeholder">Usuario</span>
            </label>
            <label for="room">
                
                <input type="password" name="contrasena" value={contrasena} onChange={(e) => onChange(e)} className="username__input" required />
                <span className="input-placeholder">contrase;a</span>
            </label>
            <input type="submit" value="Entrar"/>
        </form>
    )
} 

// export default Login;
const mapStateToProps = (state) => ({
    alerta: state.alerta,
    isAuthenticated: state.auth.isLoggedIn,
    loading: state.auth.isLoading
  });
  
export default connect(mapStateToProps, { setAlert, login })(Login);
import React, { useEffect, useState } from "react";
import { crearUser } from "../../actions/user";
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from "react-router-dom";

const RegistrarUsuario = ({crearUser, alerta, isAuthenticated,loading, creado}) => {
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        tipo_documento: "",
        documento: "",
        email: ""
    });


    const { nombres,
    apellidos,
    tipo_documento,
    documento,
    email } = formData;


    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    function handleSubmit(e){
        e.preventDefault();
        console.log(formData)
        crearUser(nombres,apellidos,tipo_documento,documento,email)
    }


    const alert = useSelector((state) => state.alert.alert)

    const dispatch = useDispatch()
    if (creado) return <Navigate to="/dashboard" />;
    return (
        <div className="container">
            <form className="userform" onSubmit={handleSubmit}>
                <h2>Registro De Usuario</h2>
                {alert}
                <label for="nombres">
                    
                    <input type="text" name="nombres" value={nombres} onChange={(e) => onChange(e)} className="username__input" required />
                    <span className="input-placeholder">Nombres</span>
                </label>
                <label for="apellidos">
                    
                    <input type="text" name="apellidos" value={apellidos} onChange={(e) => onChange(e)} className="username__input" required />
                    <span className="input-placeholder">Apellidos</span>
                </label>
                <label for="tipo_documento">

                    <select name="tipo_documento" id="tipo_documento" value={tipo_documento} onChange={(e) => onChange(e)} className="username__input" required>
                        <option value="">----</option>
                        <option value="c">Cedula</option>
                        <option value="p ">Pasaporte</option>
                    </select>
                    <span className="input-placeholder">Tipo de documento</span>
                </label>
                <label for="documento">
                    
                    <input type="text" name="documento" value={documento} onChange={(e) => onChange(e)} className="username__input" required />
                    <span className="input-placeholder">Documento</span>
                </label>
                <label for="email">
                    
                    <input type="email" name="email" value={email} onChange={(e) => onChange(e)} className="username__input" required />
                    <span className="input-placeholder">Correo</span>
                </label>

                
                <input type="submit" value="Entrar"/>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => ({
    alerta: state.alerta,
    isAuthenticated: state.auth.isLoggedIn,
    loading: state.user.isLoading,
    creado: state.user.userCreado
  });

export default connect(mapStateToProps, { crearUser })(RegistrarUsuario);
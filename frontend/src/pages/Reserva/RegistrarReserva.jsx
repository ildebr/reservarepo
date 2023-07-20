import React, { useEffect, useState } from "react";
import { obtenerUsuarios } from "../../actions/user";
import { crearReserva } from "../../actions/reserva";
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from "react-router-dom";

const RegistrarUsuario = ({alerta, isAuthenticated,loading,creado, usuarios}) => {
    const [formData, setFormData] = useState({
        usuario: '',
        tipo_reserva: "",
        estado: "",
        fecha: "",
        cantidad_personas: "",
        descripcion: ""
    });


    const { usuario,
    tipo_reserva,
    estado,
    fecha,
    cantidad_personas,
    descripcion } = formData;

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(obtenerUsuarios())
    }, [])
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    function handleSubmit(e){
        e.preventDefault();
        console.log(usuario, tipo_reserva, estado, fecha, cantidad_personas, descripcion)
        dispatch(crearReserva(usuario, tipo_reserva, estado, fecha, cantidad_personas, descripcion))
    }

    if (creado) return <Navigate to="/dashboard" />;

    return (
        <div className="container">
            <form className="userform" onSubmit={handleSubmit}>
            <h2>Registro De Reserva</h2>
            {alert}
            <label for="usuario">
            
                <select name="usuario" id="usuario" value={usuario} onChange={(e) => onChange(e)} className="username__input" required>
                    <option>----</option>
                    {usuarios?.map((el)=>{
                        return <option value={el.id}>{el.nombre}</option>
                    })}
                </select>
                <span className="input-placeholder">Nombres</span>
            </label>
            <label for="tipo_reserva">

                <select name="tipo_reserva" id="tipo_reserva" value={tipo_reserva} onChange={(e) => onChange(e)} className="username__input" required>
                    <option value="">----</option>
                    <option value="cena">Cena</option>
                    <option value="almuerzo">Almuerzos</option>
                    <option value="once">Onces</option>
                    <option value="cumpleano">Cumpleanos</option>
                    <option value="ocasion especial">Ocasión Especial</option>
                </select> 
                <span className="input-placeholder">Tipo de reserva</span>
            </label>
            <label for="estado">

                <select name="estado" id="estado" value={estado} onChange={(e) => onChange(e)} className="username__input" required>
                    <option>-----</option>
                    <option value="No confirmado" selected>Por confirmar</option>
                    <option value="confirmador">Confirmado</option>
                </select> 
                <span className="input-placeholder">Estado</span>
            </label>

            <label for="fecha">

            <input type="date" name="fecha" value={fecha} onChange={(e) => onChange(e)} className="username__input" required />
                <span className="input-placeholder">Fecha</span>
            </label>
            <label for="cantidad_personas">
                
                <input type="text" name="cantidad_personas" value={cantidad_personas} onChange={(e) => onChange(e)} className="username__input" required />
                <span className="input-placeholder">Cantidad</span>
            </label>

            <label for="descripcion">
                
                <input type="text" name="descripcion" value={descripcion} onChange={(e) => onChange(e)} className="username__input" required />
                <span className="input-placeholder">Descripción/Observaciones</span>
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
    usuarios: state.user.users,
    reservas: state.reserva.reservas,
    creado: state.reserva.reservaCreado
  });

export default connect(mapStateToProps, { obtenerUsuarios, crearReserva })(RegistrarUsuario);
import React, { useEffect, useState } from "react";
import { obtenerUsuarios } from "../../actions/user";
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from "react-router-dom";

const ListaUsuarios = ({alerta, isAuthenticated,loading, usuarios}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(obtenerUsuarios())
    }, [])

    

    return (
        <div className="container">
            <h2 className="sub-title">Lista de Usuarios</h2>
            {
                usuarios.length == 0 ? <p>no usuariis</p> 
                : 
                <table className="table users_containers">
                    <tbody>
                    <tr>
                        <th>Usuario</th>
                        <th>Apellido</th>
                    </tr>
                    {usuarios.map((el)=>{
                        return <tr>
                            <td>{el.nombre}</td>
                            <td>{el.apellido}</td>
                        </tr>
                    })}
                </tbody>
                </table>
            }
            
            
        </div>
    )
}


const mapStateToProps = (state) => ({
    alerta: state.alerta,
    isAuthenticated: state.auth.isLoggedIn,
    loading: state.user.isLoading,
    usuarios: state.user.users
  });

export default connect(mapStateToProps, { obtenerUsuarios })(ListaUsuarios);
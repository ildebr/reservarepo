import React, { useEffect, useState } from "react";
import { obtenerReservas } from "../../actions/reserva";
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from "react-router-dom";

const ListaReserva = ({alerta, isAuthenticated,loading, reservas}) =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(obtenerReservas())
    }, [])

    return (
        <div className="container">
            <h2 className="sub-title">Lista de Reservas</h2>
            {
                reservas.length == 0 ? <p>no hay reservas</p> 
                : 
                <table className="table users_containers">
                    <tbody>
                    <tr>
                        <th>Usuario</th>
                        <th>Fecha</th>
                    </tr>
                    {reservas.map((el)=>{
                        
                        return <tr>
                            <td><Link to={`/reserva/detalle/${el.id}`} >{el.nombre} </Link></td>
                            <td>{el.fecha_reserva.split('T')[0]}</td>
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
    loading: state.reserva.isLoading,
    reservas: state.reserva.reservas
  });

export default connect(mapStateToProps, { obtenerReservas })(ListaReserva);
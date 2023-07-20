import React, { useEffect, useState } from "react";
import { obtenerReservaDetalle, confirmarReserva,setReservaDetalle } from "../../actions/reserva";
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux'
import { setResDetalle } from '../../features/ReservaSlice'
import { Link, Navigate, useParams } from "react-router-dom";
import axios from 'axios';
import Header from "../../Layout/Header/Header";

const DetalleReserva = ({alerta, isAuthenticated, loading, reservas,creado}) => {
    const [detaille, setDetalle] = useState()
    const params = useParams();
    const dispatch = useDispatch()
    const reser = useSelector((state) => state.reserva.reservas)

    const getResDetalle = (id) => async dispatch => {
        const data = new FormData();
        data.append('id',id)
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        console.log(id)
        const body = JSON.stringify({
            id
        });
        console.log(body)
        try {
    
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/reserva/detalle`, body,config);
                
                if (res.status === 200) {
                    dispatch(setDetalle(res.data))
                    dispatch(setResDetalle(res.data))
                    console.log(res.data)
                    
                    return res.data
                }
        } catch (err) {
          console.log(err)
        }
    };

    useEffect(()=>{
        if(detaille){
            
            console.log(detaille)
            // dispatch(setDetalle(detaille))
            dispatch(setResDetalle(detaille))
        }
        
        
    }, [detaille])
    
    useEffect(()=>{
        console.log('al',reser)
        var elemento = reser?.find((el)=> {return el.id == params.id})
        console.log(elemento)
        if(elemento){
            setDetalle(elemento)
            dispatch(setReservaDetalle(elemento))
            console.log('j')
            
        }else{
            // console.log(dispatch(obtenerReservaDetalle(params.id)))
            dispatch(getResDetalle(params.id))
            console.log(detaille)
        }
    }, [])

    function confirmar(e){
        e.preventDefault()
        
        dispatch(confirmarReserva(params.id))
        
    }
    if (creado) return <Navigate to="/reserva/lista" />;
    
    return (<>
        <div className="container">
            <h2 className="subtitle">Detalle de la reserva</h2>
            <div className="detalle">
                <div><span className="mitad">Nombre</span><span className="mitad">{detaille?.nombre}</span></div>
                <div><span className="mitad">Apellida</span><span className="mitad">{detaille?.apellido}</span></div>
                <div><span className="mitad">Apellido</span><span className="mitad">{detaille?.apellido}</span></div>
                <div><span className="mitad">fecha</span><span className="mitad">{detaille?.fecha_reserva.split('T')[0]}</span></div>
                <div><span className="mitad">Descripcion</span><span className="mitad">{detaille?.descripcion}</span></div>
                <div><span className="mitad">email</span><span className="mitad">{detaille?.email}</span></div>
                <div><span className="mitad">estado</span><span className="mitad">{detaille?.estado}</span></div>
                <div><span className="mitad">Tipo de documento</span><span className="mitad">{detaille?.tipo_documento}</span></div>
                <div><span className="mitad">documento</span><span className="mitad">{detaille?.documento}</span></div>
                <div><span className="mitad">Tipo de Reserva</span><span className="mitad">{detaille?.tipo_reserva}</span></div>
            </div>


            <div className="buttons">
                <button className="btn btn-primary" onClick={(e)=>{confirmar(e)}}>Confirmar Reserva</button>
                <Link className="btn btn-primary" to='/reserva/editar'>Editar Reserva</Link>
            </div>

        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    alerta: state.alerta,
    isAuthenticated: state.auth.isLoggedIn,
    loading: state.reserva.isLoading,
    reservas: state.reserva.reservas,
    creado: state.reserva.reservaCreado
  });

export default connect(mapStateToProps, { obtenerReservaDetalle, confirmarReserva, setReservaDetalle })(DetalleReserva);
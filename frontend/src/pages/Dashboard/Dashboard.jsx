import Header from '../../Layout/Header/Header'
import { Link } from "react-router-dom";

const Dashboard = () =>{
    return (<>
        <Header />

        <div className="container">
            <div className="dashboard_links">
            <Link className="btn btn-primary" to={'/usuario/crear'}>Registrar Usuario</Link>
            <Link className="btn btn-primary" to={'/usuario/lista'}>Lista De Usuarios</Link>
            <Link className="btn btn-primary" to={'/reserva/crear'}>RegistrarReserva</Link>
            <Link className="btn btn-primary" to={'/reserva/lista'}>Lista Reserva</Link>
            </div>
        </div>
        </>
    )
}

export default Dashboard;
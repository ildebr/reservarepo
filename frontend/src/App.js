import './index.css';
import { Counter } from './Counter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard'
import RegistrarUsuario from './pages/Usuario/RegistrarUsuario'
import PrivateRoute from './hocs/PrivateRoute';
import './index.scss'
import ListaUsuarios from './pages/Usuario/ListaUsuarios';
import RegistrarReserva from './pages/Reserva/RegistrarReserva';
import ListaReservas from './pages/Reserva/ListaReservas';
import DetalleReserva from './pages/Reserva/DetalleReserva';
import EditarReserva from './pages/Reserva/EditarReserva';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
              <Route path="" element={<Login />}></Route>
              <Route path='/dashboard' element={<PrivateRoute/>}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route path='/usuario/crear' element={<PrivateRoute/>}>
                <Route index element={<RegistrarUsuario />} />
              </Route>
              <Route path='/usuario/lista' element={<PrivateRoute/>}>
                <Route index element={<ListaUsuarios />} />
              </Route>
              <Route path='/reserva/crear' element={<PrivateRoute/>}>
                <Route index element={<RegistrarReserva />} />
              </Route>
              <Route path='/reserva/lista' element={<PrivateRoute/>}>
                <Route index element={<ListaReservas />} />
              </Route>
              <Route path='/reserva/detalle/:id' element={<PrivateRoute/>}>
                <Route index element={<DetalleReserva />} />
              </Route>
              <Route path='/reserva/detalle/' element={<PrivateRoute/>}>
                <Route path=':id' element={<DetalleReserva />} />
              </Route>
              <Route path='/reserva/editar/' element={<PrivateRoute/>}>
                <Route index element={<EditarReserva />} />
              </Route>
              
        </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;


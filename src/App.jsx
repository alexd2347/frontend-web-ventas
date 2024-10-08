import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './componentes/layout/Layout'
import Inicio from './componentes/inicio/Inicio'
import Promociones from './componentes/promocion/promocion'
import Nuevo from './componentes/nuevo/nuevo'
import PageNotFound from './componentes/pageNotFound/PageNotFound'
import Carrito from './componentes/carrito/carrito'
import Producto from './ui/producto/producto'
import Buscar from './componentes/buscar/buscar'


import Usuario from './componentes/usuario/usuario'
import MisDirecciones from './componentes/usuario/misDirecciones/misDirecciones'
import MisPedidos from './componentes/usuario/misPedidos/misPedidos'

import Admin from './componentes/admin/admin'
import Pedidos from './componentes/admin/pedidos/pedidos'
import Usuarios from './componentes/admin/usuarios/usuarios'
import Productos from './componentes/admin/productos/productos'

import InicioSession from './componentes/inicio-session/inicioSession'
import Registro from './componentes/inicio-session/registro/registro'

import './App.css'

import whattsapp from './assets/whats.png';
import facebook from './assets/facebook.png';

import { useUserInfo } from './userInfoContext';

function App() {
  const { rol } = useUserInfo();
  const version = '1.3.18';
  //guardar en el local storage los modulos que tiene el usuario solo tiene inicio
  localStorage.setItem('modulos', 'promociones,nuevo');

  return (
    <div className='App'>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/inicio" />}
        />
        <Route path="/" element={<Layout />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/nuevo" element={<Nuevo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/buscar/:busqueda" element={<Buscar />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/mis-direcciones" element={<MisDirecciones />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
        </Route>
        <Route path="/admin/" element={<Admin />} >
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="productos" element={<Productos />} />
        </Route>
        <Route
          path="*"
          element={<PageNotFound />}
        />
        <Route
          path="/iniciar-sesion"
          element={<InicioSession />}
        />
        <Route
          path="/registro"
          element={<Registro />}
        />
      </Routes>
      <div className='version'>{version}</div>
      <a
        className='whatsapp'
        href="https://wa.me/524435048995"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className='img-whatsapp' alt='whatsapp icono' src={whattsapp} />
      </a>
      <a
        className='facebook'
        href="https://www.facebook.com/profile.php?id=61556679508345"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className='img-facebook' alt='facebook icono' src={facebook} />
      </a>

    </div>
  )
}

export default App

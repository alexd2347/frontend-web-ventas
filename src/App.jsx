import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './componentes/layout/Layout'
import Inicio from './componentes/inicio/Inicio'
import Promociones from './componentes/promocion/promocion'
import Nuevo from './componentes/nuevo/nuevo'
import PageNotFound from './componentes/pageNotFound/PageNotFound'
import InicioSession from './componentes/inicio-session/inicioSession'
import Carrito from './componentes/carrito/carrito'
import Producto from './ui/producto/producto'
import './App.css'

import whattsapp from './assets/whatsapp.webp';
function App() {
  const version = '1.0.0';
  //guardar en el local storage los modulos que tiene el usuario solo tiene inicio
  localStorage.setItem('modulos', 'inicio,promociones,nuevo');

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
        </Route>
        <Route
          path="*"
          element={<PageNotFound />}
        />
        <Route
          path="/iniciar-sesion"
          element={<InicioSession />}
        />
      </Routes>
      <div className='version'>Version: {version}</div>
      <a
        className='whatsapp'
        href="https://wa.me/524435048995"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className='img-whatsapp' alt='whatsapp icono' src={whattsapp} />
      </a>
    </div>
  )
}

export default App

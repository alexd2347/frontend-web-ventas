import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/pagina-del-producto.png';
import Carrito from '../../assets/carrito-de-compras.png';

import './SideBar.css';


function SideBar() {
    const modulos = localStorage.getItem('modulos')?.split(',') || [];
    // ejemplo de modulos: ["crear-denuncia", "mis-denuncias"]
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        // Detectar la ruta actual y resaltar el link del sidebar correspondiente
        setActivePath(location.pathname);
    }, [location.pathname]);

    return (
        <div className="sidebar contenedor-vertical">
            <div className="contenedor-horizontal gap-10px">
                <Link className='contenedor-horizontal logo-title' to="/inicio">
                    {/*<img className="sidebar-logo" src={Logo} alt="logo policia" />*/}
                    <h1 className="sidebar-titulo">JC</h1>
                </Link>
                {/** barra de busqueda */}
                <input
                    className="sidebar-search"
                    type="text"
                    placeholder="Buscar..."
                />
                {/** boton iniciar sesion  */}
                <Link className='sidebar-link' to="/iniciar-sesion">
                    <div className='sidebar-link-name'>Iniciar sesión</div>
                </Link>
            </div>
            <div className="contenedor-horizontal gap-10px">
                {modulos.map((modulo, index) => (
                    <Link
                        className={`sidebar-link ${activePath === `/${modulo}` ? 'active' : ''}`}
                        key={index}
                        to={`/${modulo}`}
                    >
                        <div className='sidebar-link-name'>{modulo.replace(/-/g, ' ')}</div>
                    </Link>
                ))}
                <Link
                    className={`sidebar-link ${activePath === `/carrito` ? 'active' : ''}`}
                    to="/carrito"
                >
                    <img className="sidebar-carrito" src={Carrito} alt="carrito de compras" />
                </Link>
            </div>
        </div>
    );
};

export default SideBar

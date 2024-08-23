import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCarrito } from '../../carritoContext';

import { useUserInfo } from '../../userInfoContext';

import Logo from '../../assets/logo.png';
import Carrito from '../../assets/carrito-de-compras.png';
import UserIcon from '../../assets/user blanco redondo.webp';

import './SideBar.css';


function SideBar() {
    const { userLogged, userGoogle, user } = useUserInfo();
    const imgUser = user?.imageUrl || UserIcon;
    const linkInicio = userLogged ? '/usuario' : '/iniciar-sesion';
    useEffect(() => {
        if (userLogged) {
            //console.log('Usuario logeado:', user);
        }
    }, [userLogged, userGoogle, user]);

    const { productos } = useCarrito();
    const modulos = localStorage.getItem('modulos')?.split(',') || [];
    // ejemplo de modulos: ["crear-denuncia", "mis-denuncias"]
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Detectar la ruta actual y resaltar el link del sidebar correspondiente
        setActivePath(location.pathname);
    }, [location.pathname]);

    //hacer un debounce para que no se rediriga a cada letra que se escribe sino cada 500ms


    const [debouncedSearchText, setDebouncedSearchText] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchText]);

    useEffect(() => {
        if (debouncedSearchText) {
            window.location.hash = `#/buscar/${debouncedSearchText}`;
        }
    }, [debouncedSearchText]);

    return (
        <div className="sidebar contenedor-vertical">
            <div className="contenedor-horizontal gap-10px">
                <Link className='contenedor-horizontal logo-title' to="/inicio">
                    {/*<img className="sidebar-logo" src={Logo} alt="logo policia" />*/}
                    <h1 className="sidebar-titulo">
                        J
                        <div className="invertido">J</div>
                        <div className='store'>store</div>
                    </h1>
                </Link>
                {/** barra de busqueda */}
                <input
                    className={`sidebar-search ${activePath === `/buscar/:busqueda` ? 'active' : ''}`}
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Buscar..."
                />
                {/** boton iniciar sesion  */}
                <Link className='sidebar-link' to={linkInicio}>
                    <img className="user-logo" src={imgUser} alt="usuario" />
                </Link>
            </div>
            <div className="contenedor-horizontal gap-10px overflow-auto">
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
                    {/** poner el numero de productos que hay en el carrito en un circulito anajo en la derecha*/}
                    {productos && productos.length > 0 && (
                        <div className='sidebar-carrito-cant'>{productos.length}</div>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default SideBar

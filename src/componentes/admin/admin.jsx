import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useUserInfo } from '../../userInfoContext';
import './admin.css';

const Admin = () => {
    const { user } = useUserInfo();
    const location = useLocation(); // Obtiene el objeto de la ubicación actual
    const [activePath, setActivePath] = useState(location.pathname);
    /*
    useEffect(() => {
        console.log('Usuario:', user);
        if (user.rol !== 'admin') {
            window.location.hash = `#/`;
        }
    }, []);
    */

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]); // Actualiza el estado cuando cambia la ruta

    return (
        <div className='contenedor-vertical-arriba-centro'>
            <div className='admin-header'>
                {/**mandar añ inicio */}
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-opc"
                >
                    Ir a la tienda
                </a>

                <Link
                    to='/admin/productos'
                    className={`admin-opc ${activePath === "/admin/productos" ? 'admin-opc-activo' : ''}`}
                >
                    Productos
                </Link>
                <Link
                    to='/admin/pedidos'
                    className={`admin-opc ${activePath === "/admin/pedidos" ? 'admin-opc-activo' : ''}`}
                >
                    Pedidos
                </Link>
                <Link
                    to='/admin/usuarios'
                    className={`admin-opc ${activePath === "/admin/usuarios" ? 'admin-opc-activo' : ''}`}
                >
                    Usuarios
                </Link>
            </div>
            <div className='admin-content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;

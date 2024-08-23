import React, { useEffect, useState } from 'react';
import { useUserInfo } from '../../userInfoContext';
import { Link } from 'react-router-dom'; // Importar Link
import Loader from '../../ui/loader/loader';
import UserIcon from '../../assets/user.png';
import './usuario.css';

import pedidosIco from '../../assets/pedidos.png';
import direccionesIco from '../../assets/direcciones.png';

const Usuario = () => {
    const [loading, setLoading] = useState(true);
    const { userLogged, setUserLogged, userGoogle, setUserGoogle, user, setUser, cerrarSesion } = useUserInfo();
    const imgUser = user?.imageUrl || UserIcon;

    useEffect(() => {
        if (userLogged) {
            //console.log('Usuario logeado:', user);
            setLoading(false);
        }
    }, [userLogged, userGoogle, user]);

    return (
        <div className='content contenedor-vertical-arriba-centro'>
            {loading ? (
                <Loader />
            ) : (
                <div className="card">
                    <div className="card-horizontal">
                        <img src={imgUser} alt="imagen-usuario" className="imagen-usuario" />
                        <div className="card-details">
                            <div className="dato">{user.name}</div>
                            <div className="dato">{user.email}</div>
                        </div>
                    </div>

                    <button className="boton-secundario" onClick={cerrarSesion}>
                        Cerrar sesión
                    </button>
                </div>
            )}
            <div className="contenedor-dire-pedidos">
                <Link to="/mis-pedidos" className="boton-primario">
                    <img src={pedidosIco} alt="Icono de pedidos" className="icono-boton" />
                    Mis pedidos
                    <span className="descripcion-boton">Revisa tus pedidos anteriores</span>
                </Link>
                <Link to="/mis-direcciones" className="boton-primario">
                    <img src={direccionesIco} alt="Icono de direcciones" className="icono-boton" />
                    Mis direcciones
                    <span className="descripcion-boton">Gestiona tus direcciones</span>
                </Link>
            </div>
        </div>
    );
};

export default Usuario;

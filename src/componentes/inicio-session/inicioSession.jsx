import React from 'react';
import { Link } from 'react-router-dom';
import './inicioSession.css';

import logo from '../../assets/pagina-del-producto.png';


function InicioSession() {
    return (
        <div className='inicio-session'>
            <div className='card-inicio-session'>
                <img src={logo} alt='logo' className='logo-inicio-session' />
                <h2 className='titulo-inicio-session'>Iniciar sesión</h2>
                <div className='contenedor-vertical-izquierda-centro'>
                    <label className='label-texto'>Usuario</label>
                    <input type='text' placeholder='' className='input-text' />
                </div>
                <div className='contenedor-vertical-izquierda-centro'>
                    <label className='label-texto'>Contraseña</label>
                    <input type='password' placeholder='' className='input-text' />
                </div>
                <button className='boton-primario'>Iniciar sesión</button>
                <div className='separador' />
                <div className='contenedor-horizontal'>
                    <Link to='/registro' className='link-texto'>Registrarse</Link>
                    <Link to='/recuperar-contrasena' className='link-texto'>¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </div>
    );
};

export default InicioSession;

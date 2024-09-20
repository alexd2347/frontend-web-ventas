import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './inicioSession.css';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { useUserInfo } from '../../userInfoContext';
import { IniciarSession } from '../../services/usuarios';

import Notificacion from '../../ui/notificacion/Notificacion';

function InicioSession() {
    const [notificacion, setNotificacion] = useState(null);
    const { iniciarSesion, iniciarSesionGoogle } = useUserInfo();
    const clienteID = '1066419706796-eoskdb75iv7feop375k5iut1tkaf27hr.apps.googleusercontent.com';

    useEffect(() => {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: clienteID,
            });
        });
    }, []);

    const mostrarNotificacion = (mensaje) => {
        setNotificacion(mensaje);
        setTimeout(() => {
            setNotificacion(null);
        }, 3000);
    };

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        mostrarNotificacion('Iniciando sesión...');
        const usuario = await IniciarSession(email, contrasena);
        if (usuario) {
            iniciarSesion(email, contrasena);
        } else {
            mostrarNotificacion('Email o contraseña incorrectos');
        }
    };

    const handleGoogleLoginSuccess = (response) => {
        console.log('Redirection URI:', window.location.href);
        const user = response.profileObj;
        if (user) {
            console.log('Usuario', user);
            iniciarSesionGoogle(user);
        } else {
            mostrarNotificacion('ocurrió un error al iniciar sesión con Google');
        }
    };

    const handleGoogleLoginError = (error) => {
        console.error('Google login error:', error);
    };
    return (
        <div className='inicio-session'>
            <form className='card-inicio-session' onSubmit={handleLogin}>
                <h1 className="sidebar-titulo">JC</h1>
                <div className='titulo-inicio-session'>Iniciar sesión</div>
                <div className='contenedor-vertical-izquierda-centro'>
                    <label className='label-texto'>Email</label>
                    <input
                        type='text'
                        placeholder=''
                        className='input-text'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className='contenedor-vertical-izquierda-centro'>
                    <label className='label-texto'>Contraseña</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder=''
                        className='input-text'
                        onChange={(e) => setContrasena(e.target.value)}
                        value={contrasena}
                    />
                    {/** checkbox mostrar contraseña */}
                    <div className='show-password-container'>
                        <input
                            type="checkbox"
                            id="show-password"
                            checked={showPassword}
                            onChange={toggleShowPassword}
                        />
                        <label htmlFor="show-password">Mostrar contraseña</label>
                    </div>
                </div>
                <button className='boton-primario' type="submit">Iniciar sesión</button>

                <div className='google-login-container'>
                    <GoogleLogin
                        clientId={clienteID}
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        cookiePolicy='none'
                    />
                </div>
                <div className='contenedor-horizontal-extendido'>
                    <Link to='/registro' className='link-texto'>Registrarse</Link>
                </div>
            </form>
            {notificacion && (
                <Notificacion mensaje={notificacion} onClose={() => setNotificacion(null)} />
            )}
        </div>
    );
};

export default InicioSession;

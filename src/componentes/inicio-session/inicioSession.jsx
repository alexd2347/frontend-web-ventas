import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './inicioSession.css';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { useUserInfo } from '../../userInfoContext';
import { ObtenerUsuario, ObtenerUsuarioPorGoogleId } from '../../services/usuarios';

import { useCarrito } from '../../carritoContext';
import { ObtenerCarritoPorUsuario } from '../../services/carritos';
import Notificacion from '../../ui/notificacion/Notificacion';

import logo from '../../assets/pagina-del-producto.png';

function InicioSession() {
    const { vaciarCarrito, setProductos } = useCarrito();
    const [notificacion, setNotificacion] = useState(null);
    const { setUserLogged, setUserGoogle, setUser, user, setUserId } = useUserInfo();
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

        //si el usuario y contraseña son admin, redirigir a la página de admin
        if (email === 'admin' && contrasena === 'admin') {
            setUserLogged(true);
            setUser({ nombre: 'Admin', rol: 'admin' });
            window.location.hash = `#/admin/productos`;
            return;
        }
        /*
        // Verificar si los campos están vacíos
        if (email.trim() === '' || contrasena.trim() === '') {
            mostrarNotificacion('Todos los campos son obligatorios');
            return;
        }

        const user = await ObtenerUsuario(email, contrasena);

        // Verificar si se obtuvo un usuario
        if (!user) {
            mostrarNotificacion('Usuario o contraseña incorrectos');
            return;
        }

        const carrito = await ObtenerCarritoPorUsuario(user.id);
        if (carrito) {
            console.log('Carrito BD:', carrito);
            const productos = JSON.parse(carrito.carrito);
            console.log('Productos:', productos);
            vaciarCarrito();
            setProductos(productos);
        }


        if (user.rol === 'admin') {
            setUserLogged(true);
            setUser(user);
            setUserId(user.id);
            return;
        }

        setUserLogged(true);
        setUser(user);
        setUserId(user.id);
        window.location.hash = `#/inicio`;
        */
    };
    /*
    useEffect(() => {
        if (user?.rol === 'admin') {
            window.location.hash = `#/admin/productos`;
        }
    }, [user]);*/

    const handleGoogleLoginSuccess = (response) => {
        const user = ObtenerUsuarioPorGoogleId(response.profileObj.googleId);
        setUserLogged(true);
        setUserGoogle(true);
        setUser(response.profileObj);
        setUserId(user.id);
        window.location.hash = `#/inicio`;
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
                        cookiePolicy='single_host_policy'
                    />
                </div>
                <div className='contenedor-horizontal-extendido'>
                    <Link to='/registro' className='link-texto'>Registrarse</Link>
                    <Link to='/recuperar-contrasena' className='link-texto'>¿Olvidaste tu contraseña?</Link>
                </div>
            </form>
            {notificacion && (
                <Notificacion mensaje={notificacion} onClose={() => setNotificacion(null)} />
            )}
        </div>
    );
};

export default InicioSession;

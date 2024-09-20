import React, { useState } from 'react';
import { CrearUsuario, verificarUsuario } from '../../../services/usuarios';
import Notificacion from '../../../ui/notificacion/Notificacion';
import { useUserInfo } from '../../../userInfoContext';
import './registro.css';

const Registro = () => {
    const { iniciarSesion } = useUserInfo();
    const [notificacion, setNotificacion] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mostrarContrasenas, setMostrarContrasenas] = useState(false);
    const [emailValido, setEmailValido] = useState(true);
    const [telefono, setTelefono] = useState('');
    const mostrarNotificacion = (mensaje) => {
        setNotificacion(mensaje);
        setTimeout(() => {
            setNotificacion(null);
        }, 3000);
    };

    const handleEmail = async (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue); // Actualiza el estado del email
        const usuario = await verificarUsuario(emailValue);
        if (usuario) {
            mostrarNotificacion('El email ya está registrado');
            setEmailValido(false);
        } else {
            setEmailValido(true);
        }
    };

    const validarEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validarPassword = (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return re.test(password);
    };

    const validarTelefono = (telefono) => {
        const re = /^[0-9]{10}$/;
        return re.test(telefono);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarEmail(email)) {
            mostrarNotificacion('El email no es válido.');
            return;
        }
        if (!emailValido) {
            mostrarNotificacion('El email ya está registrado');
            return;
        }

        if (!validarPassword(password)) {
            mostrarNotificacion('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
            return;
        }

        if (password !== confirmPassword) {
            mostrarNotificacion('Las contraseñas no coinciden.');
            return;
        }

        if (!validarTelefono(telefono)) {
            mostrarNotificacion('El telefono no es válido.');
            return
        }

        const data = {
            name: nombre,
            email: email,
            password: password,
            rol: 'user',
            estado: true,
            idGoogle: 'no',
            telefono: telefono
        }

        try {
            await CrearUsuario(data);
            mostrarNotificacion('Usuario registrado correctamente');
            iniciarSesion(email, password);
        } catch (error) {
            console.log(error);
            mostrarNotificacion('Error al registrar el usuario');
        }
    };

    return (
        <div className='inicio-session'>
            <form className='card-inicio-session' onSubmit={handleSubmit}>
                <h1 className="sidebar-titulo">JC</h1>
                <div className='titulo-inicio-session'>Registro</div>
                <div className="contenedor-vertical-izquierda-centro">
                    <label className='label-texto'>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className='input-text'
                    />
                </div>

                <div className="contenedor-vertical-izquierda-centro">
                    <label className='label-texto'>Telefono</label>
                    <input
                        type="text"
                        value={telefono}
                        className='input-text'
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>

                <div className='contenedor-vertical-izquierda-centro'>
                    <label className='label-texto'>Email</label>
                    <input
                        type="email"
                        className='input-text'
                        value={email}
                        onChange={handleEmail} // Cambiado a referencia de función
                        required
                    />
                </div>

                <div className='contenedor-vertical-izquierda-centro'>
                    <label className='label-texto'>Contraseña</label>
                    <input
                        type={mostrarContrasenas ? 'text' : 'password'}
                        value={password}
                        className='input-text'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className='contenedor-vertical-izquierda-centro'>
                    <label className='label-texto'>Confirmar Contraseña</label>
                    <input
                        type={mostrarContrasenas ? 'text' : 'password'}
                        value={confirmPassword}
                        className='input-text'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className='show-password-container'>
                    <label>
                        <input
                            type="checkbox"
                            checked={mostrarContrasenas}
                            onChange={() => setMostrarContrasenas(!mostrarContrasenas)}
                        />
                        <label>Mostrar contraseñas</label>
                    </label>
                </div>
                <button type="submit" className='boton-primario'>Registrarse</button>
            </form>
            {notificacion && (
                <Notificacion mensaje={notificacion} onClose={() => setNotificacion(null)} />
            )}
        </div>
    );
};

export default Registro;

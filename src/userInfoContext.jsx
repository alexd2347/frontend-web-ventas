import React, { useEffect, useState, createContext, useContext } from "react";
import { CrearUsuario, ObtenerUsuarioPorGoogleId, IniciarSession } from "./services/usuarios";
const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [userLogged, setUserLogged] = useState(false);
    const [idGoogle, setIdGoogle] = useState('');
    const [telefono, setTelefono] = useState('');
    const [imgGoogle, setImgGoogle] = useState('');

    useEffect(() => {
        //al uniciar la aplicación, verificar si hay un usuario guardado en el local storage
        //si si encuentra un usuario, cargarlo en el estado
        const userId = localStorage.getItem('userId');
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const rol = localStorage.getItem('rol');
        const userLogged = localStorage.getItem('userLogged') === 'true';
        const idGoogle = localStorage.getItem('idGoogle');
        const telefono = localStorage.getItem('telefono');
        const imgGoogle = localStorage.getItem('imgGoogle');

        if (userId) {
            setUserId(userId);
        } else {
            cerrarSesion();
        }
        if (name) {
            setName(name);
        }
        if (email) {
            setEmail(email);
        }
        if (rol) {
            setRol(rol);
        }
        if (userLogged) {
            setUserLogged(userLogged);
        } else {
            setUserLogged(false);
        }
        if (idGoogle) {
            setIdGoogle(idGoogle);
        }
        if (telefono) {
            setTelefono(telefono);
        }
        if (imgGoogle) {
            setImgGoogle(imgGoogle);
        }
    }, []);

    useEffect(() => {
        //guardar los datos en el local storage cuando algo cambie
        localStorage.setItem('userId', userId);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('rol', rol);
        localStorage.setItem('userLogged', userLogged);
        localStorage.setItem('idGoogle', idGoogle);
        localStorage.setItem('telefono', telefono);
        localStorage.setItem('imgGoogle', imgGoogle);
        //console.log("user data ", userId, name, email, rol, userLogged, idGoogle, telefono, imgGoogle);
    }, [userId, name, email, rol, userLogged, idGoogle, telefono, imgGoogle]);

    const iniciarSesion = async (email, password) => {
        const usuario = await IniciarSession(email, password);
        if (usuario) {
            setUserId(usuario.id);
            setName(usuario.name);
            setEmail(usuario.email);
            setRol(usuario.rol);
            setUserLogged(true);
            setTelefono(usuario.telefono);
            setImgGoogle('');
        }
        if (usuario.rol === 'admin') {
            window.location.hash = `#/admin/productos`;
        } else {
            window.location.hash = `#/inicio`;
        }
    }

    const iniciarSesionGoogle = async (user) => {
        const usuario = await ObtenerUsuarioPorGoogleId(user.googleId);
        if (usuario) {
            setUserId(usuario.id);
            setName(usuario.name);
            setEmail(usuario.email);
            setRol(usuario.rol);
            setUserLogged(true);
            setIdGoogle(usuario.idGoogle);
            setTelefono(usuario.telefono);
            setImgGoogle(user.imageUrl);
        } else {
            //registrar el usuario
            const usuario = {
                name: user.name,
                email: user.email,
                password: 'no',
                rol: 'user',
                estado: true,
                idGoogle: user.googleId,
                telefono: 'no',
            }
            const usuarioRegistrado = await CrearUsuario(usuario);
            setUserId(usuarioRegistrado.id);
            setName(user.name);
            setEmail(user.email);
            setRol('user');
            setUserLogged(true);
            setIdGoogle(user.googleId);
            setTelefono('no');
            setImgGoogle(user.imageUrl);
        }
        //console.log("rol", usuario.rol);
        if (usuario.rol === 'admin') {
            //console.log("entro");
            window.location.hash = `#/admin/productos`;
        } else {
            window.location.hash = `#/inicio`;
        }

    }

    const cerrarSesion = () => {
        //borrar los datos del local storage y del estado
        setUserId('');
        setName('');
        setEmail('');
        setRol('');
        setUserLogged(false);
        setIdGoogle('');
        setTelefono('');
        setImgGoogle('');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('rol');
        localStorage.removeItem('userLogged');
        localStorage.removeItem('idGoogle');
        localStorage.removeItem('telefono');
        localStorage.removeItem('imgGoogle');
        window.location.hash = `#/inicio`;
    }

    return (
        <UserInfoContext.Provider value={
            {
                cerrarSesion,
                iniciarSesion,
                iniciarSesionGoogle,
                userId,
                name,
                email,
                rol,
                userLogged,
                idGoogle,
                telefono,
                imgGoogle
            }
        }>
            {children}
        </UserInfoContext.Provider>
    );
};

export const useUserInfo = () => {
    return useContext(UserInfoContext);
}

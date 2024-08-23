import React, { useEffect, useState, createContext, useContext } from "react";
import { ObtenerUsuario, ObtenerUsuarioPorGoogleId } from "./services/usuarios";
const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
    const [userLogged, setUserLogged] = useState(false);
    const [userGoogle, setUserGoogle] = useState(false);
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserLogged = localStorage.getItem('userLogged');
        const storedUserGoogle = localStorage.getItem('userGoogle');
        const storedUser = localStorage.getItem('user');

        if (storedUserLogged) {
            setUserLogged(JSON.parse(storedUserLogged));
        }

        if (storedUserGoogle) {
            setUserGoogle(JSON.parse(storedUserGoogle));
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        console.log('User:', user);
        localStorage.setItem('userLogged', JSON.stringify(userLogged));
        localStorage.setItem('userGoogle', JSON.stringify(userGoogle));
        localStorage.setItem('user', JSON.stringify(user));
    }, [userLogged, userGoogle, user]);

    const cerrarSesion = () => {
        setUserLogged(false);
        setUserGoogle(false);
        setUser({});
        localStorage.removeItem('userLogged');
        localStorage.removeItem('userGoogle');
        localStorage.removeItem('user');
        window.location.hash = `#/inicio`;
    }

    return (
        <UserInfoContext.Provider value={{ userLogged, setUserLogged, userGoogle, setUserGoogle, user, setUser, cerrarSesion, setUserId, userId }}>
            {children}
        </UserInfoContext.Provider>
    );
};

export const useUserInfo = () => {
    return useContext(UserInfoContext);
}

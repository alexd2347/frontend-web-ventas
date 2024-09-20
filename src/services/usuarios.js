const URL = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_PATH3}`;

export const ObtenerUsuarios = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export const CrearUsuario = async (usuario) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
};


export const ObtenerUsuarioPorGoogleId = async (googleId) => {
    try {
        const response = await fetch(URL);
        const usuarios = await response.json();
        const usuario = usuarios.find((usuario) => usuario.idGoogle === googleId);
        return usuario;
    } catch (error) {
        console.error(error);
    }
}

export const IniciarSession = async (email, password) => {
    try {
        const response = await fetch(URL);
        const usuarios = await response.json();
        const usuario = usuarios.find((usuario) => usuario.email === email && usuario.password === password);
        return usuario;
    } catch (error) {
        console.error(error);
    }
}

export const verificarUsuario = async (email) => {
    try {
        const response = await fetch(URL);
        const usuarios = await response.json();
        const usuario = usuarios.find((usuario) => usuario.email === email);
        return usuario;
    } catch (error) {
        console.error(error);
    }
}
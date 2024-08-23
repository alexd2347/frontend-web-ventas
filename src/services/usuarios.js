
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
}


export const ObtenerUsuarioPorGoogleId = async (googleId) => {
    try {
        const response = await fetch(`${URL}/google/${googleId}`);
        const usuario = await response.json();
        return usuario;
    } catch (error) {
        console.error(error);
    }
}

export const ObtenerUsuario = async (email, password) => {
    try {
        const response = await fetch(`${URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }

        const usuario = await response.json();

        // Verifica que el objeto usuario tenga las propiedades esperadas
        if (!usuario || !usuario.id || !usuario.rol) {
            throw new Error('Usuario no válido');
        }
        return usuario;
    } catch (error) {
        console.error('Error en ObtenerUsuario:', error);
        return null; // Retornar null en caso de error
    }
}

const URL = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_PATH5}`;


export const ObtenerDirecciones = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const CrearDireccion = async (direccion) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(direccion),
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


export const ObtenerDireccionPorIdUsuario = async (id) => {
    try {
        const response = await fetch(`${URL}/${id}`);
        const direccion = await response.json();
        return direccion;
    } catch (error) {
        console.error(error);
    }
}

export const EliminarDireccion = async (id) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const ActualizarDireccion = async (id, direccion) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(direccion),
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


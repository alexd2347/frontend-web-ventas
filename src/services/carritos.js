const URL = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_PATH4}`;

export const ObtenerCarritos = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const CrearCarrito = async (carrito) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(carrito),
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

export const ObtenerCarritoPorId = async (id) => {
    try {
        const response = await fetch(`${URL}/${id}`);
        const carrito = await response.json();
        return carrito;
    } catch (error) {
        console.error(error);
    }
}

export const EliminarCarrito = async (id) => {
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

export const ActualizarCarrito = async (id, carrito) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(carrito),
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

export const ObtenerCarritoPorUsuario = async (id) => {
    try {
        const response = await fetch(`${URL}/usuario/${id}`);
        const carrito = await response.json();
        return carrito;
    } catch (error) {
        console.error(error);
    }
}
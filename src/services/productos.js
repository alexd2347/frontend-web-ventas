const URL = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_PATH2}`;


export const ObtenerProductos = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const CrearProducto = async (producto) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: producto, // Envía el FormData directamente
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        return response.json(); // O manejar la respuesta según sea necesario
    } catch (error) {
        console.error(error);
    }
};


export const ObtenerProductoPorId = async (id) => {
    try {
        const response = await fetch(`${URL}/${id}`);
        const producto = await response.json();
        return producto;
    } catch (error) {
        console.error(error);
    }
};
export const ObtenerProductosEnPromocion = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        //return data.filter((producto) => producto.promocion);
        const productosPromocion = data.filter((producto) => producto.promocion);
        const productosPromocionOrdenados = productosPromocion.sort((a, b) => b.precioPromocion - a.precioPromocion);
        return productosPromocionOrdenados;
    } catch (error) {
        console.error(error);
    }
}

export const ObtenerProductosNuevos = async () => {
    try {
        //retornar los prductos con ids mas grandes primero
        const response = await fetch(URL);
        const data = await response.json();
        //retornar solo 50 productos
        return data.sort((a, b) => b.id - a.id).slice(0, 50);
    } catch (error) {
        console.error(error);
    }
}

export const EliminarProducto = async (id) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
    } catch (error) {
        console.error(error);
    }
}


export const UpdateProducto = async (id, producto) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            body: producto,
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

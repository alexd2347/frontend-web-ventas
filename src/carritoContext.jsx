import React, { createContext, useState, useContext, useEffect } from 'react';
import { CrearCarrito, ActualizarCarrito, EliminarCarrito, ObtenerCarritoPorId, ObtenerCarritoPorUsuario } from './services/carritos';
import { useUserInfo } from './userInfoContext';
import { ObtenerProductoPorId } from './services/productos';
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const { userId } = useUserInfo();
    const [cantidadProductosCarrito, setCantidadProductosCarrito] = useState(0);
    const [productosCarrito, setProductosCarrito] = useState([]);
    useEffect(() => {
        setCantidadProductosCarrito(productosCarrito.length);
    }, [productosCarrito]);


    const CarritoPorUsuario = async () => {
        let carrito = await ObtenerCarritoPorUsuario(userId);
        if (!carrito) {
            setProductosCarrito([]);
            setCantidadProductosCarrito(0);
            return;
        }
        //obtener los productos de cada producto del carrito
        carrito = await Promise.all(carrito.map(async (producto) => {
            const productoBD = await ObtenerProductoBD(producto.idProducto);
            //verificar que la cantidad no exceda el stock del producto
            //si el stock de la talla es menor a la cantidad del productoBD, poner la cantidad igual al stock
            //si ya no hay stock o no se encuentra la talla, eliminar el producto del carrito
            if (!productoBD) {
                EliminarCarrito(producto.id);
                return null;
            }
            const stock = productoBD.cantidad.split(',')[productoBD.tallas.split(',').indexOf(producto.talla)];
            if (stock < producto.cantidad) {
                producto.cantidad = stock;
                ActualizarProductoCarrito(producto.id, producto);
            } else if (stock === null) {
                EliminarCarrito(producto.id);
                return null;
            }
            return producto;
        }));
        if (carrito) {
            setProductosCarrito(carrito);
        }

    }

    useEffect(() => {
        if (userId) {
            //console.log("carrito por usuario: " + userId);
            //console.log("productos carrito: ", productosCarrito);
        }
    }, [productosCarrito]);

    const ObtenerProductoBD = async (id) => {
        const producto = await ObtenerProductoPorId(id);
        return producto;
    }

    const ObtenerProductoCarritoPorId = async (id) => {
        const producto = await ObtenerCarritoPorId(id);
        return producto;
    }

    const ActualizarProductoCarrito = async (id, producto) => {
        //console.log("id a enviar en la actualizacion ", id)
        //console.log("producto a enviar en la actualizacion ", producto)
        const carrito = {
            idUsuario: userId,
            idProducto: producto.idProducto,
            cantidad: producto.cantidad,
            talla: producto.talla
        };
        await ActualizarCarrito(id, carrito);
    }
    const AgregarProductoAlCarrito = async (producto) => {
        const carrito = {
            idUsuario: userId,
            idProducto: producto.idProducto,
            cantidad: producto.cantidad,
            talla: producto.talla
        };
        await CrearCarrito(carrito);
    }

    useEffect(() => {
        if (userId) {
            CarritoPorUsuario();
        }
    }, [userId]);

    const agregarProducto = async (producto) => {
        const carrito = await ObtenerCarritoPorUsuario(userId);
        const productoCarrito = carrito.find(p => p.idProducto === producto.idProducto && p.talla === producto.talla);
        //console.log("productoCarrito: ", productoCarrito);
        if (productoCarrito) {
            const productoBD = await ObtenerProductoBD(producto.idProducto);

            const stock = productoBD.cantidad.split(',')[productoBD.tallas.split(',').indexOf(producto.talla)];
            //console.log("stock maximo a usar: ", stock);
            if (stock < productoCarrito.cantidad + producto.cantidad) {
                producto.cantidad = stock;
            } else {
                producto.cantidad += producto.cantidad;
            }
            //console.log("producto a actualizar: ", productoCarrito);
            ActualizarProductoCarrito(productoCarrito.id, producto);
        } else {
            //console.log("producto a agregar: ", producto);
            AgregarProductoAlCarrito(producto);

            CarritoPorUsuario();
        }
        //actualizar el carrito
        CarritoPorUsuario();
    };

    const eliminarProducto = async (id) => {
        //eliminar el producto del carrito y volver a obtener el carrito
        EliminarCarrito(id);
        setCantidadProductosCarrito(cantidadProductosCarrito - 1);
        setProductosCarrito(productosCarrito.filter(producto => producto.id !== id));

    };

    const vaciarCarrito = () => {
        //eliminar todos los productos del carrito y volver a obtener el carrito
        productosCarrito.forEach(async (producto) => {
            await EliminarCarrito(producto.id);
        });
        setProductosCarrito([]);
        setCantidadProductosCarrito(0);

    };

    const aumentarCantidad = async (id, talla) => {
        //console.log("id: ", id);
        //console.log("talla: ", talla);
        //verificar que no se exceda el stock, en caso de que si, no hacer nada... en caso de que no, aumentar la cantidad y hacer el update
        let producto = await ObtenerProductoCarritoPorId(id);
        const productoBD = await ObtenerProductoBD(producto.idProducto);
        if (!productoBD) return;
        const stock = productoBD.cantidad.split(',')[productoBD.tallas.split(',').indexOf(producto.talla)];
        //console.log("stock: ", stock);
        if (stock >= (producto.cantidad + 1)) {
            producto.cantidad += 1;
            await ActualizarProductoCarrito(id, producto);
        }
        //actualizar el carrito
        await CarritoPorUsuario();
    };

    const disminuirCantidad = async (id) => {
        //la cantidad minima es 1, si la cantidad es 1, no hacer nada
        let producto = await ObtenerProductoCarritoPorId(id);
        if (producto.cantidad === 1) return;
        producto.cantidad -= 1;
        await ActualizarProductoCarrito(id, producto);
        //actualizar el carrito
        await CarritoPorUsuario();
    };

    return (
        <CarritoContext.Provider value={{ productosCarrito, cantidadProductosCarrito, agregarProducto, eliminarProducto, vaciarCarrito, aumentarCantidad, disminuirCantidad }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    return useContext(CarritoContext);
};

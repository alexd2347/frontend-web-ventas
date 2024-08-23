import React, { createContext, useState, useContext, useEffect } from 'react';
import { ObtenerProductoPorId } from './services/productos';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        localStorage.removeItem('carrito');
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        if (carrito) {
            setProductos(carrito);
        }
    }, []);

    useEffect(() => {
        //verificar que no haya productos vacios
        if (productos.length === 0) {
            localStorage.removeItem('carrito');
            return;
        }
        console.log("carrito", productos);
        localStorage.setItem('carrito', JSON.stringify(productos));
    }, [productos]);

    const agregarProducto = (producto) => {
        setProductos(prevProductos => {
            if (prevProductos.some(p => p.id_producto === producto.id_producto && p.talla === producto.talla)) {
                return prevProductos.map(p => {
                    if (p.id_producto === producto.id_producto && p.talla === producto.talla) {
                        return { ...p, cantidad: p.cantidad + producto.cantidad };
                    }
                    return p;
                });
            } else {
                return [...prevProductos, producto];
            }
        });
    };

    const eliminarProducto = (id) => {
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
    };

    const vaciarCarrito = () => {
        setProductos([]);
    };
    const fetchProductoBD = async (id) => {
        const productoObtenido = await ObtenerProductoPorId(id);
        return productoObtenido;
    };

    const aumentarCantidad = async (id, cantidad, talla) => {
        const producto = await fetchProductoBD(id);
        const stock = parseInt(producto.cantidad.split(',')[producto.tallas.split(',').indexOf(talla)]);

        if (cantidad < stock) {
            setProductos(prevProductos =>
                prevProductos.map(p => {
                    if (p.id_producto === id && p.talla === talla) {
                        return { ...p, cantidad: p.cantidad + 1 };
                    }
                    return p;
                })
            );
        }
    };

    const disminuirCantidad = async (id, cantidad, talla) => {
        if (cantidad > 1) {
            setProductos(prevProductos =>
                prevProductos.map(p => {
                    if (p.id_producto === id && p.talla === talla) {
                        return { ...p, cantidad: p.cantidad - 1 };
                    }
                    return p;
                })
            );
        }
    };
    
    return (
        <CarritoContext.Provider value={{ productos, setProductos, agregarProducto, eliminarProducto, vaciarCarrito, aumentarCantidad, disminuirCantidad }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    return useContext(CarritoContext);
};

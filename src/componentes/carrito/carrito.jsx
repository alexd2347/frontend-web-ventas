import React, { useEffect, useState } from 'react';
import { useCarrito } from '../../carritoContext';
import ProductoCarrito from '../../ui/productoCarrito/productoCarrito';
import Notificacion from '../../ui/notificacion/Notificacion';
import { ObtenerProductoPorId } from '../../services/productos';
import Loader from '../../ui/loader/loader';
import './carrito.css';

const Carrito = () => {
    const { productosCarrito, vaciarCarrito, eliminarProducto, aumentarCantidad, disminuirCantidad } = useCarrito();
    const [notificacion, setNotificacion] = useState(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchProductoBD = async (id) => {
        const productoObtenido = await ObtenerProductoPorId(id);
        return productoObtenido;
    };

    useEffect(() => {

        const calcularTotal = async () => {
            setLoading(true);
            let nuevoTotal = 0;

            for (const producto of productosCarrito) {
                const id = producto.idProducto;
                const productoBD = await fetchProductoBD(id);

                if (productoBD.promocion) {
                    nuevoTotal += productoBD.precioPromocion * producto.cantidad;
                } else {
                    nuevoTotal += productoBD.precio * producto.cantidad;
                }
            }

            //poner el total en formato de moneda sin decimales
            nuevoTotal = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(nuevoTotal);

            //quitar los decimales
            nuevoTotal = nuevoTotal.split('.')[0];
            setTotal(nuevoTotal);
            setLoading(false);
        };

        calcularTotal();
    }, [productosCarrito]);

    const mostrarNotificacion = (mensaje) => {
        setNotificacion(mensaje);
        setTimeout(() => {
            setNotificacion(null);
        }, 3000);
    };

    const handleVaciarCarrito = () => {
        vaciarCarrito();
    };

    const handleEliminarProducto = (id) => {
        eliminarProducto(id);
        mostrarNotificacion('Producto eliminado del carrito');
    };

    const handleAumentarCantidad = (id, talla) => () => {
        console.log("talla: ", talla);
        aumentarCantidad(id, talla);
        mostrarNotificacion('Cantidad aumentada');
    }

    const handleDisminuirCantidad = (id) => () => {
        disminuirCantidad(id);
        mostrarNotificacion('Cantidad disminuida');
    }

    const handleComprar = () => {
        // Aquí se puede agregar la lógica para realizar la compra
        mostrarNotificacion('Proceso de compra en construcción');
    }

    return (
        <div className='carrito-content'>
            <h2>Mi Carrito</h2>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {productosCarrito.length === 0 ? (
                        <p>No hay productos en el carrito</p>
                    ) : (
                        <>
                            <div className='contenedor-vertical'>
                                {productosCarrito.map(producto => (
                                    <div key={producto.id} className='contenedor-horizontal-extendido gap-10px'>
                                        <ProductoCarrito producto={producto} />
                                        <div className='contenedor-vertical-auto gap-10px'>
                                            <button className='boton-secundario' onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                                            <div className='cantidad'>
                                                <button className='boton-cantidad' onClick={handleDisminuirCantidad(producto.id)}>-</button>
                                                <button className='boton-cantidad' onClick={handleAumentarCantidad(producto.id, producto.talla)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='contenedor-horizontal-derecha gap-10px'>
                                <p className='total'>Total {total}</p>
                                <p>+200 envio</p>
                            </div>
                            <div className='contenedor-horizontal-extendido gap-10px width-100'>
                                <button onClick={handleVaciarCarrito} className='boton-secundario'>Vaciar carrito</button>
                                <button onClick={handleComprar} className='boton-primario'>Comprar</button>
                            </div>
                        </>
                    )}
                </>
            )}
            {notificacion && (
                <Notificacion mensaje={notificacion} onClose={() => setNotificacion(null)} />
            )}
        </div>
    );
};

export default Carrito;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ObtenerProductoPorId } from '../../services/productos';
import Carrito from '../../assets/carrito-de-compras.png';
import { useCarrito } from '../../carritoContext';
import { useUserInfo } from '../../userInfoContext';
import Notificacion from '../../ui/notificacion/Notificacion';
import './producto.css';

const Producto = () => {
    const { userLogged } = useUserInfo();
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [imagenPrincipal, setImagenPrincipal] = useState('');
    const [tallaSeleccionada, setTallaSeleccionada] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const { agregarProducto } = useCarrito();
    const [notificacion, setNotificacion] = useState(null);

    const mostrarNotificacion = (mensaje) => {
        setNotificacion(mensaje);
        setTimeout(() => {
            setNotificacion(null);
        }, 3000);
    };

    useEffect(() => {
        const fetchProducto = async () => {
            const producto = await ObtenerProductoPorId(id);
            setProducto(producto);
            setImagenPrincipal(producto.imagenes.split(',')[0]);
            setTallaSeleccionada(producto.tallas.split(',')[0]);
        };
        fetchProducto();
    }, [id]);

    useEffect(() => {
        // Verifica si la talla seleccionada tiene stock
        const stock = producto ? producto.cantidad.split(',')[producto.tallas.split(',').indexOf(tallaSeleccionada)] : 0;
        if (stock === "0") {
            setCantidad(0);
        } else if (cantidad === 0) {
            setCantidad(1); // Restablecer a 1 si había sido 0 anteriormente.
        }
    }, [tallaSeleccionada, producto]);

    const handleImagenClick = (imagen) => {
        setImagenPrincipal(imagen);
    };

    const handleTallaClick = (talla) => {
        setTallaSeleccionada(talla);
        setCantidad(1); // Reinicia la cantidad a 1
    };

    const handleDisminuirCantidad = () => {
        if (cantidad === 1) return;
        setCantidad(cantidad - 1);
    };

    const handleAUmentarCantidad = () => {
        const stock = producto.cantidad.split(',')[producto.tallas.split(',').indexOf(tallaSeleccionada)];
        if (cantidad == stock) return;
        setCantidad(cantidad + 1);
    };

    const handleAgregarAlCarrito = () => {
        if (!userLogged) {
            mostrarNotificacion('Debes iniciar sesión para agregar productos al carrito');
            return;
        }
        agregarProducto({ idProducto: producto.id, talla: tallaSeleccionada, cantidad });
        mostrarNotificacion('Producto agregado al carrito');
    };

    return (
        <>
            {producto ? (
                <div className='producto-contenedor-principal'>
                    <div className='producto-imagenes-contenedor'>
                        <div className='producto-imagenes-peque-contenedor'>
                            {producto.imagenes.split(',').map((imagen, index) => (
                                <img
                                    key={index}
                                    src={`${import.meta.env.VITE_URL_API2}/uploads/${imagen}`}
                                    alt={`Producto ${index + 1}`}
                                    className='imagen-pequena'
                                    onClick={() => handleImagenClick(imagen)}
                                />
                            ))}
                        </div>
                        <img src={`${import.meta.env.VITE_URL_API2}/uploads/${imagenPrincipal}`} alt='Imagen Principal' className='imagen-principal' />
                        {producto.promocion && <div className='cuadrito-promocion'>Off</div>}
                    </div>
                    <div className='producto-descripcion-contenedor'>
                        <div className='producto-nombre-desc'>{producto.nombre}</div>
                        {producto.promocion ? (
                            <>
                                <p className="precio-promocion-desc">De ${producto.precio}</p>
                                <p className="precio-desc"> a ${producto.precioPromocion}</p>
                            </>
                        ) : (
                            <>
                                <p className="precio-desc">${producto.precio}</p>
                            </>
                        )}
                        <p className='producto-descripcion'>{producto.descripcion}</p>
                        <div className='separador' />
                        <div className='tallas'>
                            {producto.tallas.split(',').map((talla, index) => (
                                <div
                                    key={index}
                                    className={`talla ${talla === tallaSeleccionada ? 'talla-seleccionada' : ''}`}
                                    onClick={() => handleTallaClick(talla)}
                                >
                                    {talla}
                                </div>
                            ))}
                        </div>
                        <p>Stock: {producto.cantidad.split(',')[producto.tallas.split(',').indexOf(tallaSeleccionada)]}</p>
                        <div className='cantidad'>
                            <button className='boton-cantidad' onClick={handleDisminuirCantidad} disabled={cantidad === 0}>-</button>
                            <span className='cantidad-numero'>{cantidad}</span>
                            <button className='boton-cantidad' onClick={handleAUmentarCantidad} disabled={cantidad === 0}>+</button>
                        </div>
                        <button 
                            className='boton-primario' 
                            onClick={handleAgregarAlCarrito} 
                            disabled={cantidad === 0}
                        >
                            <img src={Carrito} alt='Carrito de compras' className='icono-carrito' />
                            Agregar al carrito
                        </button>
                        {producto.promocion && <p>¡En promoción!</p>}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {notificacion && (
                <Notificacion mensaje={notificacion} onClose={() => setNotificacion(null)} />
            )}
        </>
    );
};

export default Producto;

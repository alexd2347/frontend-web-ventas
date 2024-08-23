import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ObtenerProductoPorId } from '../../services/productos';
import Carrito from '../../assets/carrito-de-compras.png';
import { useCarrito } from '../../carritoContext';
import Notificacion from '../../ui/notificacion/Notificacion';
import './producto.css';

const Producto = () => {
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
            setImagenPrincipal(producto.imagenes.split(',')[0]); // Establece la primera imagen como la imagen principal por defecto
            setTallaSeleccionada(producto.tallas.split(',')[0]); // Establece la primera talla como la talla seleccionada por defecto
        };
        fetchProducto();
    }, [id]);

    const handleImagenClick = (imagen) => {
        setImagenPrincipal(imagen);
    };

    const handleTallaClick = (talla) => {
        setTallaSeleccionada(talla);
        //reinicio la cantidad a 1
        setCantidad(1);
    };

    const handleDisminuirCantidad = () => {
        //disminuir la cantidad de productos
        //minimo 1
        if (cantidad === 1) return;
        setCantidad(cantidad - 1);
    }
    const handleAUmentarCantidad = () => {
        //aumentar la cantidad de productos
        //maximo el stock de la talla seleccionada
        const stock = producto.cantidad.split(',')[producto.tallas.split(',').indexOf(tallaSeleccionada)];
        if (cantidad == stock) return;
        setCantidad(cantidad + 1);
    }

    const handleAgregarAlCarrito = () => {
        //mandar el id del producto y la talla seleccionada junto con la cantidad al carrito
        //genera un uuid para el producto
        const uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);
        agregarProducto({ id: uuid, id_producto: producto.id, talla: tallaSeleccionada, cantidad });
        mostrarNotificacion('Producto agregado al carrito');
    }

    return (
        <div className='content'>
            {producto ? (
                <div className='producto-contenedor-principal'>
                    <div className='producto-imagenes-contenedor'>
                        <div className='producto-imagenes-peque-contenedor'>
                            {producto.imagenes.split(',').map((imagen, index) => (
                                <img
                                    key={index}
                                    src={`${import.meta.env.VITE_URL_API}/uploads/${imagen}`}
                                    alt={`Producto ${index + 1}`}
                                    className='imagen-pequena'
                                    onClick={() => handleImagenClick(imagen)}
                                />
                            ))}
                        </div>
                        <img src={`${import.meta.env.VITE_URL_API}/uploads/${imagenPrincipal}`} alt='Imagen Principal' className='imagen-principal' />
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
                            {/* Mostrar las tallas, separadas por "," y ponerlas en un cuadrito bonito */}
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
                        {/* cantidad aumentar o disminuri con botones mas o menos*/}
                        <div className='cantidad'>
                            <button className='boton-cantidad' onClick={handleDisminuirCantidad}>-</button>
                            <span className='cantidad-numero'>{cantidad}</span>
                            <button className='boton-cantidad' onClick={handleAUmentarCantidad}>+</button>
                        </div>
                        {/** Agregar un botón para agregar al carrito */}
                        <button className='boton-primario' onClick={handleAgregarAlCarrito}>
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
        </div>
    );
};

export default Producto;

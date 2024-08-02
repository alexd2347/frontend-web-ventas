import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ObtenerProductoPorId } from '../../services/productos';
import './producto.css';

const Producto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [imagenPrincipal, setImagenPrincipal] = useState('');
    const [tallaSeleccionada, setTallaSeleccionada] = useState('');

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
    };

    return (
        <div className='content'>
            {producto ? (
                <div className='producto-contenedor-principal'>
                    <div className='producto-imagenes-contenedor'>
                        <div className='producto-imagenes-peque-contenedor'>
                            {producto.imagenes.split(',').map((imagen, index) => (
                                <img
                                    key={index}
                                    src={imagen}
                                    alt={`Producto ${index + 1}`}
                                    className='imagen-pequena'
                                    onClick={() => handleImagenClick(imagen)}
                                />
                            ))}
                        </div>
                        <img src={imagenPrincipal} alt='Imagen Principal' className='imagen-principal' />
                        {producto.promocion && <div className='cuadrito-promocion'>Off</div>}
                    </div>
                    <div className='producto-descripcion-contenedor'>
                        <h2 className='producto-nombre'>{producto.nombre}</h2>
                        {producto.promocion ? (
                            <>
                                <p className="precio-promocion">De ${producto.precio}</p>
                                <p className="precio"> a ${producto.precioPromocion}</p>
                            </>
                        ) : (
                            <p className="precio">${producto.precio}</p>
                        )}
                        <p className='producto-descripcion'>{producto.descripcion}</p>
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
                        {producto.promocion && <p>¡En promoción!</p>}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Producto;

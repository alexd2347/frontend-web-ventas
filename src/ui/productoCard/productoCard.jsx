import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './productoCard.css';

const ProductoCard = ({ producto }) => {
    const [imagenActual, setImagenActual] = useState(producto.imagenes.split(',')[0]);
    const [blur, setBlur] = useState(false);
    const imagenes = producto.imagenes.split(',');
    const intervalRef = useRef(null);

    useEffect(() => {
        const cambiarImagen = () => {
            setBlur(true); // Aplicar el efecto de blur
            setTimeout(() => {
                setImagenActual((prevImagen) => {
                    const currentIndex = imagenes.indexOf(prevImagen);
                    const nextIndex = (currentIndex + 1) % imagenes.length;
                    return imagenes[nextIndex];
                });
                setBlur(false); // Quitar el efecto de blur
            }, 400); // Duración del efecto de blur

            // Configurar el siguiente intervalo
            const tiempoAleatorio = Math.floor(Math.random() * (18000 - 8000 + 1)) + 3000;
            intervalRef.current = setTimeout(cambiarImagen, tiempoAleatorio);
        };

        // Configurar el primer intervalo
        const tiempoInicial = Math.floor(Math.random() * (18000 - 8000 + 1)) + 3000;
        intervalRef.current = setTimeout(cambiarImagen, tiempoInicial);

        return () => clearTimeout(intervalRef.current);
    }, [imagenes]);

    return (
        <Link to={`/producto/${producto.id}`} className="producto-card">
            <img
                src={`${import.meta.env.VITE_URL_API2}/uploads/${imagenActual}`}
                alt={producto.nombre}
                className={blur ? 'blur' : ''}
            />
            <div className='producto-nombre'>{producto.nombre}</div>
            {/*<div className='producto-descripcion'>{producto.descripcion}</div>*/}

            {producto.promocion ? (
                <div className='contenedor-precio'>
                    <p className="precio-promocion">De ${producto.precio}</p>
                    <p className="precio"> a ${producto.precioPromocion}</p>
                </div>
            ) : (
                <div className='contenedor-precio'>
                    <p className="precio">${producto.precio}</p>
                </div>
            )}
            {producto.promocion && <div className='cuadrito-promocion'>Off</div>}
        </Link>
    );
};

export default ProductoCard;

import React, { useEffect, useState } from 'react';
import { ObtenerProductoPorId } from '../../services/productos';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../carritoContext';
import './productoCarrito.css';

const ProductoCarrito = ({ producto }) => {
    const [productoBD, setProductoBD] = useState(null);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchProductoBD = async () => {
            //console.log("producto: ", producto);
            const productoObtenido = await ObtenerProductoPorId(producto.idProducto);
            setProductoBD(productoObtenido);
            //si el producto tiene una promocion, calcular el total con la promocion 
            if (productoObtenido.promocion) {
                let total = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(productoObtenido.precioPromocion * producto.cantidad);
                total = total.split('.')[0];
                setTotal(total);
            } else {
                let total = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(productoObtenido.precio * producto.cantidad);
                total = total.split('.')[0];
                setTotal(total);
            }
        };
        fetchProductoBD();
    }, [producto.id, producto.cantidad]);

    if (!productoBD) {
        return <div>Cargando...</div>;
    }
    return (
        <div className='carrito-producto-container'>
            <Link to={`/producto/${productoBD.id}`}>
                <img
                    src={`${import.meta.env.VITE_URL_API2}/uploads/${productoBD.imagenes.split(',')[0]}`}
                    alt={productoBD.nombre}
                    className='carrito-producto-imagen'
                />
            </Link>
            <div className='carrito-producto-info'>
                <h2 className='carrito-producto-nombre'>{productoBD.nombre}</h2>
                <p className='talla'>{producto.talla}</p>
                <p className='carrito-producto-cantidad'>{producto.cantidad}pza</p>
                <p className='carrito-producto-precio'>
                    {total}
                </p>
            </div>
            {productoBD.promocion && <div className='carrito-cuadrito-promocion'>Off</div>}
        </div>
    );
};

export default ProductoCarrito;

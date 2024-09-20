import React, { useEffect, useState } from 'react';
import { ObtenerProductosNuevos } from '../../services/productos';
import ProductoCard from '../../ui/productoCard/productoCard';
import Loader from '../../ui/loader/loader';
import './nuevo.css';

function Nuevo() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            const data = await ObtenerProductosNuevos();
            setProductos(data);
            setLoading(false);
        };
        fetchProductos();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className='contenedor-cards'>
                    {productos.map((producto) => (
                        <ProductoCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Nuevo

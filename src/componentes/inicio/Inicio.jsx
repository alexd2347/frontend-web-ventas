import React, { useEffect, useState } from 'react';
import { ObtenerProductos } from '../../services/productos';
import ProductoCard from '../../ui/productoCard/productoCard';
import Loader from '../../ui/loader/loader';
import './Inicio.css';

function Inicio() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            const data = await ObtenerProductos();
            setProductos(data);
            setLoading(false);
        };
        fetchProductos();
    }, []);

    return (
        <div className='content contenedor-horizontal-arriba-centro'>
            {loading ? (
                <Loader />
            ) : (
                <div className='contenedor-cards'>
                    {productos.map((producto) => (
                        <ProductoCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inicio

import React, { useEffect, useState } from 'react';
import { ObtenerProductosNuevos } from '../../services/productos';
import ProductoCard from '../../ui/productoCard/productoCard';
import './nuevo.css';

function Nuevo() {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const fetchProductos = async () => {
            const data = await ObtenerProductosNuevos();
            setProductos(data);
        };
        fetchProductos();
    }, []);

    return (
        <div className='content contenedor-horizontal-arriba-centro'>
            <div className='contenedor-cards'>
                {productos.map((producto) => (
                    <ProductoCard key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
}

export default Nuevo

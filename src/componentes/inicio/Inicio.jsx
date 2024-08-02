import React, { useEffect, useState } from 'react';
import { ObtenerProductos } from '../../services/productos';
import ProductoCard from '../../ui/productoCard/productoCard';
import './Inicio.css';

function Inicio() {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const fetchProductos = async () => {
            const data = await ObtenerProductos();
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
};

export default Inicio

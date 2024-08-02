import React, {useEffect, useState} from 'react';
import { ObtenerProductosEnPromocion } from '../../services/productos';
import ProductoCard from '../../ui/productoCard/productoCard';
import './promocion.css';

function Promocion() {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const fetchProductos = async () => {
            const data = await ObtenerProductosEnPromocion();
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

export default Promocion

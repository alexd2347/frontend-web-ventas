import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { ObtenerProductos } from '../../services/productos';
import Loader from '../../ui/loader/loader';
import './buscar.css';
import ProductoCard from '../../ui/productoCard/productoCard'; // Asegúrate de que la importación sea correcta

const Buscar = () => {

    const { busqueda } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const debouncedFetch = useDebouncedCallback(
        async (value) => {
            setLoading(true);
            const productos = await ObtenerProductos();
            let productosFiltrados = productos;
            //si value conicide con producto.nombre ponerlo al principio
            if (value) {
                productosFiltrados = productos.filter((producto) =>
                    //sustituir acentos de producto.nombre por letras sin acentos
                    producto.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                );
            }
            setProductos(productosFiltrados);
            setLoading(false);
        },
        300
    );

    useEffect(() => {
        debouncedFetch(busqueda);
    }, [busqueda,]);

    return (
        <div className='contenedor-filtro-cards'>
            {loading ? (
                <Loader />
            ) : (
                <div className='contenedor-cards'>
                    {productos.length === 0 && (
                        <div className='sin-resultados'>No hay resultados</div>
                    )}
                    {productos.map((producto) => (
                        <ProductoCard key={producto.id} producto={producto} />
                    ))
                    }
                </div>
            )}
        </div>
    );
};

export default Buscar;

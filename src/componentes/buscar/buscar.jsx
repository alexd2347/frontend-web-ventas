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
<<<<<<< HEAD
        <div className='contenedor-filtro-cards'>
=======
        <div className='busqueda-container'>
            <div className='filtros-container'>
                <div className='filtro-container'>
                    <div className='filtro-titulo'>Genero</div>
                    <label>
                        <input
                            type="radio"
                            value="hombre"
                            checked={genero === 'hombre'}
                            onChange={handleGeneroChange}
                        />
                        Hombre
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="mujer"
                            checked={genero === 'mujer'}
                            onChange={handleGeneroChange}
                        />
                        Mujer
                    </label>
                    <label>
                        <input
                            type="radio"
                            value=""
                            checked={genero === ''}
                            onChange={handleGeneroChange}
                        />
                        Todos
                    </label>
                </div>
                <div className='separador' />
                <div className='filtro-container'>
                    <div className='filtro-titulo'>Torso</div>
                    <label>
                        <input
                            type="checkbox"
                            value="XS"
                            onChange={handleTallaChange}
                        />
                        Extra chica
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="S"
                            onChange={handleTallaChange}
                        />
                        Chica
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="M"
                            onChange={handleTallaChange}
                        />
                        Mediana
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="L"
                            onChange={handleTallaChange}
                        />
                        Grande
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="XL"
                            onChange={handleTallaChange}
                        />
                        Extra grande
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="XXL"
                            onChange={handleTallaChange}
                        />
                        Doble extra grande
                    </label>
                </div>
                <div className='separador' />
                <div className='filtro-container'>
                    <div className='filtro-titulo'>Precio</div>
                    <div className='contenedor-horizontal gap-10px flex-wrap-true'>
                        <input
                            type='number'
                            placeholder='min'
                            className='input-precio'
                            onChange={(e) => setPrecioMin(e.target.value)}
                            min='0'
                        />
                        <input
                            type='number'
                            placeholder='max'
                            className='input-precio'
                            onChange={(e) => setPrecioMax(e.target.value)}
                            min='0'
                        />
                    </div>
                </div>
            </div>
>>>>>>> 32f9e800ac5f93d615887960a8f6613e66fc4efa
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

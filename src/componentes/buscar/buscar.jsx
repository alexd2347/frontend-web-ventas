import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { ObtenerProductos } from '../../services/productos';
import Loader from '../../ui/loader/loader';
import './buscar.css';
import ProductoCard from '../../ui/productoCard/productoCard'; // Asegúrate de que la importación sea correcta

const Buscar = () => {
    const tiposCamisas = [
        'Camisa',
        'Playera',
        'Blusa',
        'Sudadera',
        'Sweater',
        'Playera Cuello Polo',
        'Playera Manga Larga',
    ];

    const tiposPantalones = [
        'Pantalón',
        'Jogger',
        'Shorts',
    ];

    const { busqueda } = useParams();
    const [productos, setProductos] = useState([]);
    const [genero, setGenero] = useState('');
    const [tipo, setTipo] = useState('');
    const [tallas, setTallas] = useState([]);
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [loading, setLoading] = useState(true);

    const debouncedFetch = useDebouncedCallback(
        async (value) => {
            setLoading(true);
            const productos = await ObtenerProductos();
            let productosFiltrados = productos;

            if (genero) {
                productosFiltrados = productosFiltrados.filter((producto) =>
                    producto.genero.toLowerCase() === genero.toLowerCase()
                );
            }

            if (tipo) {
                productosFiltrados = productosFiltrados.filter((producto) =>
                    producto.tipo.toLowerCase().includes(tipo.toLowerCase())
                );
            }

            if (tallas.length > 0) {
                //las tallas del producto estan separadas por comas
                //ejemplo: '30,32,34'
                //ejemplo: 'C,M,G'
                productosFiltrados = productosFiltrados.filter((producto) => {
                    const tallasProducto = producto.tallas.split(',');
                    return tallas.some((talla) => tallasProducto.includes(talla));
                });
            }

            if (precioMin) {
                productosFiltrados = productosFiltrados.filter((producto) => {
                    const precioFinal = producto.promocion ? producto.precioPromocion : producto.precio;
                    return precioFinal >= precioMin;
                });
            }

            if (precioMax) {
                productosFiltrados = productosFiltrados.filter((producto) => {
                    const precioFinal = producto.promocion ? producto.precioPromocion : producto.precio;
                    return precioFinal <= precioMax;
                });
            }

            //ordenar los productos por id
            productosFiltrados = productosFiltrados.sort((a, b) => a.id - b.id);

            //si value conicide con producto.nombre ponerlo al principio
            if (value) {
                const productosCoinciden = productosFiltrados.filter((producto) =>
                    producto.nombre.toLowerCase().includes(value.toLowerCase())
                );
                productosFiltrados = productosCoinciden.concat(
                    productosFiltrados.filter((producto) => !producto.nombre.toLowerCase().includes(value.toLowerCase()))
                );
            }
            setProductos(productosFiltrados);
            setLoading(false);
        },
        500
    );

    useEffect(() => {
        debouncedFetch(busqueda);
    }, [busqueda, genero, tallas, precioMin, precioMax]); // Agrega tallas como dependencia

    const handleGeneroChange = (event) => {
        setGenero(event.target.value);
    };

    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    };

    const handleTallaChange = (event) => {
        const { value } = event.target;
        if (tallas.includes(value)) {
            setTallas(tallas.filter((talla) => talla !== value));
        } else {
            setTallas([...tallas, value]);
        }
    };

    return (
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
                            value="C"
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
                            value="G"
                            onChange={handleTallaChange}
                        />
                        Grande
                    </label>
                </div>
                <div className='filtro-container'>
                    <div className='filtro-titulo'>Cintura</div>
                    <label>
                        <input
                            type="checkbox"
                            value="30"
                            onChange={handleTallaChange}
                        />
                        30
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="32"
                            onChange={handleTallaChange}
                        />
                        32
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="34"
                            onChange={handleTallaChange}
                        />
                        34
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
            {loading ? (
                <Loader />
            ) : (
                <div className='filtros-card-container'>
                    {productos.length === 0 ? (
                        <p>No se encontraron resultados</p>
                    ) : (
                        productos.map((producto) => (
                            <ProductoCard key={producto.id} producto={producto} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Buscar;

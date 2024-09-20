import React, { useCallback, useEffect, useState } from 'react';
import { ObtenerProductos, EliminarProducto } from '../../../services/productos';
import Loader from '../../../ui/loader/loader';
import NuevoProducto from './nuevoProducto/nuevoProducto';
import ActualizarProducto from './actualizarProducto/actualizarProducto';
import './productos.css';
import { Link } from 'react-router-dom';

import { useDebouncedCallback } from 'use-debounce';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showFormActualizarProducto, setShowFormActualizarProducto] = useState(false);
    const [idProductoActualizar, setIdProductoActualizar] = useState(null);

    const [buscar, setBuscar] = useState('');

    //------------------------------paginados tabla-------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    let currentResults = productos.slice(indexOfFirstResult, indexOfLastResult);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const fetchDataDebounced = useDebouncedCallback(
        async (buscar) => {
            setLoading(true);
            setCurrentPage(1);
            let data = await ObtenerProductos();
            if (buscar !== '') {
                //por cada palabra en buscar, filtrar los productos que contengan esa palabra
                const palabras = buscar.split(' ');
                data = data.filter((producto) => {
                    return palabras.every((palabra) => {
                        return (
                            producto.nombre.toLowerCase().includes(palabra.toLowerCase()) ||
                            producto.tallas.toLowerCase().includes(palabra.toLowerCase())
                        );
                    });
                });
            }
            setProductos(data);
            setLoading(false);
        },
        500
    );

    useEffect(() => {
        fetchDataDebounced(buscar);
    }, [buscar, fetchDataDebounced, showForm, showFormActualizarProducto]);

    const handleShowForm = () => {
        setShowForm(!showForm);

    }

    const cerrarFormulario = () => {
        setShowForm(false);
    }
    const handleShowFormActualizarProducto = (id) => {
        setIdProductoActualizar(id);
        setShowFormActualizarProducto(true);
    }

    const cerrarFormActualizarProducto = () => {
        setShowFormActualizarProducto(false);
    }



    const handleEliminarProducto = async (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar este producto?');
        if (confirmar) {
            await EliminarProducto(id);
            const data = await ObtenerProductos();
            setProductos(data);
        }
    }

    return (
        <div className='content contenedor-vertical-arriba-centro gap-10px pading-top-bottom-10px'>
            <div className='inputs-container'>
                <input
                    type='text'
                    placeholder='Buscar producto'
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                    className='input-text'
                />
                <button className='boton-primario' onClick={handleShowForm}>
                    Agregar producto
                </button>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className='contenedor-tabla'>

                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Tallas</th>
                                <th>Cantidades</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentResults.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>
                                        <Link to={`/producto/${producto.id}`}>
                                            <img
                                                src={`${import.meta.env.VITE_URL_API2}/uploads/${producto.imagenes.split(',')[0]}`}
                                                alt={producto.nombre}
                                                className='productos-producto-imagen'
                                            />
                                        </Link>
                                    </td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.tallas}</td>
                                    <td>{producto.cantidad}</td>
                                    <td>
                                        <div className='contenedor-horizontal gap-10px'>
                                            <button className='boton-secundario' onClick={(e) => handleEliminarProducto(producto.id)}>Eliminar</button>
                                            <button className='boton-primario' onClick={(e) => handleShowFormActualizarProducto(producto.id)}>Actualizar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination-container">
                        <button
                            className='pagination-button'
                            disabled={currentPage === 1}
                            onClick={handlePreviousPage}
                        >
                            Anterior
                        </button>
                        <div className='pagination-info'>
                            {currentPage} / {Math.ceil(productos.length / resultsPerPage)}
                        </div>
                        <button
                            className='pagination-button'
                            disabled={indexOfLastResult >= productos.length}
                            onClick={handleNextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
            {showFormActualizarProducto && <ActualizarProducto cerrar={cerrarFormActualizarProducto} id={idProductoActualizar} />}
            {showForm && <NuevoProducto cerrar={cerrarFormulario} />}
        </div>
    );
};

export default Productos;

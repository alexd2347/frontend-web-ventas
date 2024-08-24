import React, { useEffect, useState } from 'react';
import { ObtenerProductos, EliminarProducto } from '../../../services/productos';
import Loader from '../../../ui/loader/loader';
import NuevoProducto from './nuevoProducto/nuevoProducto';
import ActualizarProducto from './actualizarProducto/actualizarProducto';
import './productos.css';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showFormActualizarProducto, setShowFormActualizarProducto] = useState(false);
    const [idProductoActualizar, setIdProductoActualizar] = useState(null);


    //------------------------------paginados tabla-------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    let currentResults = productos.slice(indexOfFirstResult, indexOfLastResult);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            const data = await ObtenerProductos();
            setProductos(data);
            if (data.length === 0) {
                console.log('No hay productos');
                setProductos([]);
                return;
            }
            setLoading(false);
        };
        fetchProductos();
    }, [showForm]);

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
            <button className='boton-primario' onClick={handleShowForm}>
                Añadir nuevo producto
            </button>

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
                                        <img
                                            src={`${import.meta.env.VITE_URL_API}/uploads/${producto.imagenes.split(',')[0]}`}
                                            alt={producto.nombre}
                                            className='productos-producto-imagen'
                                        />
                                    </td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.tallas}</td>
                                    <td>{producto.cantidad}</td>
                                    <td className='contenedor-horizontal-centrado'>
                                        <button className='boton-secundario' onClick={(e) => handleEliminarProducto(producto.id)}>Eliminar</button>
                                        <button className='boton-secundario' onClick={(e) => handleShowFormActualizarProducto(producto.id)}>Actualizar</button>
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

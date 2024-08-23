import React, { useEffect, useState } from 'react';
import { ObtenerUsuarios } from '../../../services/usuarios';
import Loader from '../../../ui/loader/loader';
import './usuarios.css';
const Usuarios = () => {
    const [loading, setLoading] = useState(true);
    const [Usuarios, setUsuarios] = useState([]);
    //------------------------------paginados tabla-------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    let currentResults = Usuarios.slice(indexOfFirstResult, indexOfLastResult);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            const data = await ObtenerUsuarios();
            setUsuarios(data);
            if (data.length === 0) {
                console.log('No hay usuarios');
                setUsuarios([]);
                return;
            }
            setLoading(false);
        };
        fetchUsuarios();
    }, []);

    return (
        <div className='content contenedor-vertical-arriba-centro gap-10px pading-top-bottom-10px'>
            <h1>Usuarios</h1>
            {loading ? (
                <Loader />
            ) : (
                <div className='contenedor-tabla'>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentResults.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.name}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.rol}</td>
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
                            {currentPage} / {Math.ceil(Usuarios.length / resultsPerPage)}
                        </div>
                        <button
                            className='pagination-button'
                            disabled={indexOfLastResult >= Usuarios.length}
                            onClick={handleNextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Usuarios;
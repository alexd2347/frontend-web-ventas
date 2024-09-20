import React, { useEffect, useState } from 'react';
import { ObtenerProductos } from '../../services/productos';
import ProductoCard from '../../ui/productoCard/productoCard';
import Loader from '../../ui/loader/loader';
import { useProductosData } from '../../productosDataContext';
import './Inicio.css';
import { useLocation, useNavigate } from 'react-router-dom';
import iconofiltro from '../../assets/filtrar blanco.png';

function Inicio() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
    const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
    const [preciosSeleccionados, setPreciosSeleccionados] = useState([]);
    const [tallasSeleccionadas, setTallasSeleccionadas] = useState([]);

    const { marcas, tiposCamisas, tiposPantalones } = useProductosData();
    const [marcasExistentes, setMarcasExistentes] = useState([]);
    const [tiposExistentes, setTiposExistentes] = useState([]);
    const [tallasExistentes, setTallasExistentes] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            const data = await ObtenerProductos();

            const marcasPresentes = marcas.filter((marca) =>
                data.some((producto) =>
                    producto.nombre.toLowerCase().includes(marca.toLowerCase())
                )
            );

            const tiposPresentes = tiposCamisas.filter((tipo) =>
                data.some((producto) =>
                    producto.nombre.toLowerCase().includes(tipo.toLowerCase())
                )
            );

            const tiposPresentesPantalones = tiposPantalones.filter((tipo) =>
                data.some((producto) =>
                    producto.nombre.toLowerCase().includes(tipo.toLowerCase())
                )
            );

            let tallasUnicas = [...new Set(data.flatMap(producto => producto.tallas.split(',')))];
            // Ordenar tallas primero letras y luego numeros
            tallasUnicas = tallasUnicas.sort((a, b) => {
                const aEsNumero = !isNaN(a);
                const bEsNumero = !isNaN(b);
                if (aEsNumero && bEsNumero) {
                    return a - b;
                } else if (aEsNumero) {
                    return 1;
                } else if (bEsNumero) {
                    return -1;
                } else {
                    return a.localeCompare(b);
                }
            });

            setTallasExistentes(tallasUnicas);

            setTiposExistentes(tiposPresentes.concat(tiposPresentesPantalones));
            setMarcasExistentes(marcasPresentes);
            setProductos(data);
            setLoading(false);
        };
        fetchProductos();
    }, [marcas, tiposCamisas, tiposPantalones]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const marcasFromUrl = queryParams.getAll('marca');
        const tiposFromUrl = queryParams.getAll('tipo');
        const preciosFromUrl = queryParams.getAll('precio');
        const tallasFromUrl = queryParams.getAll('talla');

        if (marcasFromUrl.length > 0) {
            setMarcasSeleccionadas(marcasFromUrl);
        }
        if (tiposFromUrl.length > 0) {
            setTiposSeleccionados(tiposFromUrl);
        }
        if (preciosFromUrl.length > 0) {
            setPreciosSeleccionados(preciosFromUrl);
        }
        if (tallasFromUrl.length > 0) {
            setTallasSeleccionadas(tallasFromUrl);
        }
    }, [location.search]);

    useEffect(() => {
        const queryParams = new URLSearchParams();
        marcasSeleccionadas.forEach(marca => queryParams.append('marca', marca));
        tiposSeleccionados.forEach(tipo => queryParams.append('tipo', tipo));
        preciosSeleccionados.forEach(precio => queryParams.append('precio', precio));
        tallasSeleccionadas.forEach(talla => queryParams.append('talla', talla));

        navigate(`?${queryParams.toString()}`);
    }, [marcasSeleccionadas, tiposSeleccionados, preciosSeleccionados, navigate, tallasSeleccionadas]);

    const filtrarProductos = (productos) => {
        if (marcasSeleccionadas.length === 0 && tiposSeleccionados.length === 0 && preciosSeleccionados.length === 0 && tallasSeleccionadas.length === 0) return productos;

        return productos.filter((producto) => {
            const marcaCoincide = marcasSeleccionadas.length === 0 || marcasSeleccionadas.some((marca) =>
                producto.nombre.toLowerCase().includes(marca.toLowerCase())
            );

            const tipoCoincide = tiposSeleccionados.length === 0 || tiposSeleccionados.some((tipo) =>
                producto.nombre.toLowerCase().includes(tipo.toLowerCase())
            );

            const precio = producto.precioPromocion && producto.precioPromocion > 0 ? producto.precioPromocion : producto.precio;
            const precioNum = parseFloat(precio);

            const precioCoincide = preciosSeleccionados.length === 0 || preciosSeleccionados.some((rango) => {
                const [min, max] = rango.split('-').map(Number);
                return precioNum >= min && (max ? precioNum <= max : true);
            });

            const tallasCoinciden = tallasSeleccionadas.length === 0 || tallasSeleccionadas.some((talla) =>
                producto.tallas.split(',').includes(talla)
            );
            return marcaCoincide && tipoCoincide && precioCoincide && tallasCoinciden;
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setMarcasSeleccionadas(prevState =>
            checked
                ? [...prevState, value]
                : prevState.filter(marca => marca !== value)
        );

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTipoCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setTiposSeleccionados(prevState =>
            checked
                ? [...prevState, value]
                : prevState.filter(tipo => tipo !== value)
        );

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrecioCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setPreciosSeleccionados(prevState =>
            checked
                ? [...prevState, value]
                : prevState.filter(rango => rango !== value)
        );

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTallaCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setTallasSeleccionadas(prevState =>
            checked
                ? [...prevState, value]
                : prevState.filter(talla => talla !== value)
        );

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const productosFiltrados = filtrarProductos(productos);

    const [showMarcas, setShowMarcas] = useState(true);
    const handleShowMarcas = () => {
        setShowMarcas(!showMarcas);
    };
    const [showTipos, setShowTipos] = useState(false);
    const handleShowTipos = () => {
        setShowTipos(!showTipos);
    };
    const [showPrecios, setShowPrecios] = useState(false);
    const handleShowPrecios = () => {
        setShowPrecios(!showPrecios);
    };
    const [showTallas, setShowTallas] = useState(true);
    const handleShowTallas = () => {
        setShowTallas(!showTallas);
    };

    return (
        <div className="contenedor-filtro-cards">
            <div className='filtros'>
                <label className='filtros-title' onClick={(e) => handleShowMarcas()}>Marcas</label>
                {showMarcas && (
                    <div className='checkbox-group'>
                        {marcasExistentes.map((marca, index) => (
                            <label
                                key={index}
                                className={`marca-checkbox ${marcasSeleccionadas.includes(marca) ? 'marca-checkbox-seleccionada' : ''}`}
                            >
                                <input
                                    type='checkbox'
                                    value={marca}
                                    checked={marcasSeleccionadas.includes(marca)}
                                    onChange={handleCheckboxChange}
                                    className='checkbox-input'
                                />
                                {marca}
                            </label>
                        ))}
                    </div>
                )}
                <div className='separador' />
                <label className='filtros-title' onClick={(e) => handleShowTallas()}>Tallas</label>
                {showTallas && (
                    <div className='checkbox-group'>
                        {tallasExistentes.map((talla, index) => (
                            <label
                                key={index}
                                className={`marca-checkbox ${tallasSeleccionadas.includes(talla) ? 'marca-checkbox-seleccionada' : ''}`}
                            >
                                <input
                                    type='checkbox'
                                    value={talla}
                                    checked={tallasSeleccionadas.includes(talla)}
                                    onChange={handleTallaCheckboxChange}
                                    className='checkbox-input'
                                />
                                {talla}
                            </label>
                        ))}
                    </div>
                )}
                <div className='separador' />
                <label className='filtros-title' onClick={(e) => handleShowTipos()}>Tipo</label>
                {showTipos && (
                    <div className='checkbox-group'>
                        {tiposExistentes.map((tipo, index) => (
                            <label
                                key={index}
                                className={`marca-checkbox ${tiposSeleccionados.includes(tipo) ? 'marca-checkbox-seleccionada' : ''}`}
                            >
                                <input
                                    type='checkbox'
                                    value={tipo}
                                    checked={tiposSeleccionados.includes(tipo)}
                                    onChange={handleTipoCheckboxChange}
                                    className='checkbox-input'
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                )}
                <div className='separador' />
                <label className='filtros-title' onClick={(e) => handleShowPrecios()}>Precio</label>
                {showPrecios && (
                    <div className='checkbox-group'>
                        <label className={`marca-checkbox ${preciosSeleccionados.includes('0-300') ? 'marca-checkbox-seleccionada' : ''}`}>
                            <input
                                type='checkbox'
                                value='0-300'
                                onChange={handlePrecioCheckboxChange}
                                className='checkbox-input'
                            />
                            0-300
                        </label>
                        <label className={`marca-checkbox ${preciosSeleccionados.includes('300-500') ? 'marca-checkbox-seleccionada' : ''}`}>
                            <input
                                type='checkbox'
                                value='300-500'
                                onChange={handlePrecioCheckboxChange}
                                className='checkbox-input'
                            />
                            300-500
                        </label>
                        <label className={`marca-checkbox ${preciosSeleccionados.includes('500-1000') ? 'marca-checkbox-seleccionada' : ''}`}>
                            <input
                                type='checkbox'
                                value='500-1000'
                                onChange={handlePrecioCheckboxChange}
                                className='checkbox-input'
                            />
                            500-1000
                        </label>
                    </div>
                )}

                <div className='separador' />
                <div className='contenedor-horizontal-auto'>
                    <button className='boton-primario' onClick={() => { setMarcasSeleccionadas([]); setTiposSeleccionados([]); setPreciosSeleccionados([]); setTallasSeleccionadas([]); }}>Limpiar</button>
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className='contenedor-cards'>
                    {productosFiltrados.length === 0 && (
                        <div className='sin-resultados'>No hay resultados</div>
                    )}
                    {productosFiltrados.map((producto) => (
                        <ProductoCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inicio;

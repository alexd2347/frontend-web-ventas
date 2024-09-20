import React, { useState, useEffect } from 'react';
import { CrearProducto } from '../../../../services/productos';
import { useProductosData } from '../../../../productosDataContext'; 
import imagen from '../../../../assets/imagen.webp';
import Notificacion from '../../../../ui/notificacion/Notificacion';
import './nuevoProducto.css';

const NuevoProducto = ({ cerrar }) => {
    const { marcas, tiposCamisas, tiposPantalones, colores } = useProductosData();

    const [notificacion, setNotificacion] = useState(null);


    const [nombre, setNombre] = useState('');
    const [color, setColor] = useState('Negro')
    const [descripcion, setDescripcion] = useState('');
    const [marca, setMarca] = useState('Tommy');
    const [numero, setNumero] = useState(1);
    const [precio, setPrecio] = useState(0);
    const [tallas, setTallas] = useState('C,M,G');
    const [cantidades, setCantidades] = useState([]);
    const [promocion, setPromocion] = useState(false);
    const [precioPromocion, setPrecioPromocion] = useState(0);
    const [tipo, setTipo] = useState('Camisa');
    const [fotos, setFotos] = useState([]);
    const [previewFotos, setPreviewFotos] = useState([]);

    const mostrarNotificacion = (mensaje) => {
        setNotificacion(mensaje);
        setTimeout(() => {
            setNotificacion(null);
        }, 3000);
    };

    useEffect(() => {
        setNombre(`${tipo} ${marca} ${numero} ${color}`);
        setDescripcion(`${tipo} de la prestigiosa marca ${marca} en color ${color} ofrece una combinación perfecta de estilo y comodidad. Disponible en las tallas ${tallas}, es ideal para aquellos que buscan calidad y diseño en su vestimenta. Un must-have para cualquier guardarropa.`);
    }, [tipo, marca, numero, tallas, color]);

    useEffect(() => {
        const tallasArray = tallas.split(',');
        const nuevasCantidades = tallasArray.map((talla, index) => {
            // Si la talla ya existe en las cantidades actuales, mantener su valor, de lo contrario, inicializar en 1
            return cantidades[index] || 1;
        });
        setCantidades(nuevasCantidades);
    }, [tallas]);

    const handleTallasChange = (e) => {
        const nuevasTallas = e.target.value.split(',');
        const nuevasCantidades = nuevasTallas.map((talla, index) => {
            const tallaExistenteIndex = tallas.split(',').indexOf(talla);
            // Mantener la cantidad de la talla existente si está presente
            return tallaExistenteIndex !== -1 ? cantidades[tallaExistenteIndex] : 1;
        });

        setTallas(e.target.value);
        setCantidades(nuevasCantidades);
    };


    const handleTipoChange = (e) => {
        const selectedTipo = e.target.value;
        setTipo(selectedTipo);

        if (tiposCamisas.includes(selectedTipo)) {
            setTallas('C,M,G');
        } else if (tiposPantalones.includes(selectedTipo)) {
            setTallas('30,32,34');
        }
    };

    const handleCantidadChange = (index, value) => {
        const newCantidades = [...cantidades];
        newCantidades[index] = value;
        setCantidades(newCantidades);
    };

    const handleFileChange = (e) => {
        const newFiles = e.target.files;
        const totalFiles = Array.from(fotos).concat(Array.from(newFiles));

        if (totalFiles.length <= 3) {
            const filePreviews = [];
            const filesToShow = totalFiles.slice(0, 3); // Limitar a 3 fotos

            for (let i = 0; i < filesToShow.length; i++) {
                const file = filesToShow[i];
                const preview = URL.createObjectURL(file);
                filePreviews.push(preview);
            }

            setFotos(filesToShow);
            setPreviewFotos(filePreviews);
        } else {
            mostrarNotificacion('Solo puedes subir hasta 3 fotos');
            e.target.value = null;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let genero = nombre.includes('Dama') ? "Mujer" : "Hombre";
        //si el precio de promocion es 0, se quita la promocion
        if (promocion && precioPromocion === 0) {
            setPromocion(false);
            setPrecioPromocion(0);
            mostrarNotificacion('El precio de promoción no puede ser 0, se ha quitado la promoción automáticamente');
            return;
        }

        //el precio de promocion no puede ser mayor al precio normal
        if (promocion && precioPromocion >= precio) {
            mostrarNotificacion('El precio de promoción no puede ser mayor o igual al precio normal');
            return;
        }

        if (!nombre || !precio || !descripcion || !tallas || !cantidades || !tipo || !genero || fotos.length === 0) {
            mostrarNotificacion('Por favor, llena todos los campos');
            return;
        }


        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('descripcion', descripcion);
        formData.append('tallas', tallas);
        formData.append('cantidad', cantidades.join(','));
        formData.append('promocion', promocion);
        formData.append('precioPromocion', precioPromocion);
        formData.append('tipo', tipo);
        formData.append('genero', genero);
        for (let i = 0; i < fotos.length; i++) {
            formData.append('imagenes', fotos[i]);
        }
        //poner en consolo.log el formData
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        try {
            await CrearProducto(formData);
            mostrarNotificacion('Producto creado exitosamente');
            cerrar();
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const handleCerrarFormulario = () => {
        cerrar();
    };


    const handleBorrarFoto = (index) => (e) => {
        e.preventDefault(); // Esto previene que el botón cause un comportamiento no deseado
        const newFotos = Array.from(fotos);
        newFotos.splice(index, 1);

        const newPreviewFotos = Array.from(previewFotos);
        newPreviewFotos.splice(index, 1);

        setFotos(newFotos);
        setPreviewFotos(newPreviewFotos);
    }


    return (
        <div className='popup-overlay'>
            <div className='producto-form-popup'>
                <h1>Nuevo Producto</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group nombre'>
                        <select
                            value={tipo}
                            onChange={handleTipoChange}
                        >
                            {tiposCamisas.map((tipo, index) => (
                                <option key={index} value={tipo}>{tipo}</option>
                            ))}
                            {tiposPantalones.map((tipo, index) => (
                                <option key={index} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                        <select
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                        >
                            {marcas.map((marca, index) => (
                                <option key={index} value={marca}>{marca}</option>
                            ))}
                        </select>
                        <input
                            type='number'
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            placeholder='Número'
                            required
                            className='input-numero'
                        />
                        {/**select de los colores */}
                        <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        >
                            {colores.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group-inline'>
                        <div className='form-group'>
                            <label>Precio</label>
                            <input
                                type='number'
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                placeholder='Precio'
                                required
                                className='input-numero'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Promoción</label>
                            <input
                                type='checkbox'
                                checked={promocion}
                                onChange={(e) => setPromocion(e.target.checked)}
                            />
                        </div>
                        {promocion && (
                            <div className='form-group'>
                                <label>Precio Promoción</label>
                                <input
                                    type='number'
                                    value={precioPromocion}
                                    onChange={(e) => setPrecioPromocion(e.target.value)}
                                    placeholder='Precio de promoción'
                                    className='input-numero'
                                />
                            </div>
                        )}
                    </div>
                    <div className='form-group'>
                        <label>Tallas</label>
                        <input
                            type='text'
                            value={tallas}
                            placeholder='Tallas'
                            onChange={handleTallasChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Cantidades</label>
                        {cantidades.map((cantidad, index) => (
                            <div key={index}>
                                <label>{tallas.split(',')[index]}</label>
                                <input
                                    type='number'
                                    value={cantidad}
                                    onChange={(e) => handleCantidadChange(index, e.target.value)}
                                    required
                                    className='input-numero'
                                />
                            </div>
                        ))}
                    </div>
                    <div className='form-group-img'>
                        <label>Fotografías (máximo 3)</label>
                        {previewFotos.length > 0 && (
                            <div className='fotos-preview'>
                                {previewFotos.map((foto, index) => (
                                    <div className="contenedor-foto">
                                        <img
                                            key={index}
                                            src={foto}
                                            alt={`Foto ${index + 1}`}
                                            className='foto-preview'
                                        />
                                        <button className='boton-X' onClick={handleBorrarFoto(index)}>X</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <label className='custom-file-upload'>
                            <input
                                type='file'
                                multiple
                                accept='image/*'
                                onChange={handleFileChange}
                            />
                            Seleccionar fotos
                            <img className='icono-imagen' src={imagen} alt='icono' />
                        </label>
                    </div>
                    <div className='form-actions'>
                        <button className='boton-secundario' type='button' onClick={handleCerrarFormulario}>
                            Cancelar
                        </button>
                        <button className='boton-primario' type='submit'>
                            Crear Producto
                        </button>
                    </div>
                </form>
            </div>
            {notificacion && (
                <Notificacion mensaje={notificacion} onClose={() => setNotificacion(null)} />
            )}
        </div>
    );
};

export default NuevoProducto;

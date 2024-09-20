import React, { useEffect, useState } from "react";
import { ObtenerProductoPorId, UpdateProducto } from "../../../../services/productos";
import { useProductosData } from '../../../../productosDataContext'; 
import imagen from '../../../../assets/imagen.webp';
import Notificacion from '../../../../ui/notificacion/Notificacion';
import './actualizarProducto.css';

const ActualizarProducto = ({ cerrar, id }) => {
    const { marcas, tiposCamisas, tiposPantalones, colores } = useProductosData();
    const [notificacion, setNotificacion] = useState(null);
    const mostrarNotificacion = (mensaje) => {
        setNotificacion(mensaje);
        setTimeout(() => {
            setNotificacion(null);
        }, 3000);
    };

    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('Camisa');
    const [marca, setMarca] = useState('Tommy');
    const [numero, setNumero] = useState(1);
    const [color, setColor] = useState('Negro');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [tallas, setTallas] = useState('C,M,G');
    const [cantidades, setCantidades] = useState([]);
    const [promocion, setPromocion] = useState(false);
    const [precioPromocion, setPrecioPromocion] = useState(0);
    const [fotos, setFotos] = useState([]);
    const [previewFotos, setPreviewFotos] = useState([]);
    const [imagenesActuales, setImagenesActuiales] = useState('');

    useEffect(() => {
        const fetchProductoPorId = async () => {
            const producto = await ObtenerProductoPorId(id);
            // Actualizar el estado con los datos obtenidos
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(Number(producto.precio));
            setTallas(producto.tallas);
            setCantidades(producto.cantidad.split(','));
            setPromocion(producto.promocion);
            setPrecioPromocion(Number(producto.precioPromocion));
            setImagenesActuiales(producto.imagenes);
            // Procesar las imágenes
            const imagenesArray = producto.imagenes.split(',');
            const previewUrls = imagenesArray.map(img => `${import.meta.env.VITE_URL_API2}/uploads/${img}`);
            setPreviewFotos(previewUrls);


            //NUMERO SE OBTENDRA DE producto.nombre y es el numero que encuentre
            const numeroProducto = producto.nombre.match(/\d+/g);
            setNumero(numeroProducto ? numeroProducto[0] : 1);
            // Determinar tipo, marca y color
            const productoTipo = tiposCamisas.includes(producto.tipo) ? producto.tipo :
                tiposPantalones.includes(producto.tipo) ? producto.tipo : 'Camisa';
            setTipo(productoTipo);

            const productoMarca = marcas.find(m => producto.nombre.includes(m)) || 'Tommy';
            setMarca(productoMarca);

            const productoColor = colores.find(c => producto.nombre.includes(c)) || 'Negro';
            setColor(productoColor);
        };
        fetchProductoPorId();
    }, [id]);

    useEffect(() => {
        setNombre(`${tipo} ${marca} ${numero} ${color}`);
        setDescripcion(`${tipo} de la prestigiosa marca ${marca} en color ${color} ofrece una combinación perfecta de estilo y comodidad. Disponible en las tallas ${tallas}, es ideal para aquellos que buscan calidad y diseño en su vestimenta. Un must-have para cualquier guardarropa.`);
    }, [tipo, marca, numero, tallas, color]);

    const handleTipoChange = (e) => {
        const selectedTipo = e.target.value;
        setTipo(selectedTipo);

        if (tiposCamisas.includes(selectedTipo)) {
            setTallas('C,M,G');
        } else if (tiposPantalones.includes(selectedTipo)) {
            setTallas('30,32,34');
        }
    };

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
            const filesToShow = totalFiles.slice(0, 3);

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

    const handleCerrar = () => {
        cerrar();
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



        if (!nombre || !precio || !descripcion || !tallas || !cantidades || !tipo || !genero) {
            mostrarNotificacion('Por favor, llena todos los campos');
            return;
        }


        const formData = new FormData();
        formData.append('id', id);
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('descripcion', descripcion);
        formData.append('tallas', tallas);
        formData.append('cantidad', cantidades.join(','));
        formData.append('promocion', promocion);
        formData.append('precioPromocion', precioPromocion);
        formData.append('tipo', tipo);
        formData.append('genero', genero);
        console.log(fotos.length);
        if (fotos.length === 0) {
            console.log('no entro');
            //mandar un string vacio para que no se eliminen las imagenes
            formData.append('imagenes', null);
        } else if (fotos.length > 0) {
            console.log('entro');
            console.log(fotos);
            for (let i = 0; i < fotos.length; i++) {
                formData.append('imagenes', fotos[i]);
            }
        }

        //poner en consolo.log el formData
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            await UpdateProducto(id, formData);
            mostrarNotificacion('Producto actualizado correctamente');
            cerrar();
        } catch (error) {
            console.error(error);
            mostrarNotificacion('Ocurrió un error al actualizar el producto');
        }
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
                <h1>Actualizar Producto</h1>
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
                        <button className='boton-primario' type='button' onClick={handleCerrar}>
                            Cancelar
                        </button>
                        <button className='boton-secundario' type='submit'>
                            Actualizar
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

export default ActualizarProducto;

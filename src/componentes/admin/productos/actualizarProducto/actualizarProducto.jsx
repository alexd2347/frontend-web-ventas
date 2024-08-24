import React, { useEffect, useState } from "react";

import './actualizarProducto.css';

const ActualizarProducto = ({ cerrar, id }) => {
    const marcas = [
        'Abercrombie',
        'Abercrombie Dama',
        'Amiri',
        'Amiri Dama',
        'Armani',
        'Armani Dama',
        'Burberry',
        'Burberry Dama',
        'Calvin Klein',
        'Calvin Klein Dama',
        'Coach',
        'Coach Dama',
        'Expres',
        'Expres Dama',
        'Gucci',
        'Gucci Dama',
        'Guess',
        'Guess Dama',
        'Hugo Boss',
        'Hugo Boss Dama',
        'Karl Lagerfeld',
        'Karl Lagerfeld Dama',
        'Kit',
        'Kit Dama',
        'Lacoste',
        'Lacoste Dama',
        'Louis Vuitton',
        'Louis Vuitton Dama',
        'Michael Kors',
        'Michael Kors Dama',
        'Nautica',
        'Nautica Dama',
        'Palm Angels',
        'Palm Angels Dama',
        'Penguin',
        'Penguin Dama',
        'Psycho Bunny',
        'Psycho Bunny Dama',
        'Ralph Lauren',
        'Ralph Lauren Dama',
        'Tommy',
        'Tommy Dama'
    ];

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

    const colores = [
        'Amarillo',
        'Azul',
        'Beige',
        'Blanco',
        'Celeste',
        'Gris',
        'Lila',
        'Cafe',
        'Morado',
        'Naranja',
        'Negro',
        'Rosa',
        'Rojo',
        'Turquesa',
        'Vino',
        'Verde',
    ];

    useEffect(() =>{
        console.log(id);
        
    }, [id])
    const handleCerrar = () => {
        cerrar();
    }
    return (
        <div className='popup-overlay'>
            <div className='producto-form-popup'>
                <h1>Nuevo Producto</h1>
                <div>id a actualizar: {id}</div>
                <button className='boton-primario' type='button' onClick={handleCerrar}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default ActualizarProducto;
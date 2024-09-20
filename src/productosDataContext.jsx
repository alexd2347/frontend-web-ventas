import React, { createContext, useContext } from "react";

const ProductosDataContext = createContext();

export const ProductosDataProvider = ({ children }) => {
    const marcas = [
        'Abercrombie',
        'Abercrombie Dama',
        'American Eagle',
        'American Eagle Dama',
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
        'Express',
        'Express Dama',
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
        'The North Face',
        'The North Face Dama',
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
        'Chamarra',
    ];

    const tiposPantalones = [
        'Pantalón',
        'Jogger',
        'Shorts',
    ];

    const colores = [
        'Amarillo',
        'Aqua',
        'Azul',
        'Azul Rey',
        'Beige',
        'Blanco',
        'Celeste',
        'Coral',
        'Gris',
        'Lila',
        'Cafe',
        'Cafe Claro',
        'Morado',
        'Mostaza',
        'Naranja',
        'Negro',
        'Rosa',
        'Rojo',
        'Turquesa',
        'Vino',
        'Verde',
    ];

    return (
        <ProductosDataContext.Provider value={{ marcas, tiposCamisas, tiposPantalones, colores }}>
            {children}
        </ProductosDataContext.Provider>
    );
};

export const useProductosData = () => {
    return useContext(ProductosDataContext);
}
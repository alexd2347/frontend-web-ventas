
const data = [
    {
        "id": 1,
        "nombre": "Camisa 1",
        "precio": 100,
        "descripcion": "Descripción del producto 1",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_860124-MLM71301760487_082023-O.webp,https://http2.mlstatic.com/D_NQ_NP_784741-MLM52253261808_112022-O.webp,https://http2.mlstatic.com/D_NQ_NP_645109-MLM71252141201_082023-O.webp",
        "tallas": "C,M,G",
        "cantidad": "7,18,11",
        "promocion": false,
        "precioPromocion": 0,
        "tipo": "camisa",
    },
    {
        "id": 2,
        "nombre": "Camisa 2",
        "precio": 150,
        "descripcion": "Descripción del producto 2",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_849111-MLM77721246192_072024-O.webp,https://http2.mlstatic.com/D_NQ_NP_730181-MLM50995026431_082022-O.webp,https://http2.mlstatic.com/D_NQ_NP_806138-MLM77941126417_072024-O.webp",
        "tallas": "C,M,G",
        "cantidad": "8,22,17",
        "promocion": true,
        "precioPromocion": 100,
        "tipo": "camisa",
    },
    {
        "id": 3,
        "nombre": "Pantalon 1",
        "precio": 250,
        "descripcion": "Descripción del producto 1",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_748700-CBT71866847670_092023-O.webp,https://http2.mlstatic.com/D_NQ_NP_731867-CBT71866847668_092023-O.webp",
        "tallas": "30,32,34",
        "cantidad": "8,22,17",
        "promocion": true,
        "precioPromocion": 220,
        "tipo": "pantalon",
    },
    {
        "id": 4,
        "nombre": "Pantalon 2",
        "precio": 300,
        "descripcion": "Descripción del producto 2",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_861493-CBT71921298729_092023-O.webp,https://http2.mlstatic.com/D_NQ_NP_756584-CBT71867046730_092023-O.webp",
        "tallas": "30,32,34",
        "cantidad": "8,22,17",
        "promocion": false,
        "precioPromocion": 0,
        "tipo": "pantalon",
    },
    {
        "id": 5,
        "nombre": "Camisa 3",
        "precio": 200,
        "descripcion": "Descripción del producto 3",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_753389-MLM70449565447_072023-O.webp,https://http2.mlstatic.com/D_NQ_NP_631434-MLM52156029866_102022-O.webp,https://http2.mlstatic.com/D_NQ_NP_697302-MLM52156028807_102022-O.webp",
        "tallas": "C,M,G",
        "cantidad": "8,22,17",
        "promocion": true,
        "precioPromocion": 175,
        "tipo": "camisa",
    },
    /*xddddddddddddddddddddddddd*/
    
    {
        "id": 6,
        "nombre": "Camisa 1",
        "precio": 100,
        "descripcion": "Descripción del producto 1",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_860124-MLM71301760487_082023-O.webp,https://http2.mlstatic.com/D_NQ_NP_784741-MLM52253261808_112022-O.webp,https://http2.mlstatic.com/D_NQ_NP_645109-MLM71252141201_082023-O.webp",
        "tallas": "C,M,G",
        "cantidad": "7,18,11",
        "promocion": false,
        "precioPromocion": 0,
        "tipo": "camisa",
    },
    {
        "id": 7,
        "nombre": "Camisa 2",
        "precio": 150,
        "descripcion": "Descripción del producto 2",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_849111-MLM77721246192_072024-O.webp,https://http2.mlstatic.com/D_NQ_NP_730181-MLM50995026431_082022-O.webp,https://http2.mlstatic.com/D_NQ_NP_806138-MLM77941126417_072024-O.webp",
        "tallas": "C,M,G",
        "cantidad": "8,22,17",
        "promocion": true,
        "precioPromocion": 100,
        "tipo": "camisa",
    },
    {
        "id": 8,
        "nombre": "Pantalon 1",
        "precio": 250,
        "descripcion": "Descripción del producto 1",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_748700-CBT71866847670_092023-O.webp,https://http2.mlstatic.com/D_NQ_NP_731867-CBT71866847668_092023-O.webp",
        "tallas": "30,32,34",
        "cantidad": "8,22,17",
        "promocion": true,
        "precioPromocion": 220,
        "tipo": "pantalon",
    },
    {
        "id": 9,
        "nombre": "Pantalon 2",
        "precio": 300,
        "descripcion": "Descripción del producto 2",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_861493-CBT71921298729_092023-O.webp,https://http2.mlstatic.com/D_NQ_NP_756584-CBT71867046730_092023-O.webp",
        "tallas": "30,32,34",
        "cantidad": "8,22,17",
        "promocion": false,
        "precioPromocion": 0,
        "tipo": "pantalon",
    },
    {
        "id": 10,
        "nombre": "Camisa 3",
        "precio": 200,
        "descripcion": "Descripción del producto 3",
        "imagenes": "https://http2.mlstatic.com/D_NQ_NP_753389-MLM70449565447_072023-O.webp,https://http2.mlstatic.com/D_NQ_NP_631434-MLM52156029866_102022-O.webp,https://http2.mlstatic.com/D_NQ_NP_697302-MLM52156028807_102022-O.webp",
        "tallas": "C,M,G",
        "cantidad": "8,22,17",
        "promocion": true,
        "precioPromocion": 175,
        "tipo": "camisa",
    },
]
export const ObtenerProductos = async () => {
    try {
        //regresa la data de productos ordenados aleatoriamente
        return data.sort(() => Math.random() - 0.5);
    } catch (error) {
        console.error(error);
    }
};

export const ObtenerProductoPorId = async (id) => {
    try {
        return data.find(producto => producto.id === parseInt(id));
    } catch (error) {
        console.error(error);
    }
};
export const ObtenerProductosEnPromocion = async () => {
    try {
        return data.filter(producto => producto.promocion);
    } catch (error) {
        console.error(error);
    }
}

export const ObtenerProductosNuevos = async () => {
    try {
        //retornar los prductos con ids mas grandes primero
        return data.sort((a, b) => b.id - a.id);

    } catch (error) {
        console.error(error);
    }
}
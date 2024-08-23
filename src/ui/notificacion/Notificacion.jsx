import React, { useEffect } from 'react';
import './Notificacion.css';

const Notificacion = ({ mensaje, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className='notificacion'>
            {mensaje}
        </div>
    );
};

export default Notificacion;

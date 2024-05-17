import React from 'react';
import axios from 'axios';
import './deleteButton.css';

export const DeleteButton = ({ id }) => {
    const handleDelete = async () => {
        const userToken = localStorage.getItem('userToken');
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        try {
            await axios.delete(`http://localhost:8060/api/anecdota/delete/${id}`, config);
            // Aquí puedes añadir lógica para actualizar la lista de anécdotas en el estado del padre
            console.log('Anécdota eliminada');
        } catch (error) {
            console.error('Error al eliminar la anécdota:', error);
        }
    };

    return (
        <button className="delete-button" onClick={handleDelete}>
            Eliminar
        </button>
    );
};

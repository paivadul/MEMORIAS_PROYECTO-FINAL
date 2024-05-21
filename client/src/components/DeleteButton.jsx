import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

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
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.error('Error al eliminar la anécdota:', error);
        }
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleDelete}>
            Eliminar
        </Button>
    );
};

import React, { useState } from "react";
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

export const FormVisits = () => {
    const [nota, setNota] = useState({ nombre: '', nota: '', media: null });
    const [error, setError] = useState('');

    const visitHandler = (e) => {
        const { name, value } = e.target;
        setNota({ ...nota, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNota({ ...nota, media: file });
    };

    const sendNotaHandler = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('userToken');
        const formData = new FormData();
        formData.append('nombre', nota.nombre);
        formData.append('nota', nota.nota);
        formData.append('media', nota.media);

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        try {
            await axios.post('http://localhost:8060/api/visita/new', formData, config);
            setNota({ nombre: '', nota: '', media: null });
            window.location.reload(); // Recargar la página
        } catch (error) {
            setError(error.response?.data?.error || "Error al enviar los datos. Por favor, intente nuevamente.");
        }
    };

    return (
        <Box component="form" onSubmit={sendNotaHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Nombre"
                name="nombre"
                value={nota.nombre}
                onChange={visitHandler}
                required
                fullWidth
                variant="outlined"
            />
            <TextField
                label="Nota"
                name="nota"
                value={nota.nota}
                onChange={visitHandler}
                required
                fullWidth
                variant="outlined"
            />
            <input
                type="file"
                name="media"
                onChange={handleFileChange}
            />
            <Button type="submit" variant="contained" color="primary">
                Publicar notas
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
}

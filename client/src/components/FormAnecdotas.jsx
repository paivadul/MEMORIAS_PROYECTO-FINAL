import React, { useState } from "react";
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

export const FormAnecdotas = () => {
    const [anecdota, setAnecdota] = useState({ titulo: '', fecha: '', descripcion: '', media: null });
    const [error, setError] = useState('');

    const anecdotaHandler = (e) => {
        const { name, value } = e.target;
        setAnecdota({ ...anecdota, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAnecdota({ ...anecdota, media: file });
    };

    const sendanecdotaHandler = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('userToken');
        const formData = new FormData();
        formData.append('titulo', anecdota.titulo);
        formData.append('fecha', anecdota.fecha);
        formData.append('descripcion', anecdota.descripcion);
        formData.append('media', anecdota.media);

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        
        try {
            await axios.post('http://localhost:8060/api/anecdota/new', formData, config);
            setAnecdota({ titulo: '', fecha: '', descripcion: '', media: null });
            window.location.reload(); // Recargar la página
        } catch (error) {
            setError(error.response?.data?.error || "Error al enviar los datos. Por favor, intente nuevamente.");
        }
    };

    return (
        <Box component="form" onSubmit={sendanecdotaHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Título"
                name="titulo"
                value={anecdota.titulo}
                onChange={anecdotaHandler}
                required
                fullWidth
                variant="outlined"
            />
            <TextField
                label="Fecha"
                type="date"
                name="fecha"
                value={anecdota.fecha}
                onChange={anecdotaHandler}
                required
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Descripción"
                name="descripcion"
                value={anecdota.descripcion}
                onChange={anecdotaHandler}
                required
                fullWidth
                variant="outlined"
            />
            <input
                type="file"
                name="media"
                onChange={handleFileChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Publicar anécdota
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    )
}

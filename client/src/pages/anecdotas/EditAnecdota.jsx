import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';

export const EditAnecdota = () => {
    const { id } = useParams();
    const [anecdota, setAnecdota] = useState({
        titulo: '',
        fecha: '',
        descripcion: '',
        media: null
    });
    const [errors, setErrors] = useState({});
    const [filePreview, setFilePreview] = useState('');

    useEffect(() => {
        getAnecdotaByID();
    }, []);

    const getAnecdotaByID = async () => {
        try {
            const userToken = localStorage.getItem('userToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            };
            const response = await axios.get(`http://localhost:8060/api/anecdota/${id}`, config);
            const fechaFormateada = new Date(response.data.fecha).toISOString().split('T')[0];
            const anecdotaFormateada = { ...response.data, fecha: fechaFormateada };
            setAnecdota(anecdotaFormateada);
            if (response.data.media) {
                const file = new File([response.data.media], response.data.media);
                setFilePreview(URL.createObjectURL(file));
            }
        } catch (error) {
            console.error('Error al obtener la anécdota:', error);
            if (error.response && error.response.status === 401) {
                console.log('Refrescar token y reintentar');
            }
        }
    };

    const onChangeHandler = e => {
        const { name, value } = e.target;
        if (name === 'media') {
            const file = e.target.files[0];
            if (file) {
                setFilePreview(URL.createObjectURL(file));
            } else {
                setFilePreview('');
            }
            setAnecdota({ ...anecdota, media: file });
        } else {
            setAnecdota({ ...anecdota, [name]: value });
        }
        setErrors({ ...errors, [name]: '' });
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        try {
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
            await axios.put(`http://localhost:8060/api/anecdota/update/${id}`, formData, config);
            // navigate('/anecdotas');
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error.message);
            }
        }
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(filePreview);
        };
    }, [filePreview]);

    return (
        <Box className='anecdotaid_container' sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box className='anecdotaid-info' sx={{ width: '80%' }}>
                <Typography variant="h3" component="h3" sx={{ textAlign: 'center', fontSize: '2em', marginBottom: '20px' }}>Editar Anécdota</Typography>
                <form onSubmit={onSubmitHandler}>
                    <TextField
                        label="Título"
                        name="titulo"
                        value={anecdota.titulo}
                        onChange={onChangeHandler}
                        fullWidth
                        margin="normal"
                        error={!!errors.titulo}
                        helperText={errors.titulo}
                    />
                    <TextField
                        label="Fecha"
                        name="fecha"
                        type="date"
                        value={anecdota.fecha}
                        onChange={onChangeHandler}
                        fullWidth
                        margin="normal"
                        error={!!errors.fecha}
                        helperText={errors.fecha}
                    />
                    <TextField
                        label="Descripción"
                        name="descripcion"
                        multiline
                        rows={4}
                        value={anecdota.descripcion}
                        onChange={onChangeHandler}
                        fullWidth
                        margin="normal"
                        error={!!errors.descripcion}
                        helperText={errors.descripcion}
                    />
                    <input
                        type="file"
                        name="media"
                        onChange={onChangeHandler}
                    />
                    {filePreview && <img src={filePreview} alt="File Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                    {errors.media && <span>{errors.media}</span>}
                    <Button type="submit" variant="contained" sx={{ marginTop: '20px', marginLeft: 'auto', display: 'block' }}>Actualizar</Button>
                </form>
            </Box>
        </Box>
    );
};

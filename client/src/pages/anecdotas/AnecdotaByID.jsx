import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import '../../styles/anecdotas/anecdotabyid.css';

export const AnecdotaByID = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const getAnecdotaByID = async () => {
        const userToken = localStorage.getItem('userToken');
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };

        try {
            const response = await axios.get(`http://localhost:8060/api/anecdota/${id}`, config);
            setData(response.data);
        } catch (error) {
            console.error('Error al obtener la anécdota:', error);
            if (error.response && error.response.status === 401) {
                console.log('Refrescar token y reintentar');
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        let month = date.toLocaleString('es-ES', { month: 'short' });
        month = month.charAt(0).toUpperCase() + month.slice(1);
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    useEffect(() => {
        getAnecdotaByID();
    }, [id]);

    return (
        <>
            {data && (
                <section className='anecdotaid_container'>
                    <Box className='anecdotaid-info'>
                        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', fontSize: '2em' }}>{data.titulo}</Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', fontSize: '1.2em' }}>{data.descripcion}</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'justify', fontSize: '1.2em' }} className='fecha_anecdotaid'>{formatDate(data.fecha)}</Typography>
                        <Button variant="contained" onClick={() => navigate('/anecdotas')} sx={{ marginTop: '20px'}}>
                            Volver a la página principal
                        </Button>
                    </Box>
                    <img src={`http://localhost:8060/static/${data.media}`} alt={data.titulo} className='anecdotaid_image' />
                </section>
            )}
        </>
    );
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography } from '@mui/material';
import { AnecdotaData, FormAnecdotas } from '../../components';

export const Usuario = () => {
    const [anecdotas, setAnecdotas] = useState([])

    const getAllAnecdotas = async () => {
        const userToken = localStorage.getItem('userToken');
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        try {
            const response = await axios.get('http://localhost:8060/api/anecdota/all', config);
            setAnecdotas(response.data);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                console.log('Refrescar token y reintentar');
            }
        }
    };

    useEffect(() => {
        getAllAnecdotas();
    }, []);

    return (
        <Container>
            <Box my={4}>
                <FormAnecdotas />
            </Box>
            <Box my={4}>
                {anecdotas.length > 0 ? (
                    <AnecdotaData anecdotas={anecdotas} />
                ) : (
                    <Box textAlign="center" my={4}>
                        <Typography variant="h6">No hay anécdotas disponibles</Typography>
                    </Box>
                )}
            </Box>
        </Container>
    )
}

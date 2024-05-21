import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography } from '@mui/material';
import { FormVisits, NotasData } from '../../components';

export const Visitas = () => {
    const [notas, setNotas] = useState([]);

    const getAllNotas = async () => {
        const userToken = localStorage.getItem('userToken');
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        try {
            const response = await axios.get('http://localhost:8060/api/visita/all', config);
            setNotas(response.data);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                console.log('Refrescar token y reintentar');
            }
        }
    };

    useEffect(() => {
        getAllNotas();
    }, []);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, gap: 2 }}>
            <Box sx={{ padding: 2, borderRadius: 1, width: '100%', maxWidth: 350, backgroundColor: 'primary.light' }}>
                <FormVisits />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 2, gap: 2, flexWrap: 'wrap' }}>
                {notas.length > 0 ? (
                    <Box sx={{ display: 'flex', flex: 2, gap: 2 }}>
                        {Object.keys(notas).map((key, i) => (
                            <NotasData notas={notas[key]} key={i} />
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: 24 }}>
                        <Typography variant="h6">No hay notas disponibles</Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

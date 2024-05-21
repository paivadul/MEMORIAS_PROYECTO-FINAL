import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

export const NotasData = ({ notas }) => {
    return (
        <Card sx={{ mb: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 250 }}>
            <CardContent>
                <Typography variant="h6">{notas.nombre}</Typography>
                <Typography variant="body1">{notas.nota}</Typography>
            </CardContent>
            {notas.media && (
                <CardMedia
                    component="img"
                    image={`http://localhost:8060/static/${notas.media}`}
                    alt={notas.nombre}
                    sx={{ maxHeight: 200, objectFit: 'cover' }}
                />
            )}
        </Card>
    );
}
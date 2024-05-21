import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export const Anecdotas = () => {
  const [data, setData] = useState([]);

  const getAllAnecdotas = async () => {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };

    try {
      const response = await axios.get('http://localhost:8060/api/anecdota/all', config);
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener las anécdotas:', error);
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
    getAllAnecdotas();
  }, []);

  return (
    <>
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h3" component="h1">Anécdotas</Typography>
      </Box>
      <section className='anecdotas_container' style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
        {data.map((anecdota) => (
          <Box key={anecdota._id} sx={{ maxWidth: '400px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={`http://localhost:8060/static/${anecdota.media}`} alt={anecdota.titulo} style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography variant="h4" component="h3" sx={{ margin: '10px 0' }}>{anecdota.titulo}</Typography>
            <Typography variant="body1" sx={{ margin: '10px 0', color: '#555934' }}>
              {anecdota.descripcion.length > 100 
                ? `${anecdota.descripcion.substring(0, 100)}...` 
                : anecdota.descripcion}
              {anecdota.descripcion.length > 100 && (
                <Button variant="contained" component={Link} to={`/anecdotas/${anecdota._id}`} sx={{ marginTop: '10px' }}>Ver Más</Button>
              )}
            </Typography>
            <Typography variant="body2" className='fecha_anecdota'>{formatDate(anecdota.fecha)}</Typography>
          </Box>
        ))}
      </section>
    </>
  );
};

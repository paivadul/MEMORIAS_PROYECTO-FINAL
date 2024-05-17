import axios from 'axios';
import React, { useEffect } from 'react';


export const Anecdotas = () => {
  const getAllAnecdotas = async () => {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };

    try {
      const response = await axios.get('http://localhost:8060/api/anecdota/all', config);
      console.log(response.data); // Aquí mostramos la respuesta del servidor en la consola

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
    <h1>Anecdotas</h1>
  );
};

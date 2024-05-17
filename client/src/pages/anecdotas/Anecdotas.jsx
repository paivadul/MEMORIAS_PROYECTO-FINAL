import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/anecdotas/anecdotas.css';

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
      console.log(error);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <header className='header_anecdota'>
        <h1>Lista de Anecdotas</h1>
        <Link to="/anecdotas/crear" className='buttonCrearAnecdota'>Crear Anécdota</Link>
      </header>
      <section className='anecdotas_container'>
        {data.map((anecdota) => (
          <div key={anecdota._id} className='anecdota_card'>
            <img src={`http://localhost:8060/static/${anecdota.media}`} alt={anecdota.titulo} />
            <h3>{anecdota.titulo}</h3>
            {/* <p>{anecdota.descripcion}</p> */}
            <p>
              {anecdota.descripcion.length > 100 
                ? `${anecdota.descripcion.substring(0, 100)}...` 
                : anecdota.descripcion}
              {anecdota.descripcion.length > 100 && (
                <Link to={`/anecdotas/${anecdota._id}`}>
                  Ver más
                </Link>
              )}
            </p>
            <p className='fecha_anecdota'>{formatDate(anecdota.fecha)}</p>
          </div>
        ))}
      </section>
    </>
  );
};

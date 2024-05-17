import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
import '../../styles/anecdotas/anecdotabyid.css';

export const AnecdotaByID = () => {

    const [data, setData] = useState([]);

    const {id} = useParams();

  const getAnecdotaByID = async () => {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };

    try {
      const response = await axios.get(`http://localhost:8060/api/anecdota/${id}`, config);
      setData(response.data)
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
    const month = date.toLocaleString('es-ES', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  
  useEffect(() => {
    getAnecdotaByID();
  }
  , [id]);

    return (
        <>
            {
                data && (
                    <section className='anecdotaid_container' >
                        <div className='anecdotaid-info'>
                            <h3>{data.titulo}</h3>
                            <p>{data.descripcion}</p>
                            <p className='fecha_anecdotaid'>{formatDate(data.fecha)}</p>
                        </div>
                        <img src={`http://localhost:8060/static/${data.media}`} alt={data.titulo} />
                    </section>
                )
            }
        </>
    )
}

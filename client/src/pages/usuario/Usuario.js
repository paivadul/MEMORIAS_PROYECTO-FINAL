import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './usuario.css';
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
            setAnecdotas(response.data.anecdotas); // Accede al array de anécdotas
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
        <>
            <div className='cont-all-visit'>
                <div className='form-visit'>
                    <FormAnecdotas />
                </div>
                <div className='all-anecdotas'>
                    {anecdotas.length > 0 ? (
                        <div className="cont-anecdotas">
                            <AnecdotaData anecdotas={anecdotas} />
                        </div>
                    ) : (
                        <div className="vacio">
                            <h1>No hay anécdotas disponibles</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
